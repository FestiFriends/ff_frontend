import React from 'react';
import { useParams } from 'next/navigation';
import { useGetComments } from '@/hooks/postHooks/postHook';
import { cn } from '@/lib/utils';
import CommentItem from '../CommentItem/CommentItem';

const CommentList = ({
  setMessage,
  setEditCommentId,
  setOriginalMessage,
}: {
  setMessage: (message: string) => void;
  setEditCommentId: (id: string) => void;
  setOriginalMessage: (message: string) => void;
}) => {
  const params = useParams();
  const groupId = params?.groupId as string;
  const postId = params?.postId as string;
  const { data: comments } = useGetComments({ groupId, postId });

  return (
    <div className='flex w-full flex-col justify-between pb-0.5'>
      {comments?.data?.flatMap((comment, index) => [
        <CommentItem
          key={comment.id}
          comment={comment}
          setMessage={setMessage}
          setEditCommentId={setEditCommentId}
          setOriginalMessage={setOriginalMessage}
          className={cn(
            index === 0 && 'pt-0',
            index === (comments.data?.length ?? 0) - 1 && 'pb-0'
          )}
        />,
        index !== (comments.data?.length ?? 0) - 1 && (
          <hr
            key={`divider-${comment.id}`}
            className='border-gray-100'
          />
        ),
      ])}
    </div>
  );
};

export default CommentList;
