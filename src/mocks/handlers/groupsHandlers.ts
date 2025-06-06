import { http, HttpResponse } from 'msw';

const GROUP_PAGINATION_DATA = {
  page: 1,
  size: 3,
  totalElements: 10,
  totalPages: 4,
  first: true,
  last: false,
};

export const GROUPS_DATA = {
  code: 200,
  message: '요청이 성공적으로 처리되었습니다.',
  data: {
    performanceId: 'pf-20250522',
    groupCount: 10,
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
      {
        id: 'g108',
        title: '인천에서 출발하는 카풀 구해요!',
        category: '같이 탑승',
        gender: 'ALL',
        startAge: 22,
        endAge: 37,
        location: '인천 남동구',
        startDate: '2025-08-09T09:00:00Z',
        endDate: '2025-08-09T11:00:00Z',
        memberCount: 2,
        maxMembers: 4,
        hashtag: ['#인천출발', '#카풀구해요', '#교통비절약'],
        isFavorite: false,
        host: {
          hostId: 'host908',
          name: '김지웅',
          rating: 4.5,
        },
        isHost: true,
      },
      {
        id: 'g109',
        title: '소규모 락덕들 모여서 같이 즐겨요',
        category: '같이 동행',
        gender: 'ALL',
        startAge: 26,
        endAge: 35,
        location: '서울 중구',
        startDate: '2025-08-09T13:00:00Z',
        endDate: '2025-08-10T22:00:00Z',
        memberCount: 4,
        maxMembers: 6,
        hashtag: ['#락덕', '#소규모', '#함께즐겨요'],
        isFavorite: true,
        host: {
          hostId: 'host909',
          name: '서다인',
          rating: 4.9,
        },
        isHost: false,
      },
      {
        id: 'g110',
        title: '페스티벌 룩 같이 맞춰 입어요👕',
        category: '같이 동행',
        gender: 'FEMALE',
        startAge: 20,
        endAge: 30,
        location: '서울 강서구',
        startDate: '2025-08-09T11:30:00Z',
        endDate: '2025-08-10T21:30:00Z',
        memberCount: 3,
        maxMembers: 5,
        hashtag: ['#페스티벌룩', '#인생샷', '#코디맞춤'],
        isFavorite: true,
        host: {
          hostId: 'host910',
          name: '오예림',
          rating: 4.88,
        },
        isHost: false,
      },
      {
        id: 'g111',
        title: '락페 끝나고 뒷풀이 갈 분!',
        category: '같이 동행',
        gender: 'ALL',
        startAge: 24,
        endAge: 36,
        location: '인천 미추홀구',
        startDate: '2025-08-11T21:30:00Z',
        endDate: '2025-08-12T01:00:00Z',
        memberCount: 6,
        maxMembers: 10,
        hashtag: ['#락페뒷풀이', '#2차', '#음주환영'],
        isFavorite: false,
        host: {
          hostId: 'host911',
          name: '조민재',
          rating: 4.3,
        },
        isHost: true,
      },
      {
        id: 'g112',
        title: '텐트 같이 칠 사람! 장비 있어요',
        category: '같이 숙박',
        gender: 'ALL',
        startAge: 21,
        endAge: 33,
        location: '인천 연수구',
        startDate: '2025-08-09T10:00:00Z',
        endDate: '2025-08-11T23:00:00Z',
        memberCount: 5,
        maxMembers: 6,
        hashtag: ['#텐트공유', '#캠핑모임', '#장비있음'],
        isFavorite: true,
        host: {
          hostId: 'host912',
          name: '백건우',
          rating: 4.75,
        },
        isHost: false,
      },
    ],
  },

  ...GROUP_PAGINATION_DATA,
};

export const groupsHandlers = [
  http.get(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/performances/:performanceId/groups`,
    ({ params, request }) => {
      const { performanceId } = params;

      const url = new URL(request.url);
      const page = url.searchParams.get('page') || GROUP_PAGINATION_DATA.page;
      const size = url.searchParams.get('size') || GROUP_PAGINATION_DATA.size;
      console.log(page, size);

      if (performanceId === '') {
        return HttpResponse.json(
          { message: '모임 목록 조회 요청에 실패했습니다.' },
          { status: 404 }
        );
      }

      if (page === '2') {
        return HttpResponse.json({
          ...GROUPS_DATA,
          data: {
            ...GROUPS_DATA.data,
            groups: GROUPS_DATA.data.groups.slice(3, 6),
          },
        });
      } else if (page === '3') {
        return HttpResponse.json({
          ...GROUPS_DATA,
          data: {
            ...GROUPS_DATA.data,
            groups: GROUPS_DATA.data.groups.slice(6, 9),
          },
        });
      } else if (page === '4') {
        return HttpResponse.json({
          ...GROUPS_DATA,
          data: {
            ...GROUPS_DATA.data,
            groups: GROUPS_DATA.data.groups.slice(9),
          },
        });
      } else {
        return HttpResponse.json({
          ...GROUPS_DATA,
          data: {
            ...GROUPS_DATA.data,
            groups: GROUPS_DATA.data.groups.slice(0, 3),
          },
        });
      }
    }
  ),
];
