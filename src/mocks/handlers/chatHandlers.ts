import { http, HttpResponse } from 'msw';
import { ChatMessage } from '@/types/chat';

export const CHAT_SAMPLE_DATA: ChatMessage[] = [
  {
    chatId: 1,
    senderId: 1,
    senderName: '토끼',
    content: '안녕하세요',
    createdAt: '2025-06-12T10:00:00Z',
    isMine: false,
  },
  {
    chatId: 2,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '네 안녕하세요',
    createdAt: '2025-06-12T13:01:00Z',
    isMine: true,
  },
  {
    chatId: 3,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '만나서 반갑습니다',
    createdAt: '2025-06-12T13:01:30Z',
    isMine: true,
  },
  {
    chatId: 4,
    senderId: 1,
    senderName: '토끼',
    content: '예. ^^',
    createdAt: '2025-06-12T17:55:00Z',
    isMine: false,
  },
  {
    chatId: 5,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content:
      '제 이름은 김수한무 거북이와 두루미 삼천갑자 동방삭 치치카포 사리사리센타 워리워리 세브리깡 무두셀라 구름이 허리케인에 담벼락 담벼락에 서생원 서생원에 고양이 고양이엔 바둑이 바둑이는 돌돌이 입니다',
    createdAt: '2025-06-12T19:32:30Z',
    isMine: true,
  },
  {
    chatId: 6,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '조금 길죠?',
    createdAt: '2025-06-12T19:35:00Z',
    isMine: true,
  },
  {
    chatId: 7,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF262382_250403_132803.jpg',
      alt: '감자 프로필',
    },
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint minus asperiores, at a delectus dolores reprehenderit expedita omnis culpa nam autem qui neque quidem similique molestiae magnam alias nostrum maiores?',
    createdAt: '2025-06-12T20:14:00Z',
    isMine: false,
  },
  {
    chatId: 8,
    senderId: 1,
    senderName: '토끼',
    content: '네?',
    createdAt: '2025-06-12T20:14:20Z',
    isMine: false,
  },
  {
    chatId: 9,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '?',
    createdAt: '2025-06-12T20:15:40Z',
    isMine: true,
  },
  {
    chatId: 10,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '재밌는 얘기 해주세요',
    createdAt: '2025-06-13T21:04:40Z',
    isMine: true,
  },
  {
    chatId: 11,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF262382_250403_132803.jpg',
      alt: '감자 프로필',
    },
    content: '냉장고를 열었더니 잼이 있었어요',
    createdAt: '2025-06-13T22:34:40Z',
    isMine: false,
  },
  {
    chatId: 12,
    senderId: 1,
    senderName: '토끼',
    content: '그만.',
    createdAt: '2025-06-13T22:35:40Z',
    isMine: false,
  },
  {
    chatId: 13,
    senderId: 1,
    senderName: '토끼',
    content: '지금 가는 중입니다.',
    createdAt: '2025-06-13T23:02:00Z',
    isMine: false,
  },
  {
    chatId: 14,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF262382_250403_132803.jpg',
      alt: '감자 프로필',
    },
    content: '하하하 웃기네요',
    createdAt: '2025-06-13T23:04:00Z',
    isMine: false,
  },
  {
    chatId: 15,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '조심해서 오세요!',
    createdAt: '2025-06-13T23:06:00Z',
    isMine: true,
  },
  {
    chatId: 16,
    senderId: 1,
    senderName: '토끼',
    content: '넵넵',
    createdAt: '2025-06-14T09:01:00Z',
    isMine: false,
  },
  {
    chatId: 17,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF262382_250403_132803.jpg',
      alt: '감자 프로필',
    },
    content: '오늘 날씨 좋네요',
    createdAt: '2025-06-14T10:20:00Z',
    isMine: false,
  },
  {
    chatId: 18,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '산책 가기 딱이네요',
    createdAt: '2025-06-14T10:21:00Z',
    isMine: true,
  },
  {
    chatId: 19,
    senderId: 1,
    senderName: '토끼',
    content: '전 실내파입니다',
    createdAt: '2025-06-14T11:00:00Z',
    isMine: false,
  },
  {
    chatId: 20,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '그럴 줄 알았어요',
    createdAt: '2025-06-14T11:01:00Z',
    isMine: true,
  },
  {
    chatId: 21,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF262382_250403_132803.jpg',
      alt: '감자 프로필',
    },
    content: '게임 할 사람~',
    createdAt: '2025-06-14T12:00:00Z',
    isMine: false,
  },
  {
    chatId: 22,
    senderId: 1,
    senderName: '토끼',
    content: '접속 중...',
    createdAt: '2025-06-14T12:02:00Z',
    isMine: false,
  },
  {
    chatId: 23,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '저도 들어가요!',
    createdAt: '2025-06-14T12:03:00Z',
    isMine: true,
  },
  {
    chatId: 24,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF262382_250403_132803.jpg',
      alt: '감자 프로필',
    },
    content: '오늘도 평화롭다',
    createdAt: '2025-06-15T08:00:00Z',
    isMine: false,
  },
  {
    chatId: 25,
    senderId: 1,
    senderName: '토끼',
    content: '좋은 하루~',
    createdAt: '2025-06-15T08:30:00Z',
    isMine: false,
  },
  {
    chatId: 26,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '모두 힘내세요!',
    createdAt: '2025-06-15T08:45:00Z',
    isMine: true,
  },
  {
    chatId: 27,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF262382_250403_132803.jpg',
      alt: '감자 프로필',
    },
    content: '화이팅!!',
    createdAt: '2025-06-15T09:00:00Z',
    isMine: false,
  },
  {
    chatId: 28,
    senderId: 1,
    senderName: '토끼',
    content: '으랏차!',
    createdAt: '2025-06-15T09:02:00Z',
    isMine: false,
  },
  {
    chatId: 29,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '오늘 점심은 뭘 먹지?',
    createdAt: '2025-06-17T11:30:00Z',
    isMine: true,
  },
  {
    chatId: 30,
    senderId: 1,
    senderName: '토끼',
    content: '비빔면이요',
    createdAt: '2025-06-17T11:31:00Z',
    isMine: false,
  },
  {
    chatId: 31,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF262382_250403_132803.jpg',
      alt: '감자 프로필',
    },
    content: '나는 감자볶음밥!',
    createdAt: '2025-06-17T15:32:00Z',
    isMine: false,
  },
  {
    chatId: 32,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '오늘도 다들 고생 많았어요 :)',
    createdAt: '2025-06-17T23:58:00Z',
    isMine: true,
  },
  {
    chatId: 33,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF262382_250403_132803.jpg',
      alt: '감자 프로필',
    },
    content: '진짜 다들 수고 많았어요~',
    createdAt: '2025-06-18T00:00:00Z',
    isMine: false,
  },
  {
    chatId: 34,
    senderId: 1,
    senderName: '토끼',
    content: '내일도 화이팅이에요!',
    createdAt: '2025-06-18T00:01:00Z',
    isMine: false,
  },
  {
    chatId: 35,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '응응~ 다들 잘자요 😴',
    createdAt: '2025-06-18T00:02:00Z',
    isMine: true,
  },
  {
    chatId: 36,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF262382_250403_132803.jpg',
      alt: '감자 프로필',
    },
    content: '감자는 꿈나라로...',
    createdAt: '2025-06-18T00:03:30Z',
    isMine: false,
  },
  {
    chatId: 37,
    senderId: 1,
    senderName: '토끼',
    content: 'ㅋㅋㅋㅋㅋㅋ',
    createdAt: '2025-06-18T00:04:00Z',
    isMine: false,
  },
  {
    chatId: 38,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '자 그럼 진짜 잘 자요~~',
    createdAt: '2025-06-18T00:05:00Z',
    isMine: true,
  },
  {
    chatId: 39,
    senderId: 1,
    senderName: '토끼',
    content: '굿밤 🌙',
    createdAt: '2025-06-18T00:06:00Z',
    isMine: false,
  },
  {
    chatId: 40,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: 'http://www.kopis.or.kr/upload/pfmPoster/PF_PF262382_250403_132803.jpg',
      alt: '감자 프로필',
    },
    content: '감자 out 💤',
    createdAt: '2025-06-18T00:07:10Z',
    isMine: false,
  },
  {
    chatId: 41,
    senderId: 4,
    senderName: '문영',
    senderImage: {
      id: 2,
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: 'ㅋㅋㅋㅋㅋ 귀엽다 진짜',
    createdAt: '2025-06-18T00:08:20Z',
    isMine: true,
  },
  {
    chatId: 42,
    senderId: 1,
    senderName: '토끼',
    content: '좋은 꿈 꾸세요 다들~',
    createdAt: '2025-06-18T00:09:00Z',
    isMine: false,
  },
];

export const chatHandlers = [
  http.get(`http://localhost:3000/api/v1/chat/list`, async ({ request }) => {
    const url = new URL(request.url);
    const chatRoomId = url.searchParams.get('chatRoomId');
    const cursorId = Number(url.searchParams.get('cursorId'));
    const size = Number(url.searchParams.get('size')) || 20;

    if (chatRoomId === '1' || chatRoomId === '2') {
      const sortedData = [...CHAT_SAMPLE_DATA].sort(
        (a, b) => b.chatId - a.chatId
      );

      const filteredData = cursorId
        ? sortedData.filter((message) => message.chatId < Number(cursorId))
        : sortedData;

      const slicedData = filteredData.slice(0, size);

      const newCursorId =
        slicedData.length > 0 ? slicedData[slicedData.length - 1].chatId : null;

      const hasNext = filteredData.length > size;

      return HttpResponse.json(
        {
          code: 200,
          message: '메시지 목록 조회 성공',
          data: slicedData,
          cursorId: newCursorId,
          hasNext,
        },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      { code: '404', message: '채팅방을 찾을 수 없습니다.', data: [] },
      { status: 404 }
    );
  }),
];
