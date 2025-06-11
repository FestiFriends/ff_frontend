import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useMediaQuery } from 'react-responsive';
import { Performance } from '@/types/performance';

interface Props {
  performance: Performance;
  children: React.ReactNode;
}

const PerformanceHoverCard = ({ performance, children }: Props) => {
  const [show, setShow] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const portalElement =
    typeof window !== 'undefined' ? document.getElementById('portal') : null;

  const updateCoords = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    setCoords({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
  };

  useEffect(() => {
    if (!isMobile || !show) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current?.contains(target)
        || portalElement?.contains(target)
      ) {
        return;
      }
      setShow(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMobile, show, portalElement]);

  const handleClick = () => {
    if (isMobile) {
      updateCoords();
      setShow((prev) => !prev);
    }
  };

  const handleEnter = () => {
    if (!isMobile) {
      updateCoords();
      setShow(true);
    }
  };

  const handleLeave = () => {
    if (!isMobile) {
      setShow(false);
    }
  };

  return (
    <>
      <div
        ref={triggerRef}
        role='button'
        tabIndex={0}
        onClick={handleClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleClick();
          }
        }}
        className='inline-block'
      >
        {children}
      </div>

      {show
        && portalElement
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
          portalElement
        )}
    </>
  );
};

export default PerformanceHoverCard;
