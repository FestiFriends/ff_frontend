import React from 'react';
import { Button } from '@/components/common';

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
  // TODO: 투버튼 모달 도입 결정
  const handleReset = () => {
    if (window.confirm('모든 입력 내용이 초기화됩니다. 계속하시겠습니까?')) {
      onReset();
    }
  };

  return (
    <div className='flex gap-4'>
      <Button
        type='button'
        onClick={handleReset}
        variant='secondary'
        className='flex-1'
      >
        초기화
      </Button>

      <Button
        type='submit'
        onClick={onSubmit}
        disabled={!isValid || isSubmitting}
        variant='primary'
        className='flex-1 disabled:cursor-not-allowed'
      >
        {isSubmitting ? '생성 중...' : '모임 만들기'}
      </Button>
    </div>
  );
};

export default FormAction;
