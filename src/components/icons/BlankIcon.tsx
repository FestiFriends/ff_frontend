import React from 'react';

const BlankIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width='24'
    height='24'
    viewBox='0 0 24 24'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      d='M14.9725 12.7226C15.3731 12.3612 15.3731 11.6389 14.9725 11.2775L9.93021 6.72802C9.43478 6.28103 8.72749 6.70596 8.72749 7.4506V16.5495C8.72749 17.2941 9.43478 17.7191 9.93021 17.2721L14.9725 12.7226Z'
      fill='#1F1F22'
    />
  </svg>
);

export default BlankIcon;
