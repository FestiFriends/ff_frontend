'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Notification, SearchInput } from '@/components/common';
import { ArrowLeft, SearchIcon } from '@/components/icons';
import LogoIcon from '@/components/icons/LogoIcon';
import { useIsMobile } from '@/hooks';
import { useLogin } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/providers/AuthStoreProvider';

interface HeaderProps {
  title?: string;
  hasNotification?: boolean;
  hasSearch?: boolean;
}

const Header = ({
  title,
  hasNotification = true,
  hasSearch = true,
}: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);
  const [iconCenterX, setIconCenterX] = useState<number>(0);
  const { onLogin } = useLogin();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const searchRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isSearchOpen && iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setIconCenterX(rect.left + rect.width / 2);
    }
  }, [isSearchOpen]);

  const handleSubmit = () => {
    router.push(`/performances?title=${searchRef.current?.value}`);
  };

  if (!isMobile) return null;

  return (
    <>
      <header className='fixed top-0 left-0 z-50 flex h-11 w-full items-center justify-between bg-white px-5 py-3'>
        {!isSearchOpen && (
          <>
            <div
              className={cn(
                'flex w-[68px] items-center',
                !isLoggedIn && 'w-[81px]'
              )}
            >
              <LogoIcon className='aspect-square h-7.5 w-7.5 shrink-0 cursor-pointer' />
            </div>
            <h1 className='text-16_B text-black'>{title}</h1>
            <div
              className={cn(
                'flex w-[68px] items-center justify-end gap-5',
                !isLoggedIn && 'w-[81px] gap-[14px]'
              )}
            >
              {hasSearch && (
                <button
                  ref={iconRef}
                  onClick={() => setIsSearchOpen(true)}
                  className='cursor-pointer'
                >
                  <SearchIcon />
                </button>
              )}
              {isLoggedIn && hasNotification && <Notification />}
              {!isLoggedIn && (
                <button
                  onClick={onLogin}
                  className='flex h-[22px] w-[43px] cursor-pointer items-center justify-center rounded-[8px] bg-[#FFCCCF] px-1.5 py-1'
                >
                  <span className='flex h-[14px] items-center justify-center text-12_M whitespace-nowrap text-gray-950'>
                    로그인
                  </span>
                </button>
              )}
            </div>
          </>
        )}

        <AnimatePresence>
          {isSearchOpen && hasSearch && (
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              exit={{ scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                left: iconCenterX,
                transform: 'translateX(-100%)',
                transformOrigin: 'right',
              }}
              className='absolute top-0 z-10 flex h-full w-full items-center gap-3 bg-white px-5'
            >
              <button
                onClick={() => setIsSearchOpen(false)}
                className='cursor-pointer'
              >
                <ArrowLeft size={20} />
              </button>

              <SearchInput
                type='text'
                ref={searchRef}
                placeholder='검색어를 입력하세요'
                className='w-full grow bg-transparent text-16_M outline-none'
                onSubmit={handleSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <div className='h-11' />
    </>
  );
};

export default Header;
