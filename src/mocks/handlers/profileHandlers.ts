import { http, HttpResponse } from 'msw';
import { FullProfile } from '@/types/profiles';

export const PROFILES_SAMPLE_DATA: FullProfile[] = [
  {
    id: 'me',
    name: '락서니',
    age: 28,
    gender: 'MALE',
    rating: 4.9,
    description:
      '공연과 여행을 사랑하는 자유로운 영혼, 락서니입니다 🎸🌍'.repeat(4),
    sns: 'https://instagram.com/roxani.rocks',
    hashtag: [
      'INCHEON PENTAPORT MUSIC FESTIVAL',
      '배려심 있어요',
      '대화를 잘 이끌어요',
    ],
    profileImage: { src: '/images/sample1.webp', alt: '락서니' },
    isReported: false,
    isMine: true,
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
    description: ' ',
    sns: '',
    hashtag: ['서울 재즈 페스티벌', ' ', '조용한 편이에요'],
    profileImage: { src: '', alt: '비트보이' },
    isReported: false,
    isMine: false,
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
    description: '매년 페스티벌 전국투어 중인 진짜 마니아 🤘 '.repeat(4),
    sns: 'https://instagram.com/festagirl',
    hashtag: [
      '부산 록 페스티벌',
      '친절하고 매너가 좋아요',
      '다음에도 함께하고 싶어요',
    ],
    profileImage: { src: '/images/sample2.jpg', alt: '페스타걸' },
    isReported: false,
    isMine: false,
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

export const profileHandlers = [
  http.get('/api/profiles/me', () => {
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

  http.get('/api/profiles/:userId', ({ params }) => {
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
];
