'use client';

import { useEffect, useState, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  current: number;
  total: number;
  shouldAnimate?: boolean;
  className?: string;
}

// inView로 인식할 값
const THRESHOLD = 0.4;

const ProgressBar = ({
  current,
  total,
  shouldAnimate = true,
  className,
}: ProgressBarProps) => {
  const { ref, inView } = useInView({
    threshold: THRESHOLD,
    triggerOnce: true,
  });
  const [hasAnimated, setHasAnimated] = useState(false);

  const percent = useMemo(
    () => Math.min((current / total) * 100, 100),
    [current, total]
  );

  useEffect(() => {
    if (inView) setHasAnimated(true);
  }, [inView]);

  return (
    <div
      ref={ref}
      className={cn('w-full', className)}
    >
      <div className='relative h-4 w-full overflow-hidden rounded-full bg-gray-200'>
        <div
          role='progressbar'
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(percent)}
          aria-label='모집 인원 진행률'
          className={cn(
            'h-full rounded-full bg-blue-500',
            shouldAnimate && 'transition-all duration-1000 ease-in-out'
          )}
          style={{ width: hasAnimated ? `${percent}%` : '0%' }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
