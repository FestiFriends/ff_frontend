'use client';

import { useKakaoLogin } from '@/hooks/useAuth/useAuth';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

export default function KakaoCallback() {
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
  }, []);

  return null;
}
