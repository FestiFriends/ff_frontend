'use client';

import { useEffect, useRef, useState } from 'react';
import Button from '@/components/common/Button/Button';
import Portal from '@/components/common/Portal';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';

interface GroupApplyModalProps {
  groupId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedGroupId: (groupId: string) => void;
}

const GroupApplyModal = ({
  groupId,
  isOpen,
  setIsOpen,
  setSelectedGroupId,
}: GroupApplyModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [message, setMessage] = useState<string>('');

  const applyToGroup = () => {
    // TODO: 모임 신청 api 연동
    console.log(`apply ${groupId}`);
  };

  const onCloseApplyModal = () => {
    setSelectedGroupId('');
    setMessage('');
    setIsOpen(false);
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleBackdropClick = (event: MouseEvent) => {
      if (event.target === dialog) {
        dialog.close();
      }
    };

    dialog.addEventListener('click', handleBackdropClick);
    return () => dialog.removeEventListener('click', handleBackdropClick);
  }, []);

  if (!isOpen) return null;

  return (
    <Portal>
      <dialog
        ref={dialogRef}
        onClose={onCloseApplyModal}
        aria-modal='true'
        className='fixed top-1/2 left-1/2 w-[calc(100%-32px)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-white p-5 backdrop:bg-[rgba(0,0,0,0.5)]'
      >
        <div className='flex flex-col gap-5'>
          <span className='text-center text-16_B'>신청서 작성</span>
          <TextareaInput
            value={message}
            onChange={setMessage}
            placeholder='간단한 소개를 작성해주세요.'
            className='rounded-[16px] border-1 border-gray-100 px-5 py-4 text-[16px] leading-[180%] font-medium tracking-[-0.35px] text-gray-950 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)] placeholder:text-gray-500'
          />
          <div className='flex gap-2'>
            <Button
              variant='secondary'
              onClick={onCloseApplyModal}
            >
              취소
            </Button>
            <Button onClick={applyToGroup}>신청</Button>
          </div>
        </div>
      </dialog>
    </Portal>
  );
};

export default GroupApplyModal;
