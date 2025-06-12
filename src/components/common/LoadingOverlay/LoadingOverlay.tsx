import React from 'react';
import { Spinner } from '@/components/common';

const LoadingOverlay = () => (
  <div className='absolute inset-0 z-10 flex items-center justify-center bg-white/70 backdrop-blur-sm'>
    <Spinner />
  </div>
);

export default LoadingOverlay;
