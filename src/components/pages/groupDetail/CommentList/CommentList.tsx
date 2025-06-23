import React from 'react';
import { cn } from '@/lib/utils';
import { Comment } from '@/types/comment';
import CommentItem from '../CommentItem/CommentItem';

interface CommentListProps {
  comments: Comment[];
  error?: Error | null;
}

const CommentList = ({ comments, error }: CommentListProps) => {
  if (error) {
    return (
      <div className='flex h-full items-center justify-center'>
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className='flex w-full flex-col justify-between pb-0.5'>
      {comments?.map((comment: Comment, index: number) => [
        <CommentItem
          key={comment.id}
          comment={comment}
          className={cn(index === (comments?.length ?? 0) - 1 && 'pb-0')}
        />,
        index < (comments?.length ?? 0) - 1 && (
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
