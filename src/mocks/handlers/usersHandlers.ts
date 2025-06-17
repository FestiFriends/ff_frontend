import { http, HttpResponse } from 'msw';
import { Gender } from '@/types/enums';
import { UserId } from '@/types/users';

interface UserResponse {
  id: string;
  name: string;
  age: number;
  gender: keyof typeof Gender;
  profileImage: {
    id: string;
    src: string;
    alt: string;
  };
  description: string;
  hashtag: string[];
  sns: string;
  rating: number;
  isLiked: boolean;
}

const FAVORITE_USERS_SAMPLE_DATA: UserResponse[] = [
  {
    id: 'user-123456',
    name: '홍길동',
    age: 28,
    gender: Gender.MALE,
    profileImage: {
      id: 'profile301003',
      src: '',
      alt: '홍길동 프로필 이미지',
    },
    description: '나락도 락이다...🤘',
    hashtag: ['#음악', '#여행', '#운동'],
    sns: 'fstvl.life',
    rating: 4.5,
    isLiked: true,
  },
  {
    id: 'user-123457',
    name: '김철수',
    age: 25,
    gender: Gender.MALE,
    profileImage: {
      id: 'profile301004',
      src: '',
      alt: '김철수 프로필 이미지',
    },
    description: '음악과 여행을 사랑하는 사람입니다',
    hashtag: ['#락', '#캠핑', '#여행'],
    sns: 'travel.life',
    rating: 4.8,
    isLiked: true,
  },
  {
    id: 'user-123458',
    name: '이영희',
    age: 30,
    gender: Gender.FEMALE,
    profileImage: {
      id: 'profile301005',
      src: '',
      alt: '이영희 프로필 이미지',
    },
    description: '페스티벌 마니아입니다',
    hashtag: ['#페스티벌', '#음악', '#사진'],
    sns: 'festival.life',
    rating: 4.2,
    isLiked: true,
  },
];

const USER_ID_SAMPLE_DATA: UserId = {
  userId: 4,
};

export const usersHandlers = [
  http.get('http://localhost:3000/api/v1/users/favorites', ({ request }) => {
    const url = new URL(request.url);
    const cursorId = url.searchParams.get('cursorId');
    const size = Number(url.searchParams.get('size')) || 20;

    // 커서 기반 페이지네이션 구현
    let startIndex = 0;
    if (cursorId) {
      const cursorIndex = FAVORITE_USERS_SAMPLE_DATA.findIndex(
        (user) => user.id === cursorId
      );
      if (cursorIndex !== -1) {
        startIndex = cursorIndex + 1;
      }
    }

    const endIndex = startIndex + size;
    const hasNext = endIndex < FAVORITE_USERS_SAMPLE_DATA.length;
    const data = FAVORITE_USERS_SAMPLE_DATA.slice(startIndex, endIndex);
    const nextCursorId = hasNext ? data[data.length - 1].id : undefined;

    return HttpResponse.json({
      code: 200,
      message: '요청이 성공적으로 처리되었습니다.',
      data,
      cursorId: nextCursorId,
      hasNext,
    });
  }),

  http.get(
    'http://localhost:3000/api/v1/users/id',
    () =>
      HttpResponse.json({
        code: 200,
        message: '사용자 ID 조회 성공',
        data: USER_ID_SAMPLE_DATA,
      })
    // HttpResponse.json(
    //   {
    //     code: 401,
    //     message: '인증 실패',
    //   },
    //   { status: 401 }
    // )
  ),
];
