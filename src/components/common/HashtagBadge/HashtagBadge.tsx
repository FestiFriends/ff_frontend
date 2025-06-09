'use client';

interface HashtagBadgeProps {
  text: string;
  isClickable?: boolean;
  onClick?: (text: string, e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const HashtagBadge = ({
  text,
  isClickable = false,
  onClick,
  className = 'bg-white',
}: HashtagBadgeProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isClickable) return;
    e.stopPropagation();
    onClick?.(text, e);
  };

  const badgeClasses = `rounded-full px-2.5 py-2 text-12_M text-gray-700 ${className ?? ''}`;

  return isClickable ? (
    <button
      className={badgeClasses}
      onClick={handleClick}
    >
      {text}
    </button>
  ) : (
    <span className={badgeClasses}>{text}</span>
  );
};

export default HashtagBadge;
