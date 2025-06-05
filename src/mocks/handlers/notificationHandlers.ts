import { delay, http, HttpResponse } from 'msw';
import { NotificationData } from '@/types/notification';

const NOTIFICATIONS_SAMPLE_DATA = [
  {
    id: 1000,
    message: '📢 1000번 알림입니다.',
    createdAt: '2025-06-05T12:00:00.000Z',
    isRead: true,
    isDelete: true,
  },
  {
    id: 999,
    message: '📢 999번 알림입니다.',
    createdAt: '2025-06-05T11:59:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 998,
    message: '📢 998번 알림입니다.',
    createdAt: '2025-06-05T11:58:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 997,
    message: '📢 997번 알림입니다.',
    createdAt: '2025-06-05T11:57:00.000Z',
    isRead: false,
    isDelete: false,
  },
  {
    id: 996,
    message: '📢 996번 알림입니다.',
    createdAt: '2025-06-05T11:56:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 995,
    message: '📢 995번 알림입니다.',
    createdAt: '2025-06-05T11:55:00.000Z',
    isRead: false,
    isDelete: true,
  },
  {
    id: 994,
    message: '📢 994번 알림입니다.',
    createdAt: '2025-06-05T11:54:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 993,
    message: '📢 993번 알림입니다.',
    createdAt: '2025-06-05T11:53:00.000Z',
    isRead: false,
    isDelete: false,
  },
  {
    id: 992,
    message: '📢 992번 알림입니다.',
    createdAt: '2025-06-05T11:52:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 991,
    message: '📢 991번 알림입니다.',
    createdAt: '2025-06-05T11:51:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 990,
    message: '📢 990번 알림입니다.',
    createdAt: '2025-06-05T11:50:00.000Z',
    isRead: false,
    isDelete: true,
  },
  {
    id: 989,
    message: '📢 989번 알림입니다.',
    createdAt: '2025-06-05T11:49:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 988,
    message: '📢 988번 알림입니다.',
    createdAt: '2025-06-05T11:48:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 987,
    message: '📢 987번 알림입니다.',
    createdAt: '2025-06-05T11:47:00.000Z',
    isRead: false,
    isDelete: false,
  },
  {
    id: 986,
    message: '📢 986번 알림입니다.',
    createdAt: '2025-06-05T11:46:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 985,
    message: '📢 985번 알림입니다.',
    createdAt: '2025-06-05T11:45:00.000Z',
    isRead: false,
    isDelete: true,
  },
  {
    id: 984,
    message: '📢 984번 알림입니다.',
    createdAt: '2025-06-05T11:44:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 983,
    message: '📢 983번 알림입니다.',
    createdAt: '2025-06-05T11:43:00.000Z',
    isRead: false,
    isDelete: false,
  },
  {
    id: 982,
    message: '📢 982번 알림입니다.',
    createdAt: '2025-06-05T11:42:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 981,
    message: '📢 981번 알림입니다.',
    createdAt: '2025-06-05T11:41:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 980,
    message: '📢 980번 알림입니다.',
    createdAt: '2025-06-05T11:40:00.000Z',
    isRead: false,
    isDelete: true,
  },
  {
    id: 979,
    message: '📢 979번 알림입니다.',
    createdAt: '2025-06-05T11:39:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 978,
    message: '📢 978번 알림입니다.',
    createdAt: '2025-06-05T11:38:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 977,
    message: '📢 977번 알림입니다.',
    createdAt: '2025-06-05T11:37:00.000Z',
    isRead: false,
    isDelete: false,
  },
  {
    id: 976,
    message: '📢 976번 알림입니다.',
    createdAt: '2025-06-05T11:36:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 975,
    message: '📢 975번 알림입니다.',
    createdAt: '2025-06-05T11:35:00.000Z',
    isRead: false,
    isDelete: true,
  },
  {
    id: 974,
    message: '📢 974번 알림입니다.',
    createdAt: '2025-06-05T11:34:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 973,
    message: '📢 973번 알림입니다.',
    createdAt: '2025-06-05T11:33:00.000Z',
    isRead: false,
    isDelete: false,
  },
  {
    id: 972,
    message: '📢 972번 알림입니다.',
    createdAt: '2025-06-05T11:32:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 971,
    message: '📢 971번 알림입니다.',
    createdAt: '2025-06-05T11:31:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 970,
    message: '📢 970번 알림입니다.',
    createdAt: '2025-06-05T11:30:00.000Z',
    isRead: false,
    isDelete: true,
  },
  {
    id: 969,
    message: '📢 969번 알림입니다.',
    createdAt: '2025-06-05T11:29:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 968,
    message: '📢 968번 알림입니다.',
    createdAt: '2025-06-05T11:28:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 967,
    message: '📢 967번 알림입니다.',
    createdAt: '2025-06-05T11:27:00.000Z',
    isRead: false,
    isDelete: false,
  },
  {
    id: 966,
    message: '📢 966번 알림입니다.',
    createdAt: '2025-06-05T11:26:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 965,
    message: '📢 965번 알림입니다.',
    createdAt: '2025-06-05T11:25:00.000Z',
    isRead: false,
    isDelete: true,
  },
  {
    id: 964,
    message: '📢 964번 알림입니다.',
    createdAt: '2025-06-05T11:24:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 963,
    message: '📢 963번 알림입니다.',
    createdAt: '2025-06-05T11:23:00.000Z',
    isRead: false,
    isDelete: false,
  },
  {
    id: 962,
    message: '📢 962번 알림입니다.',
    createdAt: '2025-06-05T11:22:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 961,
    message: '📢 961번 알림입니다.',
    createdAt: '2025-06-05T11:21:00.000Z',
    isRead: true,
    isDelete: false,
  },
];

