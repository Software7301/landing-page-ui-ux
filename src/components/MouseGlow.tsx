import { useEffect, useRef } from 'react';
import { useMousePosition } from '@/hooks/useMousePosition';

export function MouseGlow() {
  const { x, y } = useMousePosition();
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (glowRef.current) {
      glowRef.current.style.setProperty('--mouse-x', `${x}px`);
      glowRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  }, [x, y]);

  return (
    <div
      ref={glowRef}
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(109, 40, 217, 0.06) 0%, transparent 50%)`,
      }}
    />
  );
}

