'use client';
import React, { useEffect, useState, useRef } from 'react';
import BackIcon from '@/components/icons/BackIcon';
import Button from '../Button/Button';

interface FabButtonProps {
  onClick: () => void;
  icon?: React.ReactNode;
  actionLabel?: string;
  onlyTop?: boolean;
}
const FabButton: React.FC<FabButtonProps> = ({
  onClick,
  icon,
  actionLabel,
  onlyTop = false,
}) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  useEffect(() => {
    const scrollContainer = document.querySelector(
      'div[class*="overflow-auto"]'
    );
    if (!scrollContainer) return;

    const handleScroll = (): void => {
      setIsScrolled(scrollContainer.scrollTop > 10);
      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleScrollToTop = (): void => {
    const scrollContainer = document.querySelector(
      'div[class*="overflow-auto"]'
    );
    if (!scrollContainer) return;

    scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='fixed right-[13px] bottom-24 z-40'>
      {isScrolled && (
        <div className='mb-1.5 flex flex-col items-end space-y-2'>
          <Button
            className='flex h-11 w-14 gap-1 rounded-full text-16_B text-white'
            onClick={handleScrollToTop}
          >
            <BackIcon className='h-6 w-6 rotate-90 text-white' />
          </Button>
        </div>
      )}
      {!onlyTop && actionLabel && (
        <Button
          onClick={onClick}
          className='group flex items-center gap-1 rounded-full px-4 py-2.5 text-16_B text-white'
        >
          {icon}{' '}
          {(!isScrolled || !isScrolling) && (
            <span className='ml-1 transition-opacity duration-200'>
              {actionLabel}
            </span>
          )}
        </Button>
      )}
    </div>
  );
};

export default FabButton;
