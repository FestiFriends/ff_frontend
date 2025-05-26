'use client';

import React, {
  cloneElement,
  isValidElement,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { cn } from '@/lib/utils';
import { useModalContext } from './ModalContext';

interface ModalTriggerProps {
  className?: string;
}

const ModalTrigger = ({
  className,
  children,
}: PropsWithChildren<ModalTriggerProps>) => {
  const { openModal } = useModalContext();

  if (isValidElement(children)) {
    const child = children as ReactElement<any>;

    return cloneElement(child, {
      'aria-label': '모달 열기',
      onClick: (e: MouseEvent) => {
        child.props.onClick?.(e);
        openModal();
      },
    });
  }

  return (
    <button
      onClick={openModal}
      className={cn('cursor-pointer', className)}
      aria-label='모달 열기'
    >
      {children}
    </button>
  );
};

export default ModalTrigger;
