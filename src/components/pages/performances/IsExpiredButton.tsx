'use client';
import React from 'react';
import { useQueryParam } from '@/hooks';
import { cn } from '@/lib/utils';

const IsExpiredButton = () => {
  const { getQueryParam, setQueryParam } = useQueryParam();
  const queryValue = getQueryParam('isExpired');
  const isExpired = queryValue !== 'false';

  const handleClick = () => {
    const newValue = !isExpired;
    setQueryParam('isExpired', newValue ? 'true' : 'false');
  };
  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-1 rounded-[100px] border-1 border-gray-100 bg-white py-3 pr-4 pl-5 whitespace-nowrap transition-all select-none',
        isExpired && 'bg-gray-950 text-white'
      )}
    >
      <span className={'text-14_M'}>지난 공연 보기</span>
    </button>
  );
};

export default IsExpiredButton;
