import { EventSourcePolyfill } from 'event-source-polyfill';
import { createStore } from 'zustand/vanilla';
import { getAccessToken } from '@/lib/apiFetcher';
import { SseNotificationResponse } from '@/types/notification';
import { getNewAccessToken } from '@/utils/getNewAccessToken';
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
            const newToken = await getNewAccessToken();
            await createEventSource(newToken);
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
