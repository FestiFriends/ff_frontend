import { createAuthStore, initAuthStore, defaultInitState } from './authStore';

// localStorage 모킹
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};

  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Auth Store 테스트', () => {
  let store: ReturnType<typeof createAuthStore>;

  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();

    store = createAuthStore();
  });

  afterEach(() => {
    store.getState().logout();
  });

  describe('초기 상태', () => {
    it('initAuthStore는 올바른 초기 상태를 반환해야 한다', () => {
      const initialState = initAuthStore();

      expect(initialState).toEqual({
        isLoggedIn: false,
        accessToken: null,
      });
    });

    it('defaultInitState는 올바른 기본값을 가져야 한다', () => {
      expect(defaultInitState).toEqual({
        isLoggedIn: false,
        accessToken: null,
      });
    });

    it('store는 기본 초기 상태로 생성되어야 한다', () => {
      const state = store.getState();

      expect(state.isLoggedIn).toBe(false);
      expect(state.accessToken).toBe(null);
      expect(typeof state.login).toBe('function');
      expect(typeof state.logout).toBe('function');
    });
  });

  describe('커스텀 초기 상태', () => {
    it('커스텀 초기 상태로 store를 생성할 수 있어야 한다', () => {
      const customInitState = {
        isLoggedIn: true,
        accessToken: 'custom-token',
      };

      const customStore = createAuthStore(customInitState);
      const state = customStore.getState();

      expect(state.isLoggedIn).toBe(true);
      expect(state.accessToken).toBe('custom-token');
    });
  });

  describe('login 액션', () => {
    it('login을 호출하면 상태가 올바르게 업데이트되어야 한다', () => {
      const testToken = 'test-access-token';

      store.getState().login(testToken);

      const state = store.getState();
      expect(state.isLoggedIn).toBe(true);
      expect(state.accessToken).toBe(testToken);
    });

    it('login 시 localStorage에 상태가 저장되어야 한다', async () => {
      const testToken = 'test-access-token';

      store.getState().login(testToken);

      // persist 미들웨어가 localStorage에 저장하는 것을 기다림
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'authInfo',
        expect.stringContaining(testToken)
      );
    });

    it('빈 문자열 토큰으로도 login할 수 있어야 한다', () => {
      store.getState().login('');

      const state = store.getState();
      expect(state.isLoggedIn).toBe(true);
      expect(state.accessToken).toBe('');
    });
  });

  describe('logout 액션', () => {
    beforeEach(() => {
      // 로그인 상태로 설정
      store.getState().login('test-token');
    });

    it('logout을 호출하면 상태가 초기화되어야 한다', () => {
      store.getState().logout();

      const state = store.getState();
      expect(state.isLoggedIn).toBe(false);
      expect(state.accessToken).toBe(null);
    });

    it('logout 시 localStorage에서 authInfo가 제거되어야 한다', () => {
      store.getState().logout();

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authInfo');
    });

    it('이미 로그아웃 상태에서 logout을 호출해도 문제없어야 한다', () => {
      store.getState().logout();

      // 한 번 더 logout 호출
      store.getState().logout();

      const state = store.getState();
      expect(state.isLoggedIn).toBe(false);
      expect(state.accessToken).toBe(null);
    });
  });

  describe('상태 변화 구독', () => {
    it('상태 변화를 구독할 수 있어야 한다', () => {
      const mockSubscriber = jest.fn();

      const unsubscribe = store.subscribe(mockSubscriber);

      // 상태 변경
      store.getState().login('test-token');

      expect(mockSubscriber).toHaveBeenCalled();

      unsubscribe();
    });

    it('구독 해제 후에는 콜백이 호출되지 않아야 한다', () => {
      const mockSubscriber = jest.fn();

      const unsubscribe = store.subscribe(mockSubscriber);
      unsubscribe();

      // 상태 변경
      store.getState().login('test-token');

      expect(mockSubscriber).not.toHaveBeenCalled();
    });
  });

  describe('persist 기능', () => {
    it('localStorage에서 상태를 복원할 수 있어야 한다', async () => {
      const savedState = {
        state: {
          isLoggedIn: true,
          accessToken: 'saved-token',
        },
        version: 0,
      };

      localStorageMock.setItem('authInfo', JSON.stringify(savedState));

      const restoredStore = createAuthStore();

      await new Promise((resolve) => setTimeout(resolve, 100));

      const state = restoredStore.getState();
      expect(state.isLoggedIn).toBe(true);
      expect(state.accessToken).toBe('saved-token');
    });

    it('잘못된 localStorage 데이터가 있어도 기본값으로 초기화되어야 한다', () => {
      // 잘못된 JSON 데이터 설정
      localStorageMock.setItem('authInfo', 'invalid-json');

      const newStore = createAuthStore();
      const state = newStore.getState();

      expect(state.isLoggedIn).toBe(false);
      expect(state.accessToken).toBe(null);
    });
  });

  describe('통합 테스트', () => {
    it('로그인 → 로그아웃 플로우가 올바르게 동작해야 한다', async () => {
      const testToken = 'integration-test-token';

      let state = store.getState();
      expect(state.isLoggedIn).toBe(false);
      expect(state.accessToken).toBe(null);

      store.getState().login(testToken);
      state = store.getState();
      expect(state.isLoggedIn).toBe(true);
      expect(state.accessToken).toBe(testToken);

      // localStorage 저장 확인
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(localStorageMock.setItem).toHaveBeenCalled();

      // 로그아웃
      store.getState().logout();
      state = store.getState();
      expect(state.isLoggedIn).toBe(false);
      expect(state.accessToken).toBe(null);

      expect(localStorageMock.removeItem).toHaveBeenCalledWith('authInfo');
    });

    it('여러 번의 로그인이 올바르게 동작해야 한다', () => {
      const tokens = ['token1', 'token2', 'token3'];

      tokens.forEach((token) => {
        store.getState().login(token);

        const state = store.getState();
        expect(state.isLoggedIn).toBe(true);
        expect(state.accessToken).toBe(token);
      });
    });
  });

  describe('타입 안전성', () => {
    it('store의 타입이 올바르게 정의되어야 한다', () => {
      const state = store.getState();

      expect(typeof state.isLoggedIn).toBe('boolean');
      expect(
        typeof state.accessToken === 'string' || state.accessToken === null
      ).toBe(true);
      expect(typeof state.login).toBe('function');
      expect(typeof state.logout).toBe('function');
    });
  });
});
