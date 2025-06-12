import React from 'react';

interface LoadingOverlayProps {
  style?: React.CSSProperties;
}

const LoadingOverlay = ({ style }: LoadingOverlayProps) => (
  <div
    className='absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm'
    style={style}
  >
    <div className='h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500' />
  </div>
);

export default LoadingOverlay;
