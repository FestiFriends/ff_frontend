import React, {
  cloneElement,
  isValidElement,
  ReactElement,
  ReactNode,
} from 'react';
import { usePopoverContext } from './PopoverContext';
import { cn } from '@/lib/utils';

interface PopoverTriggerProps {
  className?: string;
  children: ReactNode;
}

const PopoverTrigger = ({ className, children }: PopoverTriggerProps) => {
  const { open, openPopover, closePopover } = usePopoverContext();

  const handlePopover = () => {
    if (open) {
      closePopover();
    } else {
      openPopover();
    }
  };

  if (isValidElement(children)) {
    const child = children as ReactElement<any>;

    return cloneElement(child, {
      'aria-label': 'popover open',
      onClick: (e: MouseEvent) => {
        child.props.onClick?.(e);
        handlePopover();
      },
    });
  }

  return (
    <button
      onClick={handlePopover}
      className={cn('cursor-pointer', className)}
      aria-label='popover open'
    >
      {children}
    </button>
  );
};

export default PopoverTrigger;
