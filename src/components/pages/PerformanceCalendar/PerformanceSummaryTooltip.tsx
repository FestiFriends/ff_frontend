'use client';

import { useState } from 'react';
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

  const handleMouseMove = (e: React.MouseEvent) => {
    setCoords({ top: e.clientY + 14, left: e.clientX + 14 });
  };

  return (
    <>
      <div
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        onMouseMove={handleMouseMove}
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
