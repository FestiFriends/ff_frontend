'use client';

import { type ReactNode, createContext, useRef, useContext } from 'react';
import { useStore } from 'zustand';
import { AuthStore, createAuthStore, initAuthStore } from '@/stores/authStore';

let updateAccessToken: ((token: string) => void) | null = null;

const setTokenUpdater = (fn: (token: string) => void) => {
  updateAccessToken = fn;
};

export const callTokenUpdater = (token: string) => {
  if (updateAccessToken) {
    updateAccessToken(token);
  }
};

let logout: (() => void) | null = null;

const setLogout = (fn: () => void) => {
  logout = fn;
};

export const callLogout = () => {
  if (logout) {
    logout();
  }
};

export type AuthStoreApi = ReturnType<typeof createAuthStore>;

export const AuthStoreContext = createContext<AuthStoreApi | null>(null);

export interface AuthStoreProviderProps {
  children: ReactNode;
}

export const AuthStoreProvider = ({ children }: AuthStoreProviderProps) => {
  const storeRef = useRef<AuthStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createAuthStore(initAuthStore());
  }

  setTokenUpdater(storeRef.current.getState().login);
  setLogout(storeRef.current.getState().logout);

  return (
    <AuthStoreContext.Provider value={storeRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
};

export const useAuthStore = <T,>(selector: (store: AuthStore) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);

  if (!authStoreContext) {
    throw new Error(
      `useAuthStore는 AuthStoreProvider 내부에서만 사용할 수 있습니다!`
    );
  }

  return useStore(authStoreContext, selector);
};
