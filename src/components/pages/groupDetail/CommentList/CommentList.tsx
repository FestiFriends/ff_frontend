import React from 'react';
import { renderErrorNotice } from '@/hooks/useErrorNoticePreset/useErrorNoticePreset';
import { cn } from '@/lib/utils';
import { Comment } from '@/types/comment';
import CommentItem from '../CommentItem/CommentItem';

interface CommentListProps {
  comments: Comment[];
  error?: Error | null;
}

const CommentList = ({ comments, error }: CommentListProps) => {
  if (error) {
    return <div>{renderErrorNotice(error, '100%')}</div>;
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
