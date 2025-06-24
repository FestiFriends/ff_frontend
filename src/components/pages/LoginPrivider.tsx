'use client';

import React, { ReactNode } from 'react';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import LoginModal from './LoginModal';

interface LoginPrividerProps {
  children: ReactNode;
}

const LoginPrivider = ({ children }: LoginPrividerProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <LoginModal />;
  }

  return <>{children}</>;
};

export default LoginPrivider;
