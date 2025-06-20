'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import Portal from '@/components/common/Portal';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import { usePostJoinGroup } from '@/hooks/groupHooks/groupHooks';
import { useLeaveGroup } from '@/hooks/groupsManagementsHooks/groupsManagementsHooks';
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
  const { mutate: postJoinGroup, status: joinStatus } = usePostJoinGroup();
  const { mutate: leaveGroup, status: leaveStatus } = useLeaveGroup();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [description, setDescription] = useState<string>('');
  const router = useRouter();

  const onCloseModal = () => {
    setDescription('');
    setIsOpen(false);
  };

  const applyToGroup = () => {
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
        value={description}
        onChange={setDescription}
        placeholder='간단한 소개를 작성해주세요.'
        className='rounded-[16px] border-1 border-gray-100 px-5 py-4 text-[16px] leading-[180%] font-medium tracking-[-0.35px] text-gray-950 shadow-[0px_2px_6px_0px_rgba(0,0,0,0.02)] placeholder:text-gray-500'
      />
      <div className='flex gap-2'>
        <Button
          variant='secondary'
          onClick={onCloseModal}
          disabled={joinStatus === 'pending'}
        >
          취소
        </Button>
        <Button
          onClick={applyToGroup}
          disabled={joinStatus === 'pending'}
        >
          {joinStatus === 'pending' ? '신청중...' : '신청'}
        </Button>
      </div>
    </div>
  );

  const renderLeaveContent = () => (
    <div className='flex flex-col gap-7.5 pt-5.5'>
      <p className='flex w-full justify-center text-16_B text-black'>
        모임을 탈퇴하시겠습니까?
      </p>
      <div className='flex gap-2'>
        <Button
          variant='secondary'
          onClick={onCloseModal}
          disabled={leaveStatus === 'pending'}
        >
          취소
        </Button>
        <Button
          onClick={leaveFromGroup}
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
        className='fixed top-1/2 left-1/2 w-[calc(100%-32px)] max-w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-white p-5 backdrop:bg-[rgba(0,0,0,0.5)]'
      >
        {isMember ? renderLeaveContent() : renderApplyContent()}
      </dialog>
    </Portal>
  );
};

export default GroupModal;
