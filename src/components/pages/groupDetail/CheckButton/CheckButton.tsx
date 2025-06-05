'use client';

import CheckIcon from '@/components/icons/CheckIcon';
import { cn } from '@/lib/utils';

interface CheckButtonProps {
  isReactioned: boolean;
  reactionCount: number;
  onClick: () => void;
  className?: string;
}

const CheckButton = ({
  isReactioned,
  reactionCount,
  onClick,
  className,
}: CheckButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      'flex w-1/2 items-center justify-center gap-1 px-6 pt-3.5 pb-2.5',
      className
    )}
    aria-label={isReactioned ? '게시글 확인 취소 버튼' : '게시글 확인 버튼'}
  >
    {/* TODO: 디자인 시스템 확정 시 색상 토큰으로 대체 예정 */}
    <CheckIcon
      type={isReactioned ? 'filled' : 'stroke'}
      className={cn(
        'h-5 w-5',
        isReactioned ? 'text-[#ED3639]' : 'text-gray-500'
      )}
    />
    <span>확인 {reactionCount}</span>
  </button>
);

export default CheckButton;
