'use client';

import CheckIcon from '@/components/icons/CheckIcon';
import { cn } from '@/lib/utils';
import { Post } from '@/types/post';

interface CheckButtonProps {
  post: Post;
  onClick?: (post: Post) => void;
  className?: string;
}

const CheckButton = ({ post, onClick, className }: CheckButtonProps) => (
  <button
    onClick={() => onClick?.(post)}
    className={cn(
      'flex w-1/2 items-center justify-center gap-1 px-6 py-3.5',
      className
    )}
    aria-label={post.isPinned ? '게시글 반응 취소' : '게시글 반응'}
  >
    <CheckIcon
      type={post.isReactioned ? 'filled' : 'stroke'}
      className={cn(
        'h-5 w-5',
        post.isReactioned ? 'text-primary-red' : 'text-gray-500'
      )}
    />
    <span className='text-14_M text-gray-500'>확인 {post.reactionCount}</span>
  </button>
);

export default CheckButton;
