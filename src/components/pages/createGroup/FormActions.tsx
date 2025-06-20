import React, { useState, useEffect } from 'react';
import { Button, TwoButtonModal, Toast } from '@/components/common';
import { useModalController } from '@/hooks';

interface FormActionProps {
  onSubmit: () => void;
  onReset: () => void;
  isValid: boolean;
  isSubmitting: boolean;
  submitError?: string;
  showSuccessToast?: boolean;
}

const FormAction = ({
  onSubmit,
  onReset,
  isValid,
  isSubmitting,
  submitError,
  showSuccessToast,
}: FormActionProps) => {
  const resetModal = useModalController();

  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showSubmittingToast, setShowSubmittingToast] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      setShowSubmittingToast(true);
    } else {
      setShowSubmittingToast(false);
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (submitError) {
      setShowErrorToast(true);
    }
  }, [submitError]);

  return (
    <>
      <div className='flex gap-4'>
        <Button
          type='button'
          onClick={() => resetModal.openModal()}
          variant='secondary'
          className='flex-1 whitespace-nowrap'
        >
          초기화
        </Button>
        <Button
          type='submit'
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          variant='primary'
          className='flex-1 whitespace-nowrap disabled:cursor-not-allowed'
        >
          {isSubmitting ? '생성 중...' : '모임 만들기'}
        </Button>
      </div>

      <TwoButtonModal
        isOpen={resetModal.isOpen}
        onModalClose={resetModal.closeModal}
        variant='warning'
        title='입력 내용 초기화'
        message='모든 입력 내용이 초기화됩니다. 계속하시겠습니까?'
        confirmText='초기화'
        cancelText='취소'
        onConfirm={() => onReset()}
      />

      {showSubmittingToast && (
        <Toast
          message='모임을 생성 중입니다...'
          type='info'
          onClose={() => setShowSubmittingToast(false)}
        />
      )}

      {showSuccessToast && (
        <Toast
          message='모임이 성공적으로 생성되었습니다!'
          type='success'
          onClose={() => {}}
        />
      )}

      {showErrorToast && submitError && (
        <Toast
          message={submitError}
          type='error'
          onClose={() => setShowErrorToast(false)}
        />
      )}
    </>
  );
};

export default FormAction;
