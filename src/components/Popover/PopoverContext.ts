'use client';

import { createContext, useContext } from 'react';

interface IPopoverContext {
  open: boolean;
  direction: 'top' | 'right' | 'bottom' | 'left';
  openPopover: () => void;
  closePopover: () => void;
}

export const PopoverContext = createContext<IPopoverContext | null>(null);

export const usePopoverContext = () => {
  const ctx = useContext(PopoverContext);

  if (!ctx) {
    throw Error(
      '<Popover>와 관련된 컴포넌트는 <Popover>컴포넌트 내부에서만 사용해야합니다!'
    );
  }

  return ctx;
};
