'use client';

import { useEffect, useRef, useState } from 'react';

const ProfileHeaderTagList = ({ tags }: { tags: string[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(tags.length);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (!containerRef.current || isExpanded) return;

    requestAnimationFrame(() => {
      const container = containerRef.current!;
      const children = Array.from(container.children) as HTMLElement[];

      if (children.length === 0) return;

      const baseTop = children[0].getBoundingClientRect().top;
      let count = 0;

      for (let i = 0; i < children.length; i++) {
        const tagTop = children[i].getBoundingClientRect().top;
        if (tagTop > baseTop) break;
        count++;
      }

      setVisibleCount(count - 1);
    });
  }, [tags, isExpanded]);

  const visibleTags = isExpanded ? tags : tags.slice(0, visibleCount);
  const hiddenCount = tags.length - visibleTags.length;

  return (
    <div
      className='mt-[14px] flex w-full max-w-xl flex-wrap gap-[6px]'
      ref={containerRef}
    >
      {visibleTags.map((tag, i) => (
        <span
          key={i}
          className='rounded-full bg-gray-25 px-[10px] py-[9px] text-12_M text-gray-700'
        >
          {tag}
        </span>
      ))}

      {!isExpanded && hiddenCount > 0 && (
        <button
          onClick={() => setIsExpanded(true)}
          className='rounded-full border border-gray-200 px-[10px] py-[9px] text-12_M text-gray-500 hover:bg-gray-50'
        >
          +{hiddenCount}
        </button>
      )}

      {isExpanded && tags.length > visibleCount && (
        <button
          onClick={() => setIsExpanded(false)}
          className='text-12_M text-gray-400 hover:underline'
        >
          태그 접기
        </button>
      )}
    </div>
  );
};

export default ProfileHeaderTagList;
