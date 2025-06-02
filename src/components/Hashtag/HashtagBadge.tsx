'use client';
import { cn } from '@/lib/utils';

interface HashtagBadgeProps {
  text: string; // 배지 내부에 들어갈 텍스트('#'여부는 페이지 내부에서 설정)
  type: 'groupInfo' | 'groupCard' | 'userProfile';
  isClickable?: boolean; // 클릭 가능한 배지인지 확인
  onClick?: () => void; // 배지 클릭 시 실행되는 함수
  className?: string;
}

const badgeStyles: Record<HashtagBadgeProps['type'], string> = {
  groupInfo:
    'cursor-pointer rounded-full bg-yellow-200 px-4 py-2 font-semibold text-gray-800 select-none',
  groupCard:
    'max-w-40 overflow-hidden text-ellipsis whitespace-nowrap cursor-pointer rounded-lg bg-blue-100 px-4 py-2 font-medium text-blue-600 select-none',
  userProfile:
    'cursor-pointer rounded-lg bg-purple-100 px-4 py-2 font-semibold text-purple-600 select-none',
};

const HashtagBadge = ({
  text,
  type,
  isClickable = false,
  onClick,
  className,
}: HashtagBadgeProps) => {
  const getBadgeStyle = () => badgeStyles[type];

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick();
    }
  };

  const badgeClasses = cn(getBadgeStyle(), className);

  return (
    <button
      className={badgeClasses}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default HashtagBadge;
