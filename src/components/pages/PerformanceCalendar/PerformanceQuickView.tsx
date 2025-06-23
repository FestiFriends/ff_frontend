'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Performance } from '@/types/performance';

interface Props {
  performance: Performance;
  children: React.ReactNode;
}

const visitStyles: Record<string, string> = {
  내한: 'bg-[#FFF8DD] text-[#FC8A00]',
  국내: 'bg-red-100 text-primary-red',
};

const PerformanceQuickView = ({ performance, children }: Props) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const portalElement =
    typeof window !== 'undefined' ? document.getElementById('portal') : null;

  const styleClass =
    visitStyles[performance.visit] || 'bg-gray-100 text-gray-700';

  const updateCoords = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setCoords({
      top: e.clientY + 10,
      left: e.clientX + 10,
    });
  };

  useEffect(() => {
    if (show) updateCoords();
  }, [show]);

  return (
    <>
      <div
        ref={triggerRef}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setShow((prev) => !prev);
          }
        }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onMouseMove={handleMouseMove}
        onClick={() => setShow((prev) => !prev)}
        className='inline-block w-full'
      >
        {children}
      </div>

      {show
        && portalElement
        && createPortal(
          <div
            className={`fixed z-[9999] rounded px-4 py-2 text-14_B shadow-lg ${styleClass}`}
            style={{
              top: coords.top,
              left: coords.left,
              position: 'fixed',
              whiteSpace: 'nowrap',
            }}
          >
            {performance.title}
          </div>,
          portalElement
        )}
    </>
  );
};

export default PerformanceQuickView;
