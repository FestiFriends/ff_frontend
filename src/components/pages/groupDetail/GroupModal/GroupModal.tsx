'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import Portal from '@/components/common/Portal';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import { usePostJoinGroup } from '@/hooks/groupHooks/groupHooks';
import { useLeaveGroup } from '@/hooks/groupsManagementsHooks/groupsManagementsHooks';
import { hasProfanity } from '@/lib/utils';
import { ToastContent } from '@/types/toastContent';

interface GroupModalProps {
  groupId: string;
  isMember: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setShowToast?: (show: boolean) => void;
  setToastContent?: (value: ToastContent) => void;
}

const GroupModal = ({
  groupId,
  isMember,
  isOpen,
  setIsOpen,
  setShowToast,
  setToastContent,
}: GroupModalProps) => {
  const router = useRouter();
  const { mutate: postJoinGroup, status: joinStatus } = usePostJoinGroup();
  const { mutate: leaveGroup, status: leaveStatus } = useLeaveGroup();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [description, setDescription] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
    setIsValid(!hasProfanity(value));
  };

  const onCloseModal = () => {
    setDescription('');
    setIsValid(true);
    setIsOpen(false);
  };

  const applyToGroup = () => {
    if (description.trim() === '') return;
    if (groupId && description) {
      postJoinGroup(
        { groupId, description },
        {
          onSuccess: () => {
            setToastContent?.({
              message: '신청 완료되었습니다.',
              type: 'success',
            });
          },
          onError: (error) => {
            setToastContent?.({
              message: error.message,
              type: 'error',
            });
          },
          onSettled: () => {
            setShowToast?.(true);
            onCloseModal();
          },
        }
      );
    }
  };

  const leaveFromGroup = () => {
    if (groupId) {
      leaveGroup(
        { groupId },
        {
          onSuccess: () => {
            setToastContent?.({
              message: '모임에서 탈퇴하였습니다.',
              type: 'success',
            });
            router.back();
          },
          onError: (error) => {
            setToastContent?.({
              message: error.message,
              type: 'error',
            });
          },
          onSettled: () => {
            setShowToast?.(true);
            onCloseModal();
          },
        }
      );
    }
  };

  const renderApplyContent = () => (
    <div className='flex flex-col gap-5'>
      <span className='text-center text-16_B'>신청서 작성</span>
      <TextareaInput
        rows={5}
        value={description}
        onChange={handleDescriptionChange}
        isValidText={isValid}
        showWarning={description !== '' && !isValid}
        placeholder='간단한 소개를 작성해주세요.'
        className='rounded-[16px] border-1 border-gray-100 px-5 py-4 text-[16px] leading-[180%] font-medium tracking-[-0.35px] text-gray-950 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)] placeholder:text-gray-500'
      />
      <div className='flex gap-2'>
        <Button
          variant='secondary'
          onClick={onCloseModal}
          className='px-5 py-2.5'
          disabled={joinStatus === 'pending'}
        >
          취소
        </Button>
        <Button
          onClick={applyToGroup}
          className='px-5 py-2.5'
          color={joinStatus === 'pending' || !isValid ? 'disable' : 'normal'}
          disabled={joinStatus === 'pending' || !isValid}
        >
          {joinStatus === 'pending' ? '신청중...' : '신청'}
        </Button>
      </div>
    </div>
  );

  const renderLeaveContent = () => (
    <div className='flex flex-col gap-7.5 pt-7'>
      <p className='flex w-full justify-center text-center text-16_B text-black'>
        모임을 탈퇴하시겠습니까?
      </p>
      <div className='flex gap-2.5'>
        <Button
          variant='secondary'
          onClick={onCloseModal}
          className='px-5 py-2.5'
          disabled={leaveStatus === 'pending'}
        >
          취소
        </Button>
        <Button
          onClick={leaveFromGroup}
          className='px-5 py-2.5'
          color={joinStatus === 'pending' ? 'disable' : 'normal'}
          disabled={leaveStatus === 'pending'}
        >
          {leaveStatus === 'pending' ? '탈퇴중...' : '탈퇴'}
        </Button>
      </div>
    </div>
  );

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
        onClose={onCloseModal}
        aria-modal='true'
        className='fixed top-1/2 left-1/2 w-[calc(100%-24px)] max-w-[343px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-white p-5 backdrop:bg-[rgba(0,0,0,0.5)]'
      >
        {isMember ? renderLeaveContent() : renderApplyContent()}
      </dialog>
    </Portal>
  );
};

export default GroupModal;
