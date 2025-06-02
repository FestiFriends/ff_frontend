'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useKakaoLogin } from '@/hooks/useAuth/useAuth';

const KakaoCallback = () => {
  const searchParams = useSearchParams();
  const hasCalled = useRef(false);
  const code = searchParams.get('code');
  const state = searchParams.get('state') ?? '/';
  const { mutate } = useKakaoLogin(state);

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    if (code) {
      mutate(code);
    }
  }, [code, mutate]);

  return null;
};

export default KakaoCallback;
