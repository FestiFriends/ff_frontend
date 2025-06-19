'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useModalContext } from '@/components/common/Modal';
import { cn } from '@/lib/utils';

interface Props {
  children: React.ReactNode;
  title?: string;
  height: 'half' | 'full' | 'auto';
  className: string;
  disableBackdropClose: boolean;
  hasHandle: boolean;
  hasClose: boolean;
}

const BottomSheetContent: React.FC<Props> = ({
  children,
  title,
  height,
  className,
  disableBackdropClose,
  hasHandle,
  hasClose,
}) => {
  const { open, closeModal, onClose } = useModalContext();
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const HEIGHT_CLASS = {
    half: 'h-[50vh]',
    full: 'h-[90vh]',
    auto: 'max-h-[80vh]',
  };

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose?.();
      closeModal();
    }, 300);
  };

  const overlayHandler = () => {
    if (disableBackdropClose) return;
    handleClose();
  };

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      timeoutRef.current = setTimeout(() => setIsAnimating(true), 50);
    } else if (!open) {
      setIsAnimating(false);
      timeoutRef.current = setTimeout(() => setShouldRender(false), 300);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [open]);

  if (!shouldRender) return null;

  const Overlay = () => (
    <div
      className={cn(
        'ease fixed inset-0 z-40 bg-black transition-opacity duration-300',
        isAnimating ? 'opacity-50' : 'opacity-0',
        !disableBackdropClose ? 'cursor-pointer' : ''
      )}
      onClick={overlayHandler}
      onKeyDown={overlayHandler}
      role='button'
      tabIndex={0}
    />
  );

  const Handle = () => (
    <div className='flex flex-shrink-0 justify-center rounded-2xl py-3'>
      <div
        className={`h-1 w-12 rounded-full bg-gray-300 transition-colors ${
          disableBackdropClose
            ? 'cursor-default'
            : 'cursor-pointer hover:bg-gray-400'
        }`}
        onClick={handleClose}
        onKeyDown={handleClose}
        role='button'
        tabIndex={0}
      />
    </div>
  );

  const CloseButton = () => (
    <button
      onClick={handleClose}
      className='!static !top-auto !right-auto !h-6 !w-6 text-gray-400 transition-colors hover:text-gray-600'
    >
      <svg
        className='h-6 w-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M6 18L18 6M6 6l12 12'
        />
      </svg>
    </button>
  );

  const Header = () => (
    <div
      className={cn(
        'relative flex flex-shrink-0 items-center',
        title
          ? 'justify-between border-b border-gray-100 px-6 py-4'
          : 'justify-end px-6 py-2'
      )}
    >
      {title && (
        <h2 className='text-lg font-semibold text-gray-900'>{title}</h2>
      )}
      {hasClose && <CloseButton />}
    </div>
  );

  return (
    <>
      <Overlay />
      <div
        className={cn(
          'easy fixed bottom-0 left-1/2 z-50 flex w-full max-w-lg -translate-x-1/2 transform flex-col rounded-t-2xl bg-white shadow-2xl transition-all duration-300',
          isAnimating
            ? '-translate-x-1/2 translate-y-0'
            : '-translate-x-1/2 translate-y-full',
          HEIGHT_CLASS[height],
          className
        )}
      >
        {hasHandle && <Handle />}
        <Header />
        <div className='min-h-0 flex-1 overflow-y-auto'>{children}</div>
      </div>
    </>
  );
};

export default BottomSheetContent;
