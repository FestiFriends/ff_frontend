import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  label: string;
  children: React.ReactNode;
  contentPosition?: 'right' | 'bottom';
  className?: string;
  labelClassName?: string;
}

const LabeledWrapper = ({
  label,
  children,
  contentPosition = 'right',
  className,
  labelClassName,
}: Props) => {
  const LABEL_CLASS = 'text-sm font-bold text-black whitespace-nowrap w-fit';

  const CONTENT_CLASS = {
    right: 'flex-row justify-between items-center gap-3',
    bottom: 'flex-col gap-3',
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
