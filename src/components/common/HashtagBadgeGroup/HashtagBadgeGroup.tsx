'use client';

import { useEffect, useRef, useState } from 'react';
import HashtagBadge from '../HashtagBadge/HashtagBadge';

interface HashtagGroupProps {
  hashtags: string[];
  isClickable?: boolean;
  onClick?: (tag: string) => void;
  className?: string;
}

const HashtagBadgeGroup = ({
  hashtags,
  isClickable = false,
  onClick,
  className,
}: HashtagGroupProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState<number | null>(null);

  // 측정용 렌더링 완료 후 한 줄에 보여줄 갯수 계산
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const children = Array.from(container.children) as HTMLDivElement[];

    if (children.length === 0) {
      setVisibleCount(hashtags.length);
      return;
    }

    const firstTop = children[0].offsetTop;

    for (let i = 0; i < children.length; i++) {
      if (children[i].offsetTop > firstTop) {
        setVisibleCount(i);
        return;
      }
    }

    setVisibleCount(hashtags.length);
  }, [hashtags]);

  // 아직 측정 전이면 전체 렌더링해서 측정
  if (visibleCount === null) {
    return (
      <div
        ref={containerRef}
        className='invisible flex h-0 flex-wrap items-start justify-start gap-1 overflow-hidden'
      >
        {hashtags.map((tag) => (
          <HashtagBadge
            key={tag}
            text={tag}
            isClickable={isClickable}
            onClick={() => onClick?.(tag)}
            className={className}
          />
        ))}
      </div>
    );
  }

  const visible = hashtags.slice(0, visibleCount);
  const hiddenCount = hashtags.length - visibleCount;

  return (
    <div className='flex flex-wrap items-start justify-start gap-1'>
      {visible.map((tag) => (
        <HashtagBadge
          key={tag}
          text={tag}
          isClickable={isClickable}
          onClick={() => onClick?.(tag)}
          className={className}
        />
      ))}
      {hiddenCount > 0 && (
        <HashtagBadge
          text={`+${hiddenCount}개`}
          className={className}
        />
      )}
    </div>
  );
};

export default HashtagBadgeGroup;
