/** @jsxImportSource @emotion/react */
import { jsx, css } from '@emotion/react';
import { ReactElement, useEffect, useMemo, useRef } from 'react';
import { Gradient } from '../../lib/rainbowCanvas';

export default function RainbowCanvas({ className, ...props }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const gradient = useMemo(() => new Gradient(), []);
  useEffect(() => {gradient.initGradient(canvas.current)}, []);
  return (
    <canvas slot="outer" ref={canvas} className={className}></canvas>
  )
}