export const notificationHandlers = [
  http.get(
    'http://localhost:3000/api/v1/notifications',
    async ({ request }) => {
      const url = new URL(request.url);
      const cursorId = Number(url.searchParams.get('cursorId')) || 1000;
      const size = Number(url.searchParams.get('size')) || 20;

      const filtered = NOTIFICATIONS_SAMPLE_DATA.filter((n) => !n.isDelete);

      const startIndex = filtered.findIndex((n) => n.id < cursorId);
      const slice: NotificationData[] = filtered
        .slice(startIndex, startIndex + size)
        .map((item) => ({
          id: item.id.toString(),
          message: item.message,
          createdAt: item.createdAt,
        }));

      const lastItem = slice.at(-1);
      const hasNext = startIndex + size < filtered.length;

      await delay(3000);
      return HttpResponse.json({
        code: 200,
        message: '알림 목록 조회 성공',
        data: slice,
        cursorId: lastItem?.id,
        hasNext,
      });
    }
  ),

  http.get(
    'http://localhost:3000/api/v1/notifications/unread-exists',
    async () => {
      await delay(0);

      const hasUnread = NOTIFICATIONS_SAMPLE_DATA.some(
        (notification) => !notification.isRead && !notification.isDelete
      );

      return HttpResponse.json({
        code: 200,
        message: '알림 상태를 확인했습니다.',
        data: {
          hasUnread,
        },
      });
    }
  ),

  http.patch('http://localhost:3000/api/v1/notifications/read', async () => {
    await delay(2000);

    // return HttpResponse.json(
    //   {
    //     code: 400,
    //     message: '에러.',
    //   },
    //   { status: 400 }
    // );

    NOTIFICATIONS_SAMPLE_DATA.forEach((notification) => {
      if (!notification.isDelete) {
        notification.isRead = true;
      }
    });

    return HttpResponse.json({
      code: 200,
      message: '모든 알림을 읽음 처리했습니다.',
    });
  }),

  http.delete('http://localhost:3000/api/v1/notifications', async () => {
    await delay(2000);

    // return HttpResponse.json(
    //   {
    //     code: 400,
    //     message: '에러.',
    //   },
    //   { status: 400 }
    // );

    NOTIFICATIONS_SAMPLE_DATA.forEach((notification) => {
      if (!notification.isDelete) {
        notification.isDelete = true;
      }
    });

    return HttpResponse.json({
      code: 200,
      message: '모든 알림을 삭제했습니다.',
    });
  }),
];
