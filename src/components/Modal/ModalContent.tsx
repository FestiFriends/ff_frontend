'use client';
import React, {
  cloneElement,
  isValidElement,
  PropsWithChildren,
  useEffect,
  useRef,
} from 'react';
import { cn } from '@/lib/utils';
import Portal from '../Portal';
import { useModalContext } from './ModalContext';

interface ModalContentProps {
  className?: string;
}

const ModalContent = ({
  className,
  children,
}: PropsWithChildren<ModalContentProps>) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { open, disableBackdropClose, closeModal, onClose } = useModalContext();

  const handleClose = () => {
    onClose?.();
    closeModal();
  };

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
      if (event.target === dialog && !disableBackdropClose) {
        dialog.close();
      }
    };

    dialog.addEventListener('click', handleBackdropClick);
    return () => dialog.removeEventListener('click', handleBackdropClick);
  }, [disableBackdropClose]);

  if (!open) return null;

  return (
    <Portal>
      <dialog
        ref={dialogRef}
        className={cn(
          'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
          className
        )}
        onClose={handleClose}
        aria-modal='true'
      >
        {isValidElement(children) ? (
          cloneElement(children)
        ) : (
          <div>{children}</div>
        )}
      </dialog>
    </Portal>
  );
};

export default ModalContent;
