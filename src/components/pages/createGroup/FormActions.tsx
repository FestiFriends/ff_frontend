import React from 'react';
import { Button, TwoButtonModal } from '@/components/common';
import { useModalController } from '@/hooks';

interface FormActionProps {
  onSubmit: () => void;
  onReset: () => void;
  isValid: boolean;
  isSubmitting: boolean;
}

const FormAction = ({
  onSubmit,
  onReset,
  isValid,
  isSubmitting,
}: FormActionProps) => {
  const resetModal = useModalController();
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
    </>
  );
};

export default FormAction;
