'use client';

import { useEffect, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  shouldAnimate?: boolean;
  className?: string;
  showInfo?: boolean;
}

// inView로 인식할 값
const THRESHOLD = 0.4;

const ProgressBar = ({
  current,
  total,
  shouldAnimate = true,
  className,
  showInfo = true,
}: ProgressBarProps) => {
  const { ref, inView } = useInView({
    threshold: THRESHOLD,
    triggerOnce: true,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  const percent = useMemo(
    () => Math.max(0, Math.min((current / total) * 100, 100)),
    [current, total]
  );

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={cn('flex w-full flex-col gap-2', className)}
    >
      {showInfo && (
        <div className='flex justify-between text-12_M text-gray-700'>
          <span>모집 인원</span>
          <span>
            ({current}/{total}명)
          </span>
        </div>
      )}
      <div className='relative h-1 w-full overflow-hidden rounded-md bg-gray-100'>
        <div
          role='progressbar'
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
          aria-label='모집 인원 진행률'
          className={cn(
            'h-full rounded-md bg-primary-red',
            shouldAnimate && 'transition-all duration-1000 ease-in-out'
          )}
          style={{ width: hasAnimated ? `${percent}%` : '0%' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
