import { http, HttpResponse } from 'msw';

export const MOCK_GROUPS = {
  code: 200,
  message: '요청이 성공적으로 처리되었습니다.',
  data: {
    performanceId: 'pf-20250522',
    groupCount: 5,
    groups: [
      {
        id: 'g101',
        title: '락페 처음 가는 사람들 모여요',
        category: '같이 동행',
        gender: 'ALL',
        startAge: 20,
        endAge: 35,
        location: '서울 마포구',
        startDate: '2025-08-09T10:00:00Z',
        endDate: '2025-08-11T23:00:00Z',
        memberCount: 7,
        maxMembers: 10,
        hashtag: ['#락페입문', '#인친구해요'],
        isFavorite: true,
        host: {
          hostId: 'host901',
          name: '최락찬',
          rating: 4.6,
        },
        isHost: false,
      },
      {
        id: 'g106',
        title: '홍대 → 인천 택시팟 구해요!',
        category: '같이 탑승',
        gender: 'ALL',
        startAge: 20,
        endAge: 35,
        location: '서울 마포구 홍대입구역',
        startDate: '2025-08-09T09:30:00Z',
        endDate: '2025-08-09T11:30:00Z',
        memberCount: 3,
        maxMembers: 4,
        hashtag: ['#택시팟', '#홍대출발', '#카풀'],
        isFavorite: false,
        host: {
          hostId: 'host906',
          name: '유승택',
          rating: 4.6,
        },
        isHost: true,
      },
      {
        id: 'g102',
        title: '자우림 같이 보는 락덕 모임',
        category: '같이 동행',
        gender: 'FEMALE',
        startAge: 25,
        endAge: 40,
        location: '경기 부천시',
        startDate: '2025-08-09T12:00:00Z',
        endDate: '2025-08-10T22:30:00Z',
        memberCount: 5,
        maxMembers: 8,
        hashtag: ['#자우림', '#여성모임', '#페스티벌덕후'],
        isFavorite: false,
        host: {
          hostId: 'host902',
          name: '박하율',
          rating: 4.9,
        },
        isHost: false,
      },
      {
        id: 'g103',
        title: '3일권 구매자 모여서 캠핑해요!',
        category: '같이 숙박',
        gender: 'ALL',
        startAge: 23,
        endAge: 38,
        location: '인천 연수구',
        startDate: '2025-08-09T11:00:00Z',
        endDate: '2025-08-11T23:30:00Z',
        memberCount: 9,
        maxMembers: 12,
        hashtag: ['#락페캠핑', '#3일권', '#인천'],
        isFavorite: true,
        host: {
          hostId: 'host903',
          name: '이정훈',
          rating: 4.7,
        },
        isHost: false,
      },
      {
        id: 'g107',
        title: '일산 거주자 락페 카풀해요 🚗',
        category: '같이 탑승',
        gender: 'ALL',
        startAge: 25,
        endAge: 40,
        location: '경기 고양시 일산서구',
        startDate: '2025-08-09T10:00:00Z',
        endDate: '2025-08-09T12:00:00Z',
        memberCount: 2,
        maxMembers: 5,
        hashtag: ['#일산출발', '#카풀모집', '#교통비절약'],
        isFavorite: true,
        host: {
          hostId: 'host907',
          name: '정가람',
          rating: 4.85,
        },
        isHost: false,
      },
    ],
  },

  page: 1,
  size: 20,
  totalElements: 5,
  totalPages: 1,
  first: true,
  last: false,
};

export const groupsHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/performances/:performanceId/groups`,
    ({ params }) => {
      const { performanceId } = params;

      if (performanceId === '') {
        return HttpResponse.json(
          { message: '모임 목록 조회 요청에 실패했습니다.' },
          { status: 404 }
        );
      } else {
        return HttpResponse.json(MOCK_GROUPS);
      }
    }
  ),
];
