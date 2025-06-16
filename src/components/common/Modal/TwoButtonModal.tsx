'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import {
  Modal,
  ModalTrigger,
  ModalContent,
  ModalClose,
  ModalAction,
  ModalCancel,
} from './index';

export interface TwoButtonModalProps {
  triggerText: string;
  triggerClassName?: string;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void | Promise<void>;
  onCancel?: () => void;
  onClose?: () => void;
  disableBackdropClose?: boolean;
  modalClassName?: string;
  confirmButtonClassName?: string;
  cancelButtonClassName?: string;
}

const TwoButtonModal: React.FC<TwoButtonModalProps> = ({
  triggerText,
  triggerClassName,
  title,
  message,
  confirmText = '확인',
  cancelText = '취소',
  onConfirm,
  onCancel,
  onClose,
  disableBackdropClose = true,
  modalClassName,
  confirmButtonClassName,
  cancelButtonClassName,
}) => (
  <Modal
    disableBackdropClose={disableBackdropClose}
    onClose={onClose}
  >
    <ModalTrigger
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
        'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        triggerClassName
      )}
    >
      {triggerText}
    </ModalTrigger>

    <ModalContent
      className={cn(
        'mx-4 w-full max-w-md overflow-hidden rounded-lg bg-white p-0 shadow-xl',
        modalClassName
      )}
    >
      <div className='relative p-6'>
        <ModalClose className='text-gray-400 hover:text-gray-600' />

        {/* 모달 헤더 */}
        <div className='mb-4 pr-8'>
          <h2 className='text-lg leading-6 font-semibold text-gray-900'>
            {title}
          </h2>
        </div>

        {/* 모달 내용 */}
        <div className='mb-6'>
          <p className='text-sm leading-5 text-gray-500'>{message}</p>
        </div>

        {/* 버튼 영역 */}
        <div className='flex justify-end gap-3'>
          <ModalCancel
            className={cn(
              'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
              'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
              cancelButtonClassName
            )}
            onClick={onCancel}
          >
            {cancelText}
          </ModalCancel>

          <ModalAction
            className={cn(
              'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:ring-offset-2 focus:outline-none',
              'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
              confirmButtonClassName
            )}
            onClick={onConfirm}
          >
            {confirmText}
          </ModalAction>
        </div>
      </div>
    </ModalContent>
  </Modal>
);

export default TwoButtonModal;
