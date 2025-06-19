import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  label: string;
  children: React.ReactNode;
  contentPosition?: 'right' | 'bottom';
  className?: string;
  labelClassName?: string;
  gap?: number;
}

const LabeledWrapper = ({
  label,
  children,
  contentPosition = 'right',
  className,
  labelClassName,
  gap,
}: Props) => {
  const LABEL_CLASS =
    'text-14_B font-bold text-gray-950 whitespace-nowrap w-fit';

  const CONTENT_CLASS = {
    right: `flex-row justify-between items-center gap-${gap ? gap : '2.5'}`,
    bottom: `flex-col gap-${gap ? gap : '2.5'}`,
  };
  const Label = () => (
    <div className={cn(LABEL_CLASS, labelClassName)}>{label}</div>
  );

  return (
    <div
      className={cn('flex w-full', CONTENT_CLASS[contentPosition], className)}
    >
      <Label />
      {children}
    </div>
  );
};

export default LabeledWrapper;
