import React from 'react';
import { Spinner } from '@/components/common';

interface LoadingOverlayProps {
  style?: React.CSSProperties;
}

const LoadingOverlay = ({ style }: LoadingOverlayProps) => (
  <div
    className='absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm'
    style={style}
  >
    <Spinner />
  </div>
);

export default LoadingOverlay;
