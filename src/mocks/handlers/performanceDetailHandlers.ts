import { http, HttpResponse } from 'msw';

export const MOCK_PERFORMANCE_DETAIL = {
  code: 200,
  message: '요청이 성공적으로 처리되었습니다.',
  data: {
    id: 'pf-20250522',
    title: '2025 서울 재즈 페스티벌',
    startDate: '2025-05-30T18:00:00Z',
    endDate: '2025-06-01T22:00:00Z',
    location: '올림픽공원 88잔디마당',
    cast: ['존 바티스트', '이하이', '혁오'],
    crew: ['김철수', '박예은'],
    runtime: '180분',
    age: '만 12세 이상',
    productionCompany: ['서울예술기획'],
    agency: ['재즈엔터테인먼트'],
    host: ['서울특별시'],
    organizer: ['SJF조직위'],
    price: ['일반석 99,000원', 'VIP석 150,000원'],
    poster: 'https://picsum.photos/id/158/420/600',
    state: '예매중',
    visit: '국내',
    images: [
      {
        id: 'img-001',
        src: 'https://picsum.photos/700/1000',
        alt: '소개이미지 1',
      },
      {
        id: 'img-002',
        src: 'https://picsum.photos/500',
        alt: '소개이미지 2',
      },
      {
        id: 'img-003',
        src: 'https://picsum.photos/500/700',
        alt: '소개이미지 3',
      },
      {
        id: 'img-004',
        src: 'https://picsum.photos/420/700',
        alt: '소개이미지 4',
      },
    ],
    time: [
      '화요일 ~ 금요일(20:00)',
      '토요일(16:00,19:00)',
      '일요일(15:00,18:00)',
    ],
    groupCount: 25,
    favoriteCount: 70,
    isLiked: false,
  },
};

export const performanceDetailHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/performances/:performanceId`,
    ({ params }) => {
      const { performanceId } = params;

      if (performanceId === '') {
        return HttpResponse.json(
          { message: '존재하지 않는 공연입니다.' },
          { status: 404 }
        );
      } else {
        return HttpResponse.json(MOCK_PERFORMANCE_DETAIL);
      }
    }
  ),
];
