import React from 'react';
import { cn } from '@/lib/utils';
interface CheckboxIconProps {
  type: 'normal' | 'active';
  className?: string;
}

const CheckBoxIcon = ({ type, className }: CheckboxIconProps) => {
  if (type === 'active') {
    return (
      <svg
        className={cn('text-gray-600', className)}
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <rect
          x='2'
          y='2'
          width='20'
          height='20'
          rx='2'
          fill='currentColor'
        />
        <path
          d='M9.99909 13.587L7.70009 11.292L6.28809 12.708L10.0011 16.413L16.7071 9.70697L15.2931 8.29297L9.99909 13.587Z'
          fill='#F8F8F8'
        />
      </svg>
    );
  } else {
    return (
      <svg
        className={cn('text-gray-200', className)}
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M20 20V22H4V20H20ZM20 4H4V22L3.7959 21.9893C2.85435 21.8938 2.1062 21.1457 2.01074 20.2041L2 20V4C2 2.96435 2.78722 2.113 3.7959 2.01074L4 2H20L20.2041 2.01074C21.2128 2.113 22 2.96435 22 4V20L21.9893 20.2041C21.8938 21.1457 21.1457 21.8938 20.2041 21.9893L20 22V4Z'
          fill='currentColor'
        />
      </svg>
    );
  }
};

export default CheckBoxIcon;
