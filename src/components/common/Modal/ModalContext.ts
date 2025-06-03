'use client';

import { createContext, useContext } from 'react';

interface ModalContext {
  open: boolean;
  disableBackdropClose?: boolean;
  openModal: () => void;
  closeModal: () => void;
  onClose?: () => void;
}

export const ModalContext = createContext<ModalContext | null>(null);

export const useModalContext = () => {
  const ctx = useContext(ModalContext);

  if (!ctx) {
    throw Error(
      '<Modal>과 관련된 컴포넌트는 <Modal>컴포넌트 내부에서만 사용해야합니다!'
    );
  }

  return ctx;
};
