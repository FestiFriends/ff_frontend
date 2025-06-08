'use client';

import ChatIcon from '@/components/icons/ChatIcon';
import { cn } from '@/lib/utils';

interface CommentButtonProps {
  commentCount: number;
  onClick: () => void;
  className?: string;
}

const CommentButton = ({
  commentCount,
  onClick,
  className,
}: CommentButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      'flex w-1/2 items-center justify-center gap-1 px-6 pt-3.5 pb-2.5',
      className
    )}
    aria-label='댓글 목록 이동'
  >
    <ChatIcon className='h-5 w-5 text-gray-500' />
    <span>확인 {commentCount}</span>
  </button>
);

export default CommentButton;
