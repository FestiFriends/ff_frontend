import { useState } from 'react';

const MAX_VISIBLE_TAGS = 5;

const ProfileHeaderTagList = ({ tags }: { tags: string[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleTags = isExpanded ? tags : tags.slice(0, MAX_VISIBLE_TAGS);
  const hiddenCount = tags.length - MAX_VISIBLE_TAGS;

  return (
    <div className='mt-[14px] flex w-full max-w-xl flex-wrap gap-[6px]'>
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

      {isExpanded && tags.length > MAX_VISIBLE_TAGS && (
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
