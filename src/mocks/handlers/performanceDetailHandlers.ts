import { PerformanceDetailResponse } from '@/types/performance';
import { http, HttpResponse } from 'msw';

export const MOCK_PERFORMANCE_DETAIL: PerformanceDetailResponse = {
  code: 200,
  message: '요청이 성공적으로 처리되었습니다.',
  data: {
    id: 'pf-20250809',
    title: '2025 인천 펜타포트 락 페스티벌',
    startDate: '2025-08-09T13:00:00Z',
    endDate: '2025-08-11T22:00:00Z',
    location: '인천 송도 달빛축제공원',
    cast: ['그린데이', '자우림', '넬', '더 유닛스'],
    crew: ['김락현', '최유진'],
    runtime: '240분',
    age: '만 15세 이상',
    productionCompany: ['인천문화재단'],
    agency: ['락스피릿코리아'],
    host: ['인천광역시'],
    organizer: ['펜타포트 운영위원회'],
    price: ['일반권 110,000원', '3일권 270,000원', 'VIP 180,000원'],
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
    time: ['금요일(16:00~22:00)', '토요일(13:00~22:00)', '일요일(13:00~21:00)'],
    groupCount: 5,
    favoriteCount: 120,
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
          { message: '공연 상세 조회 요청에 실패했습니다.' },
          { status: 404 }
        );
      } else {
        return HttpResponse.json(MOCK_PERFORMANCE_DETAIL);
      }
    }
  ),
];
