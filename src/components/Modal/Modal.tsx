'use client';

import { PropsWithChildren, useState } from 'react';
import { ModalContext } from './ModalContext';

const Modal = ({ children }: PropsWithChildren) => {
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const ModalValue = {
    open,
    openModal,
    closeModal,
  };

  return <ModalContext value={ModalValue}>{children}</ModalContext>;
};

export default Modal;
