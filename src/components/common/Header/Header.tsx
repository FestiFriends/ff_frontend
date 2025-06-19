'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import SearchIcon from '@/components/icons/SearchIcon';
import { useLogin } from '@/hooks/useAuth/useAuth';
import { useIsMobile } from '@/hooks';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import Notification from '../Notification/Notification';
import SearchInput from '../SearchInput/SearchInput';

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
            <div className='w-[68px]'></div>
            <h1 className='text-16_B text-black'>{title}</h1>
            <div className='flex w-[68px] items-center justify-end gap-5'>
              {hasSearch && (
                <button
                  ref={iconRef}
                  onClick={() => setIsSearchOpen(true)}
                >
                  <SearchIcon />
                </button>
              )}
              {isLoggedIn && hasNotification && <Notification />}
              {!isLoggedIn && <button onClick={onLogin}>로그인</button>}
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
              <button onClick={() => setIsSearchOpen(false)}>
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
