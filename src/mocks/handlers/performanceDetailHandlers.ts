import { http, HttpResponse } from 'msw';

export const MOCK_PERFORMANCE_DETAIL = {
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
  poster: 'https://example.com/posters/jazz2025.jpg',
  state: '예매중',
  visit: '국내',
  images: [
    {
      id: 'img-001',
      src: 'https://example.com/images/jazz_stage.jpg',
      alt: '페스티벌 메인 무대',
    },
    {
      id: 'img-002',
      src: 'https://example.com/images/jazz_night.jpg',
      alt: '야경 속 재즈 공연',
    },
  ],
  time: [
    '화요일 ~ 금요일(20:00)',
    '토요일(16:00,19:00)',
    '일요일(15:00,18:00)',
  ],
  groupCount: 25,
  favoriteCount: 70,
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
