'use client';

import { useState } from 'react';

interface ModalControllerProps {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const useModalController = (): ModalControllerProps => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return { isOpen, openModal, closeModal };
};

export default useModalController;
export type { ModalControllerProps };
