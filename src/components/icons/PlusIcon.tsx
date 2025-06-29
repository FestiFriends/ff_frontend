import React from 'react';

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M19 11H13V5H11V11H5V13H11V19H13V13H19V11Z'
      fill='currentColor'
    />
  </svg>
);

export default PlusIcon;
