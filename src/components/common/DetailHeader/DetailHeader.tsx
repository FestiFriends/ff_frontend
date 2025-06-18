import React from 'react';
import { useRouter } from 'next/navigation';
import XIcon from '@/components/icons/XIcon';

interface DetailHeaderProps {
  hasLeftIcon?: React.ReactNode;
  hasLeftText?: string;
  hasRightIcon?: React.ReactNode;
  hasRightText?: string;
  title?: string;
  onLeftClick?: () => void;
  onRightClick?: () => void;
  rightDisabled?: boolean;
}

const DetailHeader = ({
  hasLeftIcon = <XIcon />,
  hasLeftText,
  hasRightIcon,
  hasRightText,
  title,
  onLeftClick,
  onRightClick,
  rightDisabled,
}: DetailHeaderProps) => {
  const router = useRouter();

  const handleLeftClick = onLeftClick || (() => router.back());

  return (
    <header className='fixed top-0 left-0 z-50 flex h-11 w-full items-center justify-between border-b border-gray-50 bg-white p-4 text-black'>
      <div className='flex w-1/3 items-center justify-start gap-0.5'>
        {hasLeftIcon && (
          <button
            onClick={handleLeftClick}
            className='flex items-center'
          >
            {hasLeftIcon}
          </button>
        )}
        {hasLeftText && <span className='text-14_B'>{hasLeftText}</span>}
      </div>
      <h1 className='w-1/3 text-center text-16_B'>{title}</h1>
      <div className='flex w-1/3 items-center justify-end gap-0.5'>
        {hasRightIcon && (
          <button
            onClick={onRightClick}
            className='flex items-center'
            disabled={rightDisabled}
          >
            {hasRightIcon}
          </button>
        )}
        {hasRightText && (
          <button
            onClick={onRightClick}
            className='text-14_B'
            disabled={rightDisabled}
          >
            {hasRightText}
          </button>
        )}
      </div>
    </header>
  );
};

export default DetailHeader;
