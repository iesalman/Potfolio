import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const handleHoverCheck = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], .interactive-target');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousemove', handleHoverCheck);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth trailing animation loop
    let animId: number;
    const updateTrail = () => {
      setTrailingPos(prev => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animId = requestAnimationFrame(updateTrail);
    };
    animId = requestAnimationFrame(updateTrail);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousemove', handleHoverCheck);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [position.x, position.y, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Ambient follow glow */}
      <div
        className="fixed pointer-events-none z-50 rounded-full transition-opacity duration-300 -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovering ? '80px' : '45px',
          height: isHovering ? '80px' : '45px',
          background: isHovering 
            ? 'radial-gradient(circle, rgba(219, 216, 227, 0.25) 0%, rgba(92, 84, 112, 0.08) 70%, transparent 100%)' 
            : 'radial-gradient(circle, rgba(92, 84, 112, 0.3) 0%, transparent 70%)',
          transition: 'width 0.25s ease-out, height 0.25s ease-out, background 0.25s ease',
        }}
      />

      {/* Outer cursor ring */}
      <div
        className="fixed pointer-events-none z-50 rounded-full border transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${trailingPos.x}px`,
          top: `${trailingPos.y}px`,
          width: isHovering ? '38px' : '26px',
          height: isHovering ? '38px' : '26px',
          borderColor: isHovering ? 'rgba(219, 216, 227, 0.8)' : 'rgba(92, 84, 112, 0.65)',
          transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovering ? 1.25 : 1})`,
          transition: 'width 0.2s, height 0.2s, border-color 0.2s, transform 0.15s',
        }}
      />

      {/* Center sharp dot */}
      <div
        className="fixed pointer-events-none z-50 rounded-full bg-[#DBD8E3] -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          width: isHovering ? '6px' : '4px',
          height: isHovering ? '6px' : '4px',
          boxShadow: '0 0 8px rgba(219, 216, 227, 0.8)',
          transition: 'width 0.15s, height 0.15s',
        }}
      />
    </>
  );
};
