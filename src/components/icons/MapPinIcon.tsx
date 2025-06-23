import React from 'react';

interface IconProps {
  className?: string;
}

const MapPinIcon = ({ className }: IconProps) => (
  <svg
    className={className}
    xmlns='http://www.w3.org/2000/svg'
    width='17'
    height='17'
    viewBox='0 0 17 17'
    fill='none'
  >
    <path
      d='M8.60048 1.8335C5.65981 1.8335 3.26714 4.22616 3.26714 7.1635C3.24781 11.4602 8.39781 15.0228 8.60048 15.1668C8.60048 15.1668 13.9531 11.4602 13.9338 7.16683C13.9338 4.22616 11.5411 1.8335 8.60048 1.8335ZM8.60048 9.8335C7.12714 9.8335 5.93381 8.64016 5.93381 7.16683C5.93381 5.6935 7.12714 4.50016 8.60048 4.50016C10.0738 4.50016 11.2671 5.6935 11.2671 7.16683C11.2671 8.64016 10.0738 9.8335 8.60048 9.8335Z'
      fill='currentColor'
    />
  </svg>
);

export default MapPinIcon;
