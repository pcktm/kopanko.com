const LOWERCASE_LETTERS = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';

interface TextNodeData {
  node: Text;
  originalText: string;
  charMask: boolean[];
  charDistances: number[];
  intervalId?: number;
  startTime: number;
}

const EFFECT_RADIUS = 150;
const ANIMATION_DURATION = 400;
const ANIMATION_INTERVAL = 200;
const MOUSE_MOVE_THRESHOLD = 50;
const MOUSE_TRAIL_RADIUS = 100;
const DEBOUNCE_DELAY = 150;
const GLITCH_INTENSITY = 0.4;

function getRandomAsciiChar(char: string): string {
  if (!/[a-zA-Z0-9]/.test(char)) {
    return char;
  }
  
  if (/[a-z]/.test(char)) {
    return LOWERCASE_LETTERS[Math.floor(Math.random() * LOWERCASE_LETTERS.length)];
  } else if (/[A-Z]/.test(char)) {
    return UPPERCASE_LETTERS[Math.floor(Math.random() * UPPERCASE_LETTERS.length)];
  } else if (/[0-9]/.test(char)) {
    return NUMBERS[Math.floor(Math.random() * NUMBERS.length)];
  }
  
  return char;
}

function toGlitchText(text: string, charMask: boolean[], charDistances: number[], elapsed: number): string {
  return text
    .split('')
    .map((char, index) => {
      if (!charMask[index]) {
        return char;
      }
      
      const distanceIntensity = 1 - (charDistances[index] / EFFECT_RADIUS);
      const timeFade = 1 - (elapsed / ANIMATION_DURATION);
      const intensity = Math.max(0, distanceIntensity * timeFade);
      
      if (Math.random() > intensity * GLITCH_INTENSITY) {
        return char;
      }
      return getRandomAsciiChar(char);
    })
    .join('');
}

interface CharacterInfo {
  charIndex: number;
  distance: number;
}

interface TextNodeWithChars {
  node: Text;
  affectedChars: CharacterInfo[];
}

const ALLOWED_CLASSES = ['font-mono', 'font-pixel', 'effect-textglitch', 'font-redaction20'];

function hasAllowedClass(element: HTMLElement | null): boolean {
  if (!element) return false;
  
  let current: HTMLElement | null = element;
  while (current && current !== document.body) {
    if (ALLOWED_CLASSES.some(className => current?.classList.contains(className))) {
      return true;
    }
    current = current.parentElement;
  }
  return false;
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
        
        if (!hasAllowedClass(node.parentElement)) {
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

function animateNode(data: TextNodeData) {
  const elapsed = Date.now() - data.startTime;
  
  if (elapsed >= ANIMATION_DURATION) {
    data.node.textContent = data.originalText;
    if (data.intervalId) {
      clearInterval(data.intervalId);
    }
    activeNodes.delete(data.node);
    return;
  }
  
  data.node.textContent = toGlitchText(data.originalText, data.charMask, data.charDistances, elapsed);
}

function applyGlitchEffect(x: number, y: number, radius: number = EFFECT_RADIUS) {
  const textNodesWithChars = getTextNodesInCircle(x, y, radius);
  
  textNodesWithChars.forEach(({ node, affectedChars }) => {
    if (activeNodes.has(node)) {
      const data = activeNodes.get(node)!;
      if (data.intervalId) {
        clearInterval(data.intervalId);
      }
    }
    
    const originalText = activeNodes.get(node)?.originalText || node.textContent || '';
    const charMask = new Array(originalText.length).fill(false);
    const charDistances = new Array(originalText.length).fill(Infinity);
    
    affectedChars.forEach(({ charIndex, distance }) => {
      charMask[charIndex] = true;
      charDistances[charIndex] = distance;
    });
    
    const avgDistance = affectedChars.reduce((sum, c) => sum + c.distance, 0) / affectedChars.length;
    
    const nodeData: TextNodeData = {
      node,
      originalText,
      charMask,
      charDistances,
      startTime: Date.now(),
    };
    
    activeNodes.set(node, nodeData);
    animateNode(nodeData);
    
    const animationSpeed = ANIMATION_INTERVAL * (0.5 + (avgDistance / radius) * 0.5);
    nodeData.intervalId = window.setInterval(() => animateNode(nodeData), animationSpeed);
  });
}

let lastMouseX = 0;
let lastMouseY = 0;
let mouseMovedDistance = 0;
let mouseMoveTimeout: number | undefined;
let lastTriggerTime = 0;

export function initGlitchTextEffect() {
  document.addEventListener('click', (event: MouseEvent) => {
    if (event.detail > 1) return;
    
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    
    applyGlitchEffect(event.clientX, event.clientY, EFFECT_RADIUS);
  });
  
  document.addEventListener('mousemove', (event: MouseEvent) => {
    const selection = window.getSelection();
    if (selection && selection.toString().length > 0) return;
    
    const dx = event.clientX - lastMouseX;
    const dy = event.clientY - lastMouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    mouseMovedDistance += distance;
    lastMouseX = event.clientX;
    lastMouseY = event.clientY;
    
    if (mouseMoveTimeout) {
      clearTimeout(mouseMoveTimeout);
    }
    
    const now = Date.now();
    if (mouseMovedDistance >= MOUSE_MOVE_THRESHOLD && (now - lastTriggerTime) >= DEBOUNCE_DELAY) {
      applyGlitchEffect(event.clientX, event.clientY, MOUSE_TRAIL_RADIUS);
      mouseMovedDistance = 0;
      lastTriggerTime = now;
    }
    
    mouseMoveTimeout = window.setTimeout(() => {
      mouseMovedDistance = 0;
    }, 200);
  });
}
