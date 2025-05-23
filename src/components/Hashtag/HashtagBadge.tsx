'use client';
import { cn } from '@/lib/utils';

interface HashtagBadgeProps {
  text: string; // 배지 내부에 들어갈 텍스트('#'여부는 페이지 내부에서 설정)
  type: 'groupInfo' | 'groupCard' | 'userProfile';
  isClickable?: boolean; // 클릭 가능한 배지인지 확인
  onClick?: () => void; // 배지 클릭 시 실행되는 함수
  className?: string;
}

// 타입을 명확히 지정한 badgeStyles 객체
const badgeStyles: Record<HashtagBadgeProps['type'], string> = {
  groupInfo:
    'bg-yellow-200 text-gray-800 py-2 px-4 rounded-full font-semibold cursor-pointer',
  groupCard:
    'bg-blue-100 text-blue-600 py-2 px-4 rounded-lg font-medium cursor-pointer',
  userProfile:
    'bg-purple-100 text-purple-600 py-2 px-4 rounded-lg font-semibold cursor-pointer',
};

const HashtagBadge = ({
  text,
  type,
  isClickable = false,
  onClick,
  className,
}: HashtagBadgeProps) => {
  const getBadgeStyle = () => badgeStyles[type]; // 타입별 스타일 반환

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const badgeClasses = cn(getBadgeStyle(), className);

  return (
    <span
      className={badgeClasses}
      onClick={() => {
        if (isClickable) {
          handleClick();
        }
      }}
    >
      {text}
    </span>
  );
};

export default HashtagBadge;
