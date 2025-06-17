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

const ModalAction = ({
  className,
  children,
  onClick,
  ...props
}: PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    onClick?: (
      e: MouseEvent<HTMLButtonElement>
    ) => void | boolean | Promise<void | boolean>;
  }
>) => {
  const { closeModal } = useModalContext();
  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    const result = (await onClick?.(e)) as boolean | undefined;
    if (result === false) return;
    closeModal();
  };

  if (isValidElement(children)) {
    const child = children as ReactElement<HTMLAttributes<HTMLElement>>;

    return cloneElement(child, {
      'aria-label': '모달 제출',
      onClick: (e: MouseEvent<HTMLElement>) => {
        const result = child.props.onClick?.(e);
        Promise.resolve(result).then(() => closeModal());
      },
    });
  }

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
