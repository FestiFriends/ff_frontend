'use client';

import {
  type ReactNode,
  createContext,
  useRef,
  useContext,
  useEffect,
} from 'react';
import { useStore } from 'zustand';
import { SseStore, createSseStore, initSseStore } from '@/stores/sseStore';
import { useAuthStore } from './AuthStoreProvider';

export type SseStoreApi = ReturnType<typeof createSseStore>;

export const SseStoreContext = createContext<SseStoreApi | null>(null);

export interface SseStoreProviderProps {
  children: ReactNode;
}

export const SseStoreProvider = ({ children }: SseStoreProviderProps) => {
  const storeRef = useRef<SseStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createSseStore(initSseStore());
  }

  const isLoggedIn = useAuthStore((state) => state.isLoggedin);

  useEffect(() => {
    if (isLoggedIn) {
      storeRef.current?.getState().connect();
    } else {
      storeRef.current?.getState().disconnect();
    }
  }, [isLoggedIn]);

  return (
    <SseStoreContext.Provider value={storeRef.current}>
      {children}
    </SseStoreContext.Provider>
  );
};

export const useSseStore = <T,>(selector: (store: SseStore) => T): T => {
  const sseStoreContext = useContext(SseStoreContext);

  if (!sseStoreContext) {
    throw new Error(
      `useSseStore는 SseStoreProvider 내부에서만 사용할 수 있습니다!`
    );
  }

  return useStore(sseStoreContext, selector);
};
