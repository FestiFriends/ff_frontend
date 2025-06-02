import React, { ReactNode, useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside/useClickOutside';
import { PopoverContext } from './PopoverContext';

interface PopoverProps {
  direction?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
}

const Popover = ({ direction = 'bottom', children }: PopoverProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  useClickOutside({
    ref,
    onClose: handleClose,
  });

  const popoverValue = {
    open: isOpen,
    direction,
    openPopover: handleOpen,
    closePopover: handleClose,
  };

  return (
    <PopoverContext value={popoverValue}>
      <div
        className='relative'
        ref={ref}
      >
        {children}
      </div>
    </PopoverContext>
  );
};

export default Popover;
