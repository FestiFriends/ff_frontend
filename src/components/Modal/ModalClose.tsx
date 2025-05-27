'use client';

import {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { XIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useModalContext } from './ModalContext';

interface ModalCloseProps {
  className?: string;
}

const ModalClose = ({
  className,
  children,
}: PropsWithChildren<ModalCloseProps>) => {
  const { closeModal } = useModalContext();

  if (isValidElement(children)) {
    const child = children as ReactElement<any>;

    return cloneElement(child, {
      'aria-label': '모달 닫기',
      onClick: (e: MouseEvent) => {
        child.props.onClick?.(e);
        closeModal();
      },
      className: cn(
        'absolute top-2 right-2 h-fit w-fit cursor-pointer',
        child.props.className
      ),
    });
  }

  return (
    <button
      className={cn(
        'absolute top-2 right-2 h-fit w-fit cursor-pointer',
        className
      )}
      onClick={closeModal}
      aria-label='모달 닫기'
    >
      <XIcon className='h-4 w-4' />
    </button>
  );
};

export default ModalClose;
