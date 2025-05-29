import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  message: string;
  type?: 'default' | 'success' | 'warning' | 'error' | 'info';
  onClose: () => void;
  className?: string;
}

const typeStyles: Record<NonNullable<ToastProps['type']>, string> = {
  default: 'bg-gray-800',
  success: 'bg-green-500',
  warning: 'bg-yellow-400 text-black',
  error: 'bg-red-500',
  info: 'bg-blue-500',
};

const animationClass = (visible: boolean) =>
  visible ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0';

const Toast = ({
  message,
  type = 'default',
  onClose,
  className = 'top-4 left-1/2 -translate-x-1/2',
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
    <>
      <div className='fixed inset-0 z-40 select-none' />
      <div
        aria-live='assertive'
        role='alert'
        className={cn(
          'fixed z-50 rounded px-4 py-2 text-white shadow-md transition-all duration-500 ease-in-out',
          typeStyles[type],
          animationClass(isVisible),
          className
        )}
      >
        {message}
      </div>
    </>
  );
};

export default Toast;
