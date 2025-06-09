import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Performance } from '@/types/performance';

interface Props {
  performance: Performance;
  children: React.ReactNode;
}

const PerformanceHoverCard = ({ performance, children }: Props) => {
  const [show, setShow] = useState(false);
  const [hoverCardRoot, setHoverCardRoot] = useState<HTMLElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const existing = document.getElementById('hover-card-root');
    if (existing) setHoverCardRoot(existing);
  }, []);

  const handleEnter = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setShow(true);
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      <div
        ref={triggerRef}
        className='inline-block'
        onMouseEnter={handleEnter}
        onMouseLeave={() => setShow(false)}
      >
        {children}
      </div>

      {show
        && hoverCardRoot
        && createPortal(
          <div
            className='fixed z-50 w-64 rounded border bg-white p-3 shadow-lg'
            style={{
              top: isMobile ? '2rem' : coords.top,
              left: isMobile ? '50%' : coords.left,
              transform: isMobile ? 'translateX(-50%)' : 'none',
            }}
          >
            <p className='text-sm font-bold'>{performance.title}</p>
            <p className='text-xs text-gray-600'>{performance.location}</p>
            <div className='mt-1'>
              <p className='text-xs text-gray-600'>
                시작: {performance.startDate}
              </p>
              <p className='text-xs text-gray-600'>
                종료: {performance.endDate}
              </p>
            </div>
            <p className='mt-1 line-clamp-3 text-xs text-gray-500'>
              출연진: {performance.cast.join(', ')}
            </p>
          </div>,
          hoverCardRoot
        )}
    </>
  );
};

export default PerformanceHoverCard;
