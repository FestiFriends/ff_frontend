import React, {
  ButtonHTMLAttributes,
  cloneElement,
  HTMLAttributes,
  isValidElement,
  MouseEvent,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { cn } from '@/lib/utils';
import { useModalContext } from './ModalContext';

const ModalCancel = ({
  className,
  children,
  onClick,
  ...props
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => {
  const { closeModal } = useModalContext();
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    closeModal();
  };

  if (isValidElement(children)) {
    const child = children as ReactElement<HTMLAttributes<HTMLElement>>;

    return cloneElement(child, {
      'aria-label': '모달 취소',
      onClick: (e: MouseEvent<HTMLElement>) => {
        child.props.onClick?.(e);
        closeModal();
      },
    });
  }

  return (
    <button
      className={cn('cursor-pointer', className)}
      aria-label='모달 취소'
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default ModalCancel;
