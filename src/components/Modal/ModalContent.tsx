'use client';
import React, {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { cn } from '@/lib/utils';
import { useModalContext } from './ModalContext';

interface ModalContentProps {
  className?: string;
}

const ModalContent = ({
  className,
  children,
}: PropsWithChildren<ModalContentProps>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { open, closeModal } = useModalContext();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        dialog.close();
      }
    };

    dialog.addEventListener('click', handleBackdropClick);
    return () => dialog.removeEventListener('click', handleBackdropClick);
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className={cn(
        'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
        className
      )}
      onClose={closeModal}
      aria-modal='true'
    >
      {isValidElement(children) ? (
        cloneElement(children)
      ) : (
        <div>{children}</div>
      )}
    </dialog>
  );
};

export default ModalContent;
