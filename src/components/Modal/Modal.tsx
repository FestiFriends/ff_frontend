'use client';

import { PropsWithChildren, useState } from 'react';
import { ModalContext } from './ModalContext';

interface ModalProps {
  defaultOpen?: boolean;
  onClose?: () => void;
}

const Modal = ({
  defaultOpen = false,
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
    openModal,
    closeModal,
    onClose,
  };

  return <ModalContext value={ModalValue}>{children}</ModalContext>;
};

export default Modal;
