import React from 'react';

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
  >
    <path
      d='M13.6408 7.68698C13.9681 7.42002 14.4506 7.43885 14.7557 7.74395C15.0608 8.04904 15.0796 8.53154 14.8126 8.85885L14.7557 8.92233L11.1782 12.4998C10.5273 13.1506 9.47228 13.1506 8.82142 12.4998L5.24395 8.92233L5.18698 8.85885C4.92002 8.53154 4.93885 8.04904 5.24395 7.74395C5.54904 7.43885 6.03154 7.42002 6.35885 7.68698L6.42233 7.74395L9.9998 11.3214L13.5773 7.74395L13.6408 7.68698Z'
      fill='currentColor'
    />
  </svg>
);

export default ChevronDownIcon;
