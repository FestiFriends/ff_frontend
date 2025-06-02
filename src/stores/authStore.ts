import { persist } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';

export type AuthState = {
  isLoggedin: boolean;
  accessToken: string | null;
};

export type AuthActions = {
  login: (token: string) => void;
  logout: () => void;
};

export type AuthStore = AuthState & AuthActions;

export const initAuthStore = (): AuthState => ({
  isLoggedin: false,
  accessToken: null,
});

export const defaultInitState: AuthState = {
  isLoggedin: false,
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
            isLoggedin: true,
          }),
        logout: () => {
          set({
            accessToken: null,
            isLoggedin: false,
          });
          localStorage.removeItem('authInfo');
        },
      }),
      {
        name: 'authInfo',
      }
    )
  );
