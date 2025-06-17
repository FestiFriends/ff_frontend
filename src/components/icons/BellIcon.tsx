import React from 'react';
import { cn } from '@/lib/utils';

interface BellIconProps {
  isActive?: boolean;
  className?: string;
  onClick?: () => void;
}

const BellIcon = ({ isActive = false, className, onClick }: BellIconProps) => (
  <svg
    onClick={onClick}
    className={cn('text-gray-950', className)}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M13.5039 4.12641C13.5039 4.98697 12.8063 5.68459 11.9457 5.68459C11.0851 5.68459 10.3875 4.98697 10.3875 4.12641C10.3875 3.26586 11.0851 2.56824 11.9457 2.56824C12.8063 2.56824 13.5039 3.26586 13.5039 4.12641Z'
      fill='currentColor'
    />
    <path
      d='M11.9473 4.12638C15.0695 4.12664 17.6133 6.5983 17.7304 9.69186C17.7305 9.69346 17.7318 9.69474 17.7334 9.69474C17.7351 9.69474 17.7364 9.69608 17.7364 9.69773V13.0739C17.7364 13.6933 18.4544 14.1878 18.8018 14.7006L19.8136 16.1947C20.2628 16.8587 19.787 17.755 18.9854 17.7553H5.01472C4.21284 17.7553 3.73712 16.8588 4.1866 16.1947L5.19734 14.7006C5.5271 14.2138 6.15925 13.7476 6.15925 13.1596V9.69773C6.15925 9.69608 6.16059 9.69474 6.16224 9.69474C6.16384 9.69474 6.16516 9.69346 6.16522 9.69186C6.28234 6.5983 8.82518 4.1266 11.9473 4.12638Z'
      fill='currentColor'
    />
    <path
      d='M14.3514 19.0196C14.3512 20.3516 13.2714 21.4317 11.9393 21.4317C10.6904 21.4316 9.66327 20.482 9.53987 19.2657L9.52717 19.0196H14.3514Z'
      fill='currentColor'
    />
    {isActive && (
      <>
        <rect
          x='15'
          y='4.54285'
          width='6'
          height='6'
          rx='3'
          fill='#FF2727'
        />
        <rect
          x='15'
          y='4.54285'
          width='6'
          height='6'
          rx='3'
          stroke='white'
        />
      </>
    )}
  </svg>
);

export default BellIcon;
