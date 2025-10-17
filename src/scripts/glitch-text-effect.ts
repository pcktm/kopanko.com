const GLITCH_CHARS = '@#$&*+=_:;~<>^';

interface CharacterGlitch {
  charIndex: number;
  glitchChar: string;
  startTime: number;
  duration: number;
  showGlitch: boolean; 
}

interface TextNodeData {
  node: Text;
  originalText: string;
  activeGlitches: CharacterGlitch[];
  timeoutId?: number;
}

const NUM_CHARS_MIN = 15;
const NUM_CHARS_MAX = 30;
const RIPPLE_DIST_MIN = 30;
const RIPPLE_DIST_MAX = 100;
const RIPPLE_DIST_POWER = 3;
const MIN_CURSOR_SPEED = 2;
const MAX_CURSOR_SPEED = 40;
const ORIG_CHAR_RATIO = 0.70; 
const GLITCH_DURATION = 350; 
const ANIMATION_CHECK_INTERVAL = 125; 

let lastMouseX = 0;
let lastMouseY = 0;
let lastFrameTime = 0;

function getRandomGlitchChar(char: string): string {
  if (!/[a-zA-Z0-9]/.test(char)) {
    return char;
  }
  return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
}

function getCurrentTextForNode(nodeData: TextNodeData, currentTime: number): string {
  const chars = nodeData.originalText.split('');
  
  for (const glitch of nodeData.activeGlitches) {
    const elapsed = currentTime - glitch.startTime;
    
    
    if (elapsed < glitch.duration && glitch.showGlitch) {
      chars[glitch.charIndex] = glitch.glitchChar;
    }
  }
  
  return chars.join('');
}

interface CharacterInfo {
  charIndex: number;
  distance: number;
}

interface TextNodeWithChars {
  node: Text;
  affectedChars: CharacterInfo[];
}

const GLITCH_CONTAINER_CLASS = 'effect-text-glitch';
const GLITCH_EXCLUSION_CLASS = 'effect-no-text-glitch';

function isGlitchable(element: HTMLElement | null): boolean {
  if (!element) return false;
  
  let hasContainer = false;
  let current: HTMLElement | null = element;
  
  while (current && current !== document.body) {
    if (current.classList.contains(GLITCH_EXCLUSION_CLASS)) {
      return false;
    }
    if (current.classList.contains(GLITCH_CONTAINER_CLASS)) {
      hasContainer = true;
    }
    current = current.parentElement;
  }
  
  return hasContainer;
}

function getTextNodesInCircle(x: number, y: number, radius: number): TextNodeWithChars[] {
  const result: TextNodeWithChars[] = [];
  const range = document.createRange();
  
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: (node) => {
        if (!node.textContent?.trim() || 
            node.parentElement?.tagName === 'SCRIPT' ||
            node.parentElement?.tagName === 'STYLE') {
          return NodeFilter.FILTER_REJECT;
        }
        
        if (!isGlitchable(node.parentElement)) {
          return NodeFilter.FILTER_REJECT;
        }
        
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );
  
  let node: Node | null;
  while (node = walker.nextNode()) {
    const textNode = node as Text;
    const text = textNode.textContent || '';
    const affectedChars: CharacterInfo[] = [];
    
    for (let i = 0; i < text.length; i++) {
      range.setStart(textNode, i);
      range.setEnd(textNode, i + 1);
      
      const rects = range.getClientRects();
      if (rects.length === 0) continue;
      
      const rect = rects[0];
      const charX = rect.left + rect.width / 2;
      const charY = rect.top + rect.height / 2;
      
      const distance = Math.sqrt(
        Math.pow(charX - x, 2) + Math.pow(charY - y, 2)
      );
      
      if (distance <= radius) {
        affectedChars.push({ charIndex: i, distance });
      }
    }
    
    if (affectedChars.length > 0) {
      result.push({ node: textNode, affectedChars });
    }
  }
  
  return result;
}

const activeNodes = new Map<Text, TextNodeData>();

function updateNode(data: TextNodeData, currentTime: number) {
  
  data.activeGlitches = data.activeGlitches.filter(glitch => {
    const elapsed = currentTime - glitch.startTime;
    return elapsed < glitch.duration;
  });
  
  
  data.node.textContent = getCurrentTextForNode(data, currentTime);
  
  
  if (data.activeGlitches.length === 0) {
    if (data.timeoutId) {
      clearInterval(data.timeoutId);
    }
    activeNodes.delete(data.node);
  }
}

