'use client';
import React, { useState } from 'react';
import { useQueryParam } from '@/hooks';
import { cn } from '@/lib/utils';

const IsExpiredButton = () => {
  const { getQueryParam, setQueryParam } = useQueryParam();
  const [isExpired, setIsExpired] = useState(() => getQueryParam('isExpired'));

  const handleClick = () => {
    if (isExpired === 'false') {
      setIsExpired('true');
      setQueryParam('isExpired', 'true');
    } else if (isExpired === 'true') {
      setIsExpired('false');
      setQueryParam('isExpired', 'false');
    }
  };
  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5 whitespace-nowrap transition-all select-none',
        isExpired === 'true' && 'bg-gray-950 text-white'
      )}
    >
      <span className={'text-14_M'}>지난 공연 보기</span>
    </button>
  );
};

export default IsExpiredButton;
