// import { http } from 'msw';
import { ChatMessage } from '@/types/chat';

export const CHAT_SAMPLE_DATA: ChatMessage[] = [
  {
    chatId: 1,
    senderId: 1,
    senderName: '토끼',
    senderImage: {
      id: 1,
      src: '/images/rabbit.png',
      alt: '토끼 프로필',
    },
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
    createdAt: '2025-06-12T10:01:00Z',
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
    createdAt: '2025-06-12T10:01:30Z',
    isMine: true,
  },
  {
    chatId: 4,
    senderId: 1,
    senderName: '토끼',
    senderImage: {
      id: 1,
      src: '/images/rabbit.png',
      alt: '토끼 프로필',
    },
    content: '예. ^^',
    createdAt: '2025-06-12T10:02:00Z',
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
    createdAt: '2025-06-12T10:02:30Z',
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
    createdAt: '2025-06-12T10:03:00Z',
    isMine: true,
  },
  {
    chatId: 7,
    senderId: 3,
    senderName: '말하는 감자',
    senderImage: {
      id: 3,
      src: '/images/potato.png',
      alt: '감자 프로필',
    },
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint minus asperiores, at a delectus dolores reprehenderit expedita omnis culpa nam autem qui neque quidem similique molestiae magnam alias nostrum maiores?',
    createdAt: '2025-06-12T10:04:00Z',
    isMine: false,
  },
  {
    chatId: 8,
    senderId: 1,
    senderName: '토끼',
    senderImage: {
      id: 1,
      src: '/images/rabbit.png',
      alt: '토끼 프로필',
    },
    content: '네?',
    createdAt: '2025-06-12T10:04:20Z',
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
    createdAt: '2025-06-12T10:04:40Z',
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
      src: '/images/potato.png',
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
    senderImage: {
      id: 1,
      src: '/images/rabbit.png',
      alt: '토끼 프로필',
    },
    content: '그만.',
    createdAt: '2025-06-13T22:35:40Z',
    isMine: false,
  },
];

// export const chatHandlers = [
//   http.get(`http://localhost:3000/api/v1/chat/list`, async ({ request }) => {
//     const url = new URL(request.url);
//     const cursorId = Number(url.searchParams.get('cursorId')) || 1000;
//     const size = Number(url.searchParams.get('size')) || 20;
//   }),
// ];
