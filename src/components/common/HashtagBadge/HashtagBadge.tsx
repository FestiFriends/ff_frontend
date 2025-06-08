'use client';

interface HashtagBadgeProps {
  text: string; // 배지 내부에 들어갈 텍스트('#'여부는 페이지 내부에서 설정)
  isClickable?: boolean; // 클릭 가능한 배지인지 확인
  onClick?: (text: string) => void; // 배지 클릭 시 실행되는 함수
  className?: string;
}

const HashtagBadge = ({
  text,
  isClickable = false,
  onClick,
  className = 'bg-white',
}: HashtagBadgeProps) => {
  const handleClick = () => {
    if (isClickable && onClick) {
      onClick(text);
    }
  };

  const badgeClasses = `rounded-full px-2.5 py-2 text-12_M text-gray-700 ${className ?? ''}`;

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
