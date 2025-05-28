'use client';

import React, { PropsWithChildren } from 'react';
import { usePopoverContext } from './PopoverContext';
import { cn } from '@/lib/utils';

interface PopoverContentProps {
  className?: string;
}

const PopoverContent = ({
  className,
  children,
}: PropsWithChildren<PopoverContentProps>) => {
  const { open, direction } = usePopoverContext();

  const openDirectionClassName = cn({
    'bottom-full left-1/2 -translate-x-1/2': direction === 'top', // 위
    'top-full left-1/2 -translate-x-1/2': direction === 'bottom', // 아래
    'top-1/2 left-full -translate-y-1/2': direction === 'right', // 오른쪽
    'top-1/2 right-full -translate-y-1/2': direction === 'left', // 왼쪽
  });

  return (
    <>
      {open && (
        <div className={cn('absolute', openDirectionClassName, className)}>
          {children}
        </div>
      )}
    </>
  );
};

export default PopoverContent;
