'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Performance } from '@/types/performance';

interface Props {
  performance?: Performance;
  performances?: Performance[];
  children: React.ReactNode;
}

const visitStyles: Record<string, string> = {
  내한: 'bg-[#FFF8DD] text-[#FC8A00]',
  국내: 'bg-red-100 text-primary-red',
};

const getTooltipPosition = (
  e: React.MouseEvent,
  tooltipWidth: number,
  tooltipHeight: number,
  padding = 1,
  gap = 1
) => {
  const { innerWidth, innerHeight } = window;

  let x = e.clientX + padding;
  let y = e.clientY + padding;

  if (x + tooltipWidth > innerWidth) {
    x = innerWidth - tooltipWidth - gap;
  }

  if (y + tooltipHeight > innerHeight) {
    y = innerHeight - tooltipHeight - gap;
  }

  return {
    top: Math.max(y, padding),
    left: Math.max(x, padding),
  };
};

const PerformanceQuickView = ({
  performance,
  performances,
  children,
}: Props) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const portalEl =
    typeof window !== 'undefined' ? document.getElementById('portal') : null;

  const hasPositionedRef = useRef(false);

  const handleHover = (e: React.MouseEvent) => {
    if (!hasPositionedRef.current) {
      const coords = getTooltipPosition(e, 220, 60);
      setCoords(coords);
      hasPositionedRef.current = true;
    }
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
    hasPositionedRef.current = false;
  };

  useEffect(() => {
    if (!show) return;

    const handleDismiss = () => {
      setShow(false);
      hasPositionedRef.current = false;
    };

    window.addEventListener('wheel', handleDismiss, { passive: true });
    window.addEventListener('touchmove', handleDismiss, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleDismiss);
      window.removeEventListener('touchmove', handleDismiss);
    };
  }, [show]);

  return (
    <>
      <div
        role='button'
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setShow((prev) => !prev);
          }
        }}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
        onClick={handleHover}
        className='inline-block w-full'
      >
        {children}
      </div>

      {show
        && portalEl
        && createPortal(
          <div
            className={`fixed z-[9999] max-w-xs rounded text-14_B shadow-lg ${
              performance
                ? visitStyles[performance.visit] || 'bg-gray-100 text-gray-700'
                : ''
            }`}
            style={{
              top: coords.top,
              left: coords.left,
              whiteSpace: performance ? 'nowrap' : 'normal',
              pointerEvents: 'none',
            }}
          >
            {performance && (
              <div className='px-4 py-2'>{performance.title}</div>
            )}

            {performances && (
              <ul className='space-y-1'>
                {performances.map((p) => (
                  <li
                    key={p.id}
                    className={`w-full truncate rounded px-4 py-2 text-left text-ellipsis whitespace-nowrap ${
                      visitStyles[p.visit] || 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {p.title}
                  </li>
                ))}
              </ul>
            )}
          </div>,
          portalEl
        )}
    </>
  );
};

export default PerformanceQuickView;
