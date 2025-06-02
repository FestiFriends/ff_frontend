import React, {
  cloneElement,
  HTMLAttributes,
  isValidElement,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';
import { cn } from '@/lib/utils';
import { usePopoverContext } from './PopoverContext';

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
    const child = children as ReactElement<HTMLAttributes<HTMLElement>>;

    return cloneElement(child, {
      'aria-label': 'popover open',
      onClick: (e: MouseEvent<HTMLElement>) => {
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
