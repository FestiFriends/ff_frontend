import { http } from 'msw';
import { ChatMessage } from '@/types/chat';

export const CHAT_SAMPLE_DATA: ChatMessage[] = [
  {
    chatId: '1',
    senderId: 'u1',
    senderName: '토끼',
    senderImage: {
      id: 'img1',
      src: '/images/rabbit.png',
      alt: '토끼 프로필',
    },
    content: '안녕하세요',
    createdAt: '2025-06-12T10:00:00Z',
  },
  {
    chatId: '2',
    senderId: 'u2',
    senderName: '문영',
    senderImage: {
      id: 'img2',
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '네 안녕하세요',
    createdAt: '2025-06-12T10:01:00Z',
  },
  {
    chatId: '3',
    senderId: 'u2',
    senderName: '문영',
    senderImage: {
      id: 'img2',
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '만나서 반갑습니다',
    createdAt: '2025-06-12T10:01:30Z',
  },
  {
    chatId: '4',
    senderId: 'u1',
    senderName: '토끼',
    senderImage: {
      id: 'img1',
      src: '/images/rabbit.png',
      alt: '토끼 프로필',
    },
    content: '안녕하세요',
    createdAt: '2025-06-12T10:02:00Z',
  },
  {
    chatId: '5',
    senderId: 'u2',
    senderName: '문영',
    senderImage: {
      id: 'img2',
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '네 안녕하세요',
    createdAt: '2025-06-12T10:02:30Z',
  },
  {
    chatId: '6',
    senderId: 'u2',
    senderName: '문영',
    senderImage: {
      id: 'img2',
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '만나서 반갑습니다',
    createdAt: '2025-06-12T10:03:00Z',
  },
  {
    chatId: '7',
    senderId: 'u3',
    senderName: '말하는 감자',
    senderImage: {
      id: 'img3',
      src: '/images/potato.png',
      alt: '감자 프로필',
    },
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint minus asperiores, at a delectus dolores reprehenderit expedita omnis culpa nam autem qui neque quidem similique molestiae magnam alias nostrum maiores?',
    createdAt: '2025-06-12T10:04:00Z',
  },
  {
    chatId: '8',
    senderId: 'u1',
    senderName: '토끼',
    senderImage: {
      id: 'img1',
      src: '/images/rabbit.png',
      alt: '토끼 프로필',
    },
    content: '네?',
    createdAt: '2025-06-12T10:04:20Z',
  },
  {
    chatId: '9',
    senderId: 'u2',
    senderName: '문영',
    senderImage: {
      id: 'img2',
      src: '/images/moonyoung.png',
      alt: '문영 프로필',
    },
    content: '?',
    createdAt: '2025-06-12T10:04:40Z',
  },
];

// export const chatHandlers = [
//   http.get(`http://localhost:3000/api/v1/chat/list`, async ({ request }) => {
//     const url = new URL(request.url);
//     const cursorId = Number(url.searchParams.get('cursorId')) || 1000;
//     const size = Number(url.searchParams.get('size')) || 20;
//   }),
// ];
