import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import { instance } from '@/lib/apiFetcher';

export type AuthState = {
  isLoggedIn: boolean;
  accessToken: string | null;
};

export type AuthActions = {
  login: (token: string) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => ({
  isLoggedIn: false,
  accessToken: null,
});

export const defaultInitState: AuthState = {
  isLoggedIn: false,
  accessToken: null,
};

export const createAuthStore = (initState: AuthState = defaultInitState) =>
  createStore<AuthStore>()(
    persist(
      (set) => ({
        ...initState,
        login: (token: string) =>
          set({
            accessToken: token,
            isLoggedIn: true,
          }),
        logout: () => {
          set({
            accessToken: null,
            isLoggedIn: false,
          });
          localStorage.removeItem('authInfo');
          delete instance.defaults.headers.common['Authorization'];
        },
      }),
      {
        name: 'authInfo',
      }
    )
  );