function applyGlitchEffect(x: number, y: number, radius: number, maxChars: number) {
  const textNodesWithChars = getTextNodesInCircle(x, y, radius);
  const currentTime = performance.now();
  
  
  const allCandidates: Array<{node: Text; charIndex: number; distance: number; originalText: string}> = [];
  
  textNodesWithChars.forEach(({ node, affectedChars }) => {
    const existingData = activeNodes.get(node);
    const originalText = existingData?.originalText || node.textContent || '';
    
    affectedChars.forEach(({ charIndex, distance }) => {
      
      if (existingData) {
        const alreadyGlitched = existingData.activeGlitches.some(g => g.charIndex === charIndex);
        if (alreadyGlitched) return;
      }
      
      
      const normalizedDistance = distance / radius;
      const probability = 1 / (1 + Math.pow(normalizedDistance, RIPPLE_DIST_POWER));
      
      if (Math.random() < probability) {
        allCandidates.push({ node, charIndex, distance, originalText });
      }
    });
  });
  
  
  allCandidates.sort((a, b) => a.distance - b.distance);
  const charsToGlitch = allCandidates.slice(0, maxChars);
  
  
  const nodeUpdates = new Map<Text, CharacterGlitch[]>();
  
  charsToGlitch.forEach(({ node, charIndex, originalText }) => {
    if (!nodeUpdates.has(node)) {
      nodeUpdates.set(node, []);
    }
    
    const glitchChar = getRandomGlitchChar(originalText[charIndex]);
    const newGlitch: CharacterGlitch = {
      charIndex,
      glitchChar,
      startTime: currentTime,
      duration: GLITCH_DURATION,
      showGlitch: Math.random() > ORIG_CHAR_RATIO 
    };
    
    nodeUpdates.get(node)!.push(newGlitch);
  });
  
  
  nodeUpdates.forEach((newGlitches, node) => {
    const existingData = activeNodes.get(node);
    
    if (existingData) {
      
      existingData.activeGlitches.push(...newGlitches);
      existingData.node.textContent = getCurrentTextForNode(existingData, currentTime);
    } else {
      
      const nodeData: TextNodeData = {
        node,
        originalText: node.textContent || '',
        activeGlitches: newGlitches
      };
      
      activeNodes.set(node, nodeData);
      node.textContent = getCurrentTextForNode(nodeData, currentTime);
      
      
      const intervalId = window.setInterval(() => {
        const now = performance.now();
        updateNode(nodeData, now);
        if (!activeNodes.has(node)) {
          clearInterval(intervalId);
        }
      }, ANIMATION_CHECK_INTERVAL);
      
      nodeData.timeoutId = intervalId;
    }
  });
}

function calculateRippleDistance(speed: number): number {
  const speedRatio = Math.min(1, Math.max(0, (speed - MIN_CURSOR_SPEED) / MAX_CURSOR_SPEED));
  return RIPPLE_DIST_MIN + (RIPPLE_DIST_MAX - RIPPLE_DIST_MIN) * Math.pow(speedRatio, 1 / RIPPLE_DIST_POWER);
}

function calculateNumChars(speed: number): number {
  const speedRatio = Math.min(1, Math.max(0, (speed - MIN_CURSOR_SPEED) / MAX_CURSOR_SPEED));
  return Math.floor(NUM_CHARS_MIN + (NUM_CHARS_MAX - NUM_CHARS_MIN) * speedRatio);
}

export function initGlitchTextEffect() {
  let animationFrameId: number;
  
  const animate = () => {
    const now = performance.now() / 1000;
    const dt = now - lastFrameTime;
    lastFrameTime = now;
    
    animationFrameId = requestAnimationFrame(animate);
  };
  
  lastFrameTime = performance.now() / 1000;
  animationFrameId = requestAnimationFrame(animate);
  
  document.addEventListener('click', (event: MouseEvent) => {
    if (event.detail > 1) return;
    
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    
    const numChars = NUM_CHARS_MAX;
    const radius = RIPPLE_DIST_MAX;
    applyGlitchEffect(event.clientX, event.clientY, radius, numChars);
  });
  
  document.addEventListener('mousemove', (event: MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    
    const dx = event.clientX - lastMouseX;
    const dy = event.clientY - lastMouseY;
    const speed = Math.sqrt(dx * dx + dy * dy);
    
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    
    if (speed >= MIN_CURSOR_SPEED) {
      const numChars = calculateNumChars(speed);
      const radius = calculateRippleDistance(speed);
      applyGlitchEffect(event.clientX, event.clientY, radius, numChars);
    }
  });
}
