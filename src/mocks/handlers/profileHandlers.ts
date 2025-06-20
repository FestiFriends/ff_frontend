import { http, HttpResponse } from 'msw';
import { Group } from '@/types/group';
import { FullProfile } from '@/types/profiles';

export const PROFILES_SAMPLE_DATA: FullProfile[] = [
  {
    id: 'me',
    name: '락서니',
    age: 28,
    gender: 'MALE',
    rating: 4.9,
    description:
      '공연과 여행을 사랑하는 자유로운 영혼, 락서니입니다 🎸🌍'.repeat(2),
    sns: 'roxani.rocks',
    hashtag: [
      'INCHEON PENTAPORT MUSIC FESTIVAL',
      '배려심 있어요',
      '대화를 잘 이끌어요',
      '조용한 편이에요',
      '친절하고 매너가 좋아요',
      '시간을 잘 지켜요',
      '다음에도 함께하고 싶어요',
      '락페 마니아',
      '페스티벌룩 최고',
      '브이로그 찍어요',
      '서울재즈페스티벌',
      '부산락페',
      'ENFP',
      'MBTI대화좋아해요',
      '낯가림 없음',
      '소통왕',
      '운전 가능해요',
      '테크노 좋아해요',
      '다양한 장르 좋아요',
      '콘서트도 자주 가요',
    ],
    profileImage: { src: '/images/sample1.webp', alt: '락서니' },
    isReported: false,
    isMine: true,
    isLiked: true,
    groupSummary: {
      joinedCount: 3,
      totalJoinedCount: 10,
      createdCount: 2,
    },

    reviewSummary: {
      PUNCTUAL: 2,
      POLITE: 3,
      COMMUNICATIVE: 1,
    },
    reviewCount: 3,
    reviewList: ['시간 잘 지켜요', '친절했어요', '대화 잘 통해요'],
  },

  {
    id: 'guest1',
    name: '비트보이',
    age: 30,
    gender: 'MALE',
    rating: 0,
    description: '',
    sns: '',
    hashtag: ['서울 재즈 페스티벌', '조용한 편이에요'],
    profileImage: { src: '', alt: '비트보이' },
    isReported: false,
    isMine: false,
    isLiked: true,
    groupSummary: {
      joinedCount: 1,
      totalJoinedCount: 0,
      createdCount: 0,
    },

    reviewSummary: {},
    reviewCount: 0,
    reviewList: [],
  },

  {
    id: 'guest2',
    name: '페스타걸',
    age: 26,
    gender: 'FEMALE',
    rating: 4.7,
    description: '매년 페스티벌 전국투어 중인 진짜 마니아 🤘 '.repeat(2),
    sns: 'festagirl',
    hashtag: [
      '부산 록 페스티벌',
      '친절하고 매너가 좋아요',
      '다음에도 함께하고 싶어요',
    ],
    profileImage: { src: '/images/sample2.jpg', alt: '페스타걸' },
    isReported: false,
    isMine: false,
    isLiked: false,
    groupSummary: {
      joinedCount: 2,
      totalJoinedCount: 6,
      createdCount: 1,
    },
    reviewSummary: {
      RECOMMEND: 4,
      POLITE: 3,
    },
    reviewCount: 2,
    reviewList: ['다음에도 같이 가요!', '착하고 센스있어요'],
  },
];

export const JOINED_GROUPS_MOCK: Record<string, Group[]> = {
  me: [
    {
      id: 'g101',
      performance: {
        id: 'p1',
        title: '인천 펜타포트 락 페스티벌',
        poster: '/images/poster1.jpg',
      },
      title: '같이 가요 인천 락페!',
      category: 'COMPANION',
      gender: 'ALL',
      startAge: 25,
      endAge: 35,
      location: '인천',
      startDate: '2025-08-01T15:00:00Z',
      endDate: '2025-08-01T23:00:00Z',
      memberCount: 6,
      maxMembers: 10,
      description: '락페는 역시 함께 가야 제맛!',
      hashtag: ['#인천', '#락페동행'],
      host: {
        hostId: 'host001',
        name: '락서니',
        rating: 4.9,
      },
      isHost: true,
      createdAt: '2025-06-01T12:00:00Z',
    },
    {
      id: 'g104',
      performance: {
        id: 'p4',
        poster: '/images/poster4.jpg',
      },
      title: '캠핑존에서 텐트 같이 쳐요 ⛺',
      category: 'ROOM_SHARE',
      gender: 'MALE',
      startAge: 22,
      endAge: 34,
      location: '강원',
      startDate: '2025-08-09T12:00:00Z',
      endDate: '2025-08-11T11:00:00Z',
      memberCount: 5,
      maxMembers: 8,
      description: '장비 있어요! 캠핑 좋아하시는 분 함께해요.',
      hashtag: ['#캠핑존', '#장비지원', '#야영'],
      host: {
        hostId: 'host010',
        name: '산들남',
        rating: 4.8,
      },
      isHost: false,
      createdAt: '2025-06-04T10:00:00Z',
    },
  ],

  guest2: [
    {
      id: 'g106',
      performance: {
        id: 'p6',
        title: '부산 썸머 뮤직 페스티벌',
        poster: '/images/poster6.jpg',
      },
      title: '여자들끼리 부산 페스티벌 가요 💃',
      category: 'COMPANION',
      gender: 'FEMALE',
      startAge: 20,
      endAge: 30,
      location: '부산',
      startDate: '2025-08-15T13:00:00Z',
      endDate: '2025-08-15T22:00:00Z',
      memberCount: 5,
      maxMembers: 7,
      description: '같이 사진도 찍고 브이로그도 남겨요!',
      hashtag: ['#부산', '#페스티벌룩', '#여성모임'],
      host: {
        hostId: 'host012',
        name: '브이로그퀸',
        rating: 4.6,
      },
      isHost: false,
      createdAt: '2025-06-07T17:00:00Z',
    },
  ],
};

export const profileHandlers = [
  http.get('/api/v1/profiles/me', () => {
    const myProfile = PROFILES_SAMPLE_DATA.find((p) => p.isMine);
    if (!myProfile) {
      return HttpResponse.json(
        { message: '나의 프로필이 존재하지 않습니다.' },
        { status: 404 }
      );
    }
    return HttpResponse.json({
      code: 200,
      message: '프로필 조회 성공',
      data: myProfile,
    });
  }),

  http.get('/api/v1/profiles/:userId', ({ params }) => {
    const { userId } = params;
    const profile = PROFILES_SAMPLE_DATA.find((p) => p.id === userId);

    if (!profile) {
      return HttpResponse.json(
        { message: '존재하지 않는 유저입니다.' },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      code: 200,
      message: '프로필 조회 성공',
      data: profile,
    });
  }),

  http.get('/api/v1/profiles/:userId/joined-groups', ({ params, request }) => {
    const userId = typeof params.userId === 'string' ? params.userId : '';

    const allGroups = JOINED_GROUPS_MOCK[userId] ?? [];

    const cursorId = new URL(request.url).searchParams.get('cursorId');
    const size = 20;

    const cursorIndex = allGroups.findIndex((g) => g.id === cursorId);
    const startIndex = cursorIndex === -1 ? 0 : cursorIndex + 1;
    const pagedGroups = allGroups.slice(startIndex, startIndex + size);
    const nextCursor = pagedGroups.at(-1)?.id;

    return HttpResponse.json({
      code: 200,
      message: '참여 모임 목록 조회 성공',
      data: {
        data: pagedGroups,
        cursorId: nextCursor,
        hasNext: startIndex + size < allGroups.length,
      },
    });
  }),
];
