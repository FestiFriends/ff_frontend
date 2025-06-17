'use client';

import React, { useRef } from 'react';
import { useParams } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import MoreDropdown from '@/components/common/MoreDropdown/MoreDropdown';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { useDeleteComment } from '@/hooks/postHooks/postHook';
import { cn } from '@/lib/utils';
import { Comment } from '@/types/comment';
import { formatRelativeDate } from '@/utils/date';

interface CommentItemProps {
  comment: Comment;
  className?: string;
  setMessage: (message: string) => void;
  setEditCommentId: (id: string) => void;
  setOriginalMessage: (message: string) => void;
}

const CommentItem = ({
  comment,
  className,
  setMessage,
  setEditCommentId,
  setOriginalMessage,
}: CommentItemProps) => {
  const { author, content, createdAt, isMine } = comment;
  const { profileImage: profileImageUrl, name } = author ?? {};
  const { mutate: deleteComment } = useDeleteComment();
  const params = useParams();
  const groupId = params?.groupId as string;
  const postId = params?.postId as string;
  const triggerRef = useRef<HTMLButtonElement>(null);

  const handleDeleteComment = () => {
    if (isMine) {
      deleteComment({ groupId, postId, commentId: comment.id });
    }
  };

  const handleUpdateComment = () => {
    setEditCommentId(comment.id);
    setMessage(comment.content);
    setOriginalMessage(comment.content);
  };
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
        <MoreDropdown
          items={[
            ...(isMine
              ? [
                  {
                    label: '수정하기',
                    onClick: () => handleUpdateComment(),
                  },
                  {
                    label: '삭제하기',
                    onClick: () => triggerRef.current?.click(),
                  },
                ]
              : [
                  {
                    label: '신고하기',
                    onClick: () => console.log('신고하기 클릭'),
                  },
                ]),
          ]}
        />
      </div>

      <Modal>
        <ModalTrigger>
          <button ref={triggerRef}></button>
        </ModalTrigger>
        <ModalContent className='flex w-[343px] flex-col rounded-2xl bg-white p-5 pt-11'>
          <p className='mb-[30px] flex w-full justify-center text-16_B text-black'>
            댓글을 삭제하시겠습니까?
          </p>
          <div className='flex w-full justify-between gap-2.5'>
            <ModalCancel className='w-1/2'>
              <Button variant='secondary'>아니요</Button>
            </ModalCancel>
            <ModalAction className='w-1/2'>
              <Button
                onClick={() => {
                  handleDeleteComment();
                }}
              >
                네
              </Button>
            </ModalAction>
          </div>
        </ModalContent>
      </Modal>
    </div>
  );
};
export default CommentItem;
