import axios from 'axios';
import { EventSourcePolyfill } from 'event-source-polyfill';
import { createStore } from 'zustand/vanilla';
import { getAccessToken } from '@/lib/apiFetcher';
import { callLogout, callTokenUpdater } from '@/providers/AuthStoreProvider';
import { TokenRefreshResponse } from '@/types/auth';
import { SseNotificationResponse } from '@/types/notification';
export type SseState = {
  message: string | null;
  notification: SseNotificationResponse | null;
};

export type SseActions = {
  connect: () => void;
  disconnect: () => void;
};

export type SseStore = SseState & SseActions;

export const initSseStore = (): SseState => ({
  message: null,
  notification: null,
});

export const defaultInitState: SseState = {
  message: null,
  notification: null,
};

let lastEventId: string | null = null;

const createEventSource = (token: string) =>
  new EventSourcePolyfill(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/notifications/subscribe`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Last-Event-ID': lastEventId || '',
      },
      heartbeatTimeout: 120000,
    }
  );

export const createSseStore = (initState: SseState = defaultInitState) =>
  createStore<SseStore>()((set) => {
    let es: EventSource | null = null;

    return {
      ...initState,
      connect: () => {
        const token = getAccessToken();
        if (es || !token) return;
        es = createEventSource(token);

        es.onmessage = (e) => {
          lastEventId = e.lastEventId;
          set({ message: e.data });
        };

        es.onerror = async (e) => {
          if ('status' in e && e.status === 401) {
            try {
              const res = await axios.post<TokenRefreshResponse>(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/token`,
                {},
                { withCredentials: true }
              );
              const newAccessToken = res.data.data?.accessToken;
              if (newAccessToken) {
                callTokenUpdater(newAccessToken);
                await createEventSource(newAccessToken);
              }
            } catch (refreshErr) {
              callLogout();

              const REDIRECT_URI = `${process.env.NEXT_PUBLIC_BASE_URL}/login/kakao`;
              const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
              window.open(kakaoAuthUrl, '_self');

              return Promise.reject(refreshErr);
            }
          }
        };

        es.addEventListener('connect', (e) => {
          set({ message: e.data });
        });

        es.addEventListener('notification', (e) => {
          try {
            lastEventId = e.lastEventId;
            const data = JSON.parse(e.data) as SseNotificationResponse;
            set({ notification: data });
          } catch {
            set({
              notification: {
                message: '오류가 발생하였습니다.',
                createdAt: '',
              },
            });
          }
        });
      },

      disconnect: () => {
        if (!es) return;
        es.close();
        es = null;
        set({ message: null, notification: null });
      },
    };
  });
