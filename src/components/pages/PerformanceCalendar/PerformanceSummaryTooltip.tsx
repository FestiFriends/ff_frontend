'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Performance } from '@/types/performance';

interface Props {
  performances: Performance[];
  children: React.ReactNode;
}

const visitStyles: Record<string, string> = {
  내한: 'bg-[#FFF8DD] text-[#FC8A00]',
  국내: 'bg-red-100 text-primary-red',
};

const PerformanceSummaryTooltip = ({ performances, children }: Props) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const portalEl =
    typeof window !== 'undefined' ? document.getElementById('portal') : null;

  const handleClick = (e: React.MouseEvent) => {
    const tooltipWidth = 220;
    const tooltipHeight = 60;
    const padding = 12;

    const { innerWidth, innerHeight } = window;

    let x = e.clientX + padding;
    let y = e.clientY + padding;

    if (x + tooltipWidth > innerWidth) {
      x = innerWidth - tooltipWidth - padding;
    }

    if (y + tooltipHeight > innerHeight) {
      y = innerHeight - tooltipHeight - padding;
    }

    x = Math.max(x, padding);
    y = Math.max(y, padding);

    setCoords({ top: y, left: x });
    setShow(true);
  };

  useEffect(() => {
    if (!show) return;

    const handleTouchMove = () => {
      setShow(false);
    };

    window.addEventListener('touchmove', handleTouchMove);
    return () => window.removeEventListener('touchmove', handleTouchMove);
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
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onMouseMove={handleClick}
        onClick={handleClick}
        className='inline-block'
      >
        {children}
      </div>

      {show
        && portalEl
        && createPortal(
          <div
            className='fixed z-[9999] max-w-xs rounded text-14_B shadow-lg'
            style={{
              top: coords.top,
              left: coords.left,
              whiteSpace: 'normal',
            }}
          >
            <ul className='space-y-1'>
              {performances.map((p) => (
                <li
                  key={p.id}
                  className={`w-full truncate rounded px-4 py-2 text-left text-ellipsis whitespace-nowrap ${visitStyles[p.visit] || 'bg-gray-100 text-gray-700'}`}
                >
                  {p.title}
                </li>
              ))}
            </ul>
          </div>,
          portalEl
        )}
    </>
  );
};

export default PerformanceSummaryTooltip;
