'use client';

import { PropsWithChildren, useState } from 'react';
import { ModalContext } from './ModalContext';

interface ModalProps {
  defaultOpen?: boolean;
  disableBackdropClose?: boolean;
  onClose?: () => void;
}

const Modal = ({
  defaultOpen = false,
  disableBackdropClose = false,
  onClose,
  children,
}: PropsWithChildren<ModalProps>) => {
  const [open, setOpen] = useState(defaultOpen);
  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
  };

  const ModalValue = {
    open,
    disableBackdropClose,
    openModal,
    closeModal,
    onClose,
  };

  return <ModalContext value={ModalValue}>{children}</ModalContext>;
};

export default Modal;
