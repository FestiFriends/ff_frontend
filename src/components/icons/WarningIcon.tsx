import React from 'react';

const WarningIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='25'
    height='25'
    viewBox='0 0 25 25'
    fill='none'
  >
    <path
      d='M20.5 2.5H4.5C3.397 2.5 2.5 3.397 2.5 4.5V22.5L6.5 18.5H20.5C21.603 18.5 22.5 17.603 22.5 16.5V4.5C22.5 3.397 21.603 2.5 20.5 2.5ZM13.5 15.5H11.5V13.5H13.5V15.5ZM13.5 11.5H11.5V5.5H13.5V11.5Z'
      fill='currentColor'
    />
  </svg>
);

export default WarningIcon;
