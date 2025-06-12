import { delay, http, HttpResponse } from 'msw';
import { NotificationData, NotificationType } from '@/types/notification';

const NOTIFICATIONS_SAMPLE_DATA = [
  {
    id: 1000,
    message: '모임에 가입 신청이 도착했어요. 수락 또는 거절을 선택해 주세요.',
    type: 'APPLICATION',
    target: null,
    createdAt: '2025-06-05T12:00:00.000Z',
    isRead: true,
    isDelete: true,
  },
  {
    id: 999,
    message: '모임의 가입 신청이 수락되었습니다. 가입을 확정해 주세요!',
    type: 'APPLIED',
    target: null,
    createdAt: '2025-06-05T11:59:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 998,
    message: '모임의 가입 신청이 거절되었습니다.',
    type: 'REJECTED',
    target: null,
    createdAt: '2025-06-05T11:58:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 997,
    message: '모임에서 강퇴되었습니다.',
    type: 'BANNED',
    target: null,
    createdAt: '2025-06-05T11:57:00.000Z',
    isRead: false,
    isDelete: false,
  },
  {
    id: 996,
    message: '모임의 방장으로 임명되었습니다.',
    type: 'GROUP',
    target: { groupId: 'g1' },
    createdAt: '2025-06-05T11:56:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 995,
    message: '철수님이 회원님에 대한 리뷰를 남겼어요.',
    type: 'MY_PROFILE',
    target: null,
    createdAt: '2025-06-05T11:55:00.000Z',
    isRead: false,
    isDelete: true,
  },
  {
    id: 994,
    message:
      '모임의 활동이 종료되었습니다. 함께한 모임원에게 리뷰를 남겨 주세요.',
    type: 'REVIEW',
    target: null,
    createdAt: '2025-06-05T11:54:00.000Z',
    isRead: true,
    isDelete: false,
  },
  {
    id: 993,
    message: '모임에 새로운 글이 올라왔어요. 확인해 보세요!',
    type: 'POST',
    target: { postId: 'p123', groupId: 'g1' },
    createdAt: '2025-06-05T11:53:00.000Z',
    isRead: false,
    isDelete: false,
  },
  {
    id: 992,
    message: '모임에 새로운 일정이 등록되었어요. 확인이 필요해요.',
    type: 'SCHEDULE',
    target: { groupId: 'g1' },
    createdAt: '2025-06-05T11:52:00.000Z',
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
          type: item.type as NotificationType,
          target: item.target,
          createdAt: item.createdAt,
          isRead: item.isRead,
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

  http.patch('http://localhost:3000/api/v1/notifications', async () => {
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

  http.patch(
    'http://localhost:3000/api/v1/notifications/:notificationId',
    async ({ params }) => {
      await delay(2000);
      const { notificationId } = params;
      // return HttpResponse.json(
      //   {
      //     code: 400,
      //     message: '에러.',
      //   },
      //   { status: 400 }
      // );

      NOTIFICATIONS_SAMPLE_DATA.forEach((notification) => {
        if (
          !notification.isDelete
          && notification.id.toString() === notificationId
        ) {
          notification.isRead = true;
        }
      });

      return HttpResponse.json({
        code: 200,
        message: `${notificationId} 알림을 읽음 처리했습니다.`,
      });
    }
  ),

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

  http.delete(
    'http://localhost:3000/api/v1/notifications/:notificationId',
    async ({ params }) => {
      const { notificationId } = params;
      await delay(2000);

      // return HttpResponse.json(
      //   {
      //     code: 400,
      //     message: '에러.',
      //   },
      //   { status: 400 }
      // );

      NOTIFICATIONS_SAMPLE_DATA.forEach((notification) => {
        if (notification.id.toString() === notificationId) {
          notification.isDelete = true;
        }
      });

      return HttpResponse.json({
        code: 200,
        message: `${notificationId} 알림을 삭제했습니다.`,
      });
    }
  ),
];
