'use client';

import React, { useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import CreateReportModal from '@/components/common/CreateReportModal/CreateReportModal';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import MoreDropdown from '@/components/common/MoreDropdown/MoreDropdown';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import { useDeleteComment, useUpdateComment } from '@/hooks/postHooks/postHook';
import { cn, hasProfanity } from '@/lib/utils';
import { Comment } from '@/types/comment';
import { ReportTarget } from '@/types/enums';
import { formatRelativeDate } from '@/utils/date';

interface CommentItemProps {
  comment: Comment;
  className?: string;
}

type ModalType = 'delete' | 'edit' | null;

const CommentItem = ({ comment, className }: CommentItemProps) => {
  const { author, content, createdAt, isMine } = comment;
  const { profileImage: profileImageUrl, name } = author ?? {};
  const { mutate: deleteComment } = useDeleteComment();
  const { mutate: updateComment } = useUpdateComment();
  const params = useParams();
  const groupId = params?.groupId as string;
  const postId = params?.postId as string;
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [editMessage, setEditMessage] = useState(content);
  const [originalEditMessage, setOriginalEditMessage] = useState(content);
  const reportTriggerRef = useRef<HTMLButtonElement>(null);

  const openModal = (type: ModalType) => {
    setModalType(type);

    if (type === 'edit') {
      setEditMessage(content);
      setOriginalEditMessage(content);
    }

    triggerRef.current?.click();
  };

  const handleDeleteComment = () => {
    if (!isMine) return;

    deleteComment({ groupId, postId, commentId: comment.id });
    setModalType(null);
  };

  const handleEditSubmit = () => {
    if (!isEditable) return;

    updateComment({
      groupId,
      postId,
      commentId: comment.id,
      content: editMessage,
    });
    setModalType(null);
  };

  const handleCancelEdit = () => {
    setEditMessage(originalEditMessage);
    setModalType(null);
  };

  const handleReportComment = () => {
    reportTriggerRef.current?.click();
  };

  const closeModal = () => {
    setModalType(null);
  };

  const dropdownItems = isMine
    ? [
        {
          label: '수정하기',
          onClick: () => openModal('edit'),
        },
        {
          label: '삭제하기',
          onClick: () => openModal('delete'),
        },
      ]
    : [
        {
          label: '신고하기',
          onClick: () => handleReportComment(),
        },
      ];

  const isEditable =
    editMessage !== originalEditMessage && !hasProfanity(editMessage);

  return (
    <div className={cn('flex w-full items-center py-3.5', className)}>
      <div className='flex w-full items-start justify-center gap-2.5'>
        <ProfileImage
          size='sm'
          border={false}
          src={profileImageUrl}
          alt={`${name}의 프로필 이미지`}
        />
        <div className='flex flex-1 flex-col'>
          <span className='pb-1 text-14_B text-gray-950'>{name}</span>
          <span className='pb-2.5 text-13_M text-gray-500'>
            {formatRelativeDate(createdAt)}
          </span>
          <span className='text-14_M text-black'>{content}</span>
        </div>
        <MoreDropdown items={dropdownItems} />
      </div>

      {/* 통합 모달 */}
      <Modal>
        <ModalTrigger>
          <button ref={triggerRef}></button>
        </ModalTrigger>
        <ModalContent className='flex w-[343px] flex-col rounded-2xl bg-white px-5 pb-5 text-center'>
          {modalType === 'delete' ? (
            <p className='mb-[30px] flex w-full justify-center pt-11 text-16_B text-black'>
              댓글을 삭제하시겠습니까?
            </p>
          ) : modalType === 'edit' ? (
            <div className='mb-5 flex flex-col gap-5 pt-5'>
              <span className='text-16_B text-black'>댓글 수정</span>
              <TextareaInput
                value={editMessage}
                onChange={setEditMessage}
                className='border-1 border-gray-100 text-16_body_M leading-[180%] tracking-[-0.4px] text-gray-500 shadow-none focus:ring-0 focus:outline-none'
              />
            </div>
          ) : null}
          <div className='flex w-full justify-between gap-2.5'>
            <ModalCancel className='w-1/2'>
              <Button
                variant='secondary'
                onClick={modalType === 'edit' ? handleCancelEdit : closeModal}
              >
                {modalType === 'delete' ? '아니요' : '취소'}
              </Button>
            </ModalCancel>
            <ModalAction className='w-1/2'>
              <Button
                onClick={
                  modalType === 'delete'
                    ? handleDeleteComment
                    : handleEditSubmit
                }
                disabled={modalType === 'edit' && !isEditable}
                color={
                  modalType === 'edit' && !isEditable ? 'disable' : 'normal'
                }
              >
                {modalType === 'delete' ? '네' : '수정'}
              </Button>
            </ModalAction>
          </div>
        </ModalContent>
      </Modal>

      <CreateReportModal
        targetId={comment.id.toString()}
        category={ReportTarget.COMMENT}
      >
        <button ref={reportTriggerRef}></button>
      </CreateReportModal>
    </div>
  );
};
export default CommentItem;
