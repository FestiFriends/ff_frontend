import React, {
  ButtonHTMLAttributes,
  MouseEvent,
  PropsWithChildren,
} from 'react';
import { cn } from '@/lib/utils';
import { useModalContext } from './ModalContext';

const ModalAction = ({
  className,
  children,
  onClick,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  const { closeModal } = useModalContext();
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const result = onClick?.(e);
    Promise.resolve(result).then(() => closeModal());
  };

  return (
    <button
      className={cn('cursor-pointer', className)}
      aria-label='모달 제출'
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ModalAction;
