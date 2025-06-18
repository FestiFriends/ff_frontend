'use client';
import React, { useEffect, useState } from 'react';
import BellIcon from '@/components/icons/BellIcon';
import CheckIcon from '@/components/icons/CheckIcon';
import WarningIcon from '@/components/icons/WarningIcon';
import { cn } from '@/lib/utils';
import Portal from '../Portal';

export interface ToastProps {
  message: string;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
  onClose: () => void;
  className?: string;
  blockBackgroundClick?: boolean;
}

const typeStyles: Record<NonNullable<ToastProps['type']>, string> = {
  default: 'bg-white text-gray-950',
  success: 'bg-white text-gray-950',
  warning: 'bg-yellow-400 text-gray-950',
  error: 'bg-white text-gray-950',
  info: 'bg-white text-gray-950',
};

const iconStyles: Record<NonNullable<ToastProps['type']>, React.ReactNode> = {
  default: (
    <CheckIcon
      type='filled'
      className='aspect-square h-6 w-6 text-primary-red'
    />
  ),
  success: (
    <CheckIcon
      type='filled'
      className='aspect-square h-6 w-6 text-primary-red'
    />
  ),
  warning: <WarningIcon className='aspect-square h-6 w-6' />,
  error: <WarningIcon className='aspect-square h-6 w-6 text-primary-red' />,
  info: <BellIcon className='aspect-square h-6 w-6 text-primary-red' />,
};

const animationClass = (visible: boolean) =>
  visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0';

const Toast = ({
  message,
  type = 'default',
  onClose,
  className,
  blockBackgroundClick = false,
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const exitTimer = setTimeout(() => setIsVisible(false), 2500);
    const removeTimer = setTimeout(onClose, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  return (
    <Portal>
      {blockBackgroundClick && (
        <div className='fixed inset-0 z-40 select-none' />
      )}
      <div
        aria-live='assertive'
        aria-label='toast'
        role='alert'
        className={cn(
          'fixed bottom-4 left-1/2 z-50 flex w-full max-w-[343px] -translate-x-1/2 flex-col items-center justify-center gap-2.5 rounded-[18px] px-5 py-5.5 text-gray-950 shadow-[0px_4px_14px_0px_rgba(0,0,0,0.10)] transition-all duration-500 ease-in-out',
          typeStyles[type],
          animationClass(isVisible),
          className
        )}
      >
        {iconStyles[type]}
        <span className='text-16_B leading-normal tracking-[-0.4px]'>
          {message}
        </span>
      </div>
    </Portal>
  );
};

export default Toast;
