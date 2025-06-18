'use client';

import React from 'react';
import {
  Modal,
  ModalContent,
  ModalClose,
  ModalAction,
  ModalCancel,
} from '@/components/common/Modal';
import {
  ModalStyles,
  modalVariants,
  mergeModalStyles,
} from './TwoButtonModal.style';

interface TwoButtonModalProps {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  onClose?: () => void;
  disableBackdropClose?: boolean;
  variant?: keyof typeof modalVariants;
  styles?: Partial<ModalStyles>;
  isOpen: boolean;
  onModalClose: () => void;
}

const TwoButtonModal: React.FC<TwoButtonModalProps> = ({
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  onClose,
  disableBackdropClose = true,
  variant = 'default',
  styles: customStyles = {},
  isOpen,
  onModalClose,
}) => {
  const baseStyles = modalVariants[variant] || modalVariants.default;
  const mergedStyles = mergeModalStyles(baseStyles, customStyles);

  const handleClose = () => {
    onClose?.();
    onModalClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onModalClose();
  };

  const handleConfirm = async () => {
    try {
      await onConfirm?.();
      onModalClose();
    } catch (error) {
      console.error('Modal confirm error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      defaultOpen={isOpen}
      disableBackdropClose={disableBackdropClose}
      onClose={handleClose}
    >
      <ModalContent className={mergedStyles.modal}>
        <div className='relative p-6'>
          <ModalClose className='text-gray-400 hover:text-gray-600' />
          <div className='mb-4 pr-8'>
            <h2 className={mergedStyles.header}>{title}</h2>
          </div>
          <div className='mb-6'>
            <p className={mergedStyles.content}>{message}</p>
          </div>
          <div className='flex justify-end gap-3'>
            <ModalCancel
              className={mergedStyles.cancelButton}
              onClick={handleCancel}
            >
              {cancelText}
            </ModalCancel>
            <ModalAction
              className={mergedStyles.confirmButton}
              onClick={handleConfirm}
            >
              {confirmText}
            </ModalAction>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export type { TwoButtonModalProps };

export default TwoButtonModal;
