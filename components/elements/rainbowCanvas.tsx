import {
  ReactElement, useEffect, useMemo, useRef,
} from 'react';
import {Gradient} from '../../lib/rainbowCanvas';

export default function RainbowCanvas({className, ...props}: {className?: string}) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const gradient = useMemo(() => new Gradient(), []);
  useEffect(() => {
    if (canvas.current) gradient.initGradient(canvas.current);
  }, [gradient, canvas]);
  return (
    <canvas slot="outer" ref={canvas} className={className} />
  );
}

RainbowCanvas.defaultProps = {
  className: '',
};
