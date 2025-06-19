import { delay, http, HttpResponse } from 'msw';
import {
  PostReviewRequest,
  RecentReviewsResponse,
  WritableReviewsData,
  WrittenReviewsData,
} from '@/types/reviews';

const RECENT_REVIEWS_SAMPLE_DATA: RecentReviewsResponse = {
  code: 200,
  message: '최근 올라온 리뷰 top5 조회 성공',
  data: [
    {
      groupId: 'fest-20250421',
      performance: {
        id: 'perf-001',
        title:
          '서울 재즈 페스티벌 메인 공연서울 재즈 페스티벌 메인 공연서울 재즈 페스티벌 메인 공연',
        poster: 'https://picsum.photos/200/300',
      },
      groupTitle: '2025 서울 재즈 페스티벌',
      category: 'COMPANION',
      groupStartDate: '2025-04-21',
      groupEndDate: '2025-04-21',
      reviews: [
        {
          reviewId: 'rev-101',
          rating: 5.0,
          content:
            '분위기를 너무 잘 즐기셔서 같이 다니는 게 즐거웠어요!분위기를 너무 잘 즐기셔서 같이 다니는 게 즐거웠어요!분위기를 너무 잘 즐기셔서 같이 다니는 게 즐거웠어요!',
          defaultTag: ['PUNCTUAL', 'COMMUNICATIVE'],
          createdAt: '2025-04-24T11:00:00+09:00',
        },
        {
          reviewId: 'rev-102',
          rating: 4.0,
          defaultTag: ['POLITE', 'COMFORTABLE'],
          createdAt: '2025-04-25T08:30:00+09:00',
        },
      ],
    },
    {
      groupId: 'tour-20250501',
      performance: {
        id: 'perf-002',
        title: '한라산 등반',
        poster: 'https://picsum.photos/200/300',
      },
      groupTitle: '5월 한라산 등반 모임',
      category: 'COMPANION',
      groupStartDate: '2025-05-01',
      groupEndDate: '2025-05-02',
      reviews: [
        {
          reviewId: 'rev-103',
          rating: 4.5,
          content: '등산 장비도 잘 챙기시고',
          defaultTag: ['RESPONSIVE', 'RECOMMEND'],
          createdAt: '2025-05-03T14:10:00+09:00',
        },
      ],
    },
    {
      groupId: 'room-20250418',
      performance: {
        id: 'perf-003',
        title: '함께 요리하는 쿠킹 클래스',
        poster: 'https://picsum.photos/200/300',
      },
      groupTitle: '함께 요리하는 쿠킹 클래스',
      category: 'ROOM_SHARE',
      groupStartDate: '2025-04-18',
      groupEndDate: '2025-04-18',
      reviews: [
        {
          reviewId: 'rev-104',
          rating: 5.0,
          content: '정말 재밌고 센스 넘치시는 분이에요!',
          defaultTag: ['CLEAN', 'COMMUNICATIVE'],
          createdAt: '2025-04-19T19:20:00+09:00',
        },
      ],
    },
    {
      groupId: 'photo-20250428',
      performance: {
        id: 'perf-004',
        title: '봄날의 출사 모임',
        poster: 'https://picsum.photos/200/300',
      },
      groupTitle: '봄날의 출사 모임',
      category: 'COMPANION',
      groupStartDate: '2025-04-28',
      groupEndDate: '2025-04-28',
      reviews: [
        {
          reviewId: 'rev-105',
          rating: 3,
          defaultTag: ['PUNCTUAL'],
          createdAt: '2025-04-29T16:45:00+09:00',
        },
      ],
    },
  ],
};

const WRITTEN_REVIEWS_SAMPLE_DATA: WrittenReviewsData[] = [
  {
    groupId: '789',
    performance: {
      id: 'perf-003',
      title: '레미제라블',
      poster: 'https://picsum.photos/seed/perf1/400/600',
    },
    groupTitle: '레미제라블 같이 관람해요',
    category: 'COMPANION',
    memberCount: 5,
    groupStartDate: '2025-06-15T17:00:00Z',
    groupEndDate: '2025-06-15T20:00:00Z',
    reviews: [
      {
        reviewId: 'rev-301',
        targetUserId: 'me',
        targetUserName: '홍길동',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        rating: 5,
        content: '분위기 메이커였고 너무 즐거운 모임이었어요!',
        defaultTag: ['POLITE', 'COMMUNICATIVE', 'RECOMMEND'],
        createdAt: '2025-06-16T10:00:00Z',
      },
      {
        reviewId: 'rev-302',
        targetUserId: 'guest2',
        targetUserName: '김영희',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        rating: 4,
        content: '시간 잘 지켜주시고 이야기 나누기 좋았어요.',
        defaultTag: ['PUNCTUAL', 'CLEAN'],
        createdAt: '2025-06-16T10:30:00Z',
      },
    ],
  },
  {
    groupId: '790',
    performance: {
      id: 'perf-004',
      title: '서울 재즈 페스티벌',
      poster: 'https://picsum.photos/seed/perf1/400/600',
    },
    groupTitle: '재즈 좋아하는 분들 같이 가요',
    category: 'ROOM_SHARE',
    memberCount: 3,
    groupStartDate: '2025-06-20T12:00:00Z',
    groupEndDate: '2025-06-21T12:00:00Z',
    reviews: [
      {
        reviewId: 'rev-303',
        targetUserId: 'me',
        targetUserName: '이철수',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        rating: 5,
        content: '숙소도 깔끔했고 다들 매너 좋았어요.',
        defaultTag: ['CLEAN', 'POLITE', 'RECOMMEND'],
        createdAt: '2025-06-22T09:15:00Z',
      },
      {
        reviewId: 'rev-304',
        targetUserId: 'user-104',
        targetUserName: '김수용',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        rating: 4,
        content: '다들 매너 좋았어요. 다음에도 꼭 또 같이 가고 싶어요',
        defaultTag: ['CLEAN', 'POLITE', 'RECOMMEND'],
        createdAt: '2025-06-22T09:15:00Z',
      },
      {
        reviewId: 'rev-3042',
        targetUserId: 'me',
        targetUserName: '김수용',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        rating: 4,
        content: '다들 매너 좋았어요. 다음에도 꼭 또 같이 가고 싶어요',
        defaultTag: ['CLEAN', 'POLITE', 'RECOMMEND'],
        createdAt: '2025-06-22T09:15:00Z',
      },
      {
        reviewId: 'rev-3043',
        targetUserId: 'user-1043',
        targetUserName: '김수용',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        rating: 4,
        content: '다들 매너 좋았어요. 다음에도 꼭 또 같이 가고 싶어요',
        defaultTag: ['CLEAN', 'POLITE', 'RECOMMEND'],
        createdAt: '2025-06-22T09:15:00Z',
      },
      {
        reviewId: 'rev-3044',
        targetUserId: 'user-1042',
        targetUserName: '김수용',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        rating: 4,
        content: '다들 매너 좋았어요. 다음에도 꼭 또 같이 가고 싶어요',
        defaultTag: ['CLEAN', 'POLITE', 'RECOMMEND'],
        createdAt: '2025-06-22T09:15:00Z',
      },
      {
        reviewId: 'rev-3045',
        targetUserId: 'user-1041',
        targetUserName: '김수용',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        rating: 4,
        content: '다들 매너 좋았어요. 다음에도 꼭 또 같이 가고 싶어요',
        defaultTag: ['CLEAN', 'POLITE', 'RECOMMEND'],
        createdAt: '2025-06-22T09:15:00Z',
      },
    ],
  },
  {
    groupId: '791',
    performance: {
      id: 'perf-007',
      title: '오페라의 유령',
      poster: 'https://picsum.photos/seed/perf1/400/600',
    },
    groupTitle: '뮤지컬 같이 보실 분~',
    category: 'COMPANION',
    memberCount: 2,
    groupStartDate: '2025-06-10T19:00:00Z',
    groupEndDate: '2025-06-10T22:00:00Z',
    reviews: [
      {
        reviewId: 'rev-305',
        targetUserId: 'me',
        targetUserName: '정수빈',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        rating: 5,
        content: '조용하고 편하게 관람할 수 있었어요.',
        defaultTag: ['COMFORTABLE', 'RECOMMEND'],
        createdAt: '2025-06-11T08:00:00Z',
      },
    ],
  },
];

const WRITABLE_REVIEWS_SAMPLE_DATA: WritableReviewsData[] = [
  {
    groupId: '901',
    performance: {
      id: 'perf-005',
      title: '클래식 나잇 콘서트',
      poster: 'https://picsum.photos/seed/perf1/400/600',
    },
    groupTitle: '클래식 좋아하는 분들 모여요',
    category: 'COMPANION',
    memberCount: 4,
    groupStartDate: '2025-06-18T19:30:00Z',
    groupEndDate: '2025-06-18T22:00:00Z',
    reviews: [
      {
        targetUserId: 'user-201',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        targetUserName: '박지은',
      },
      {
        targetUserId: 'user-202',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        targetUserName: '최민호',
      },
    ],
  },
  {
    groupId: '902',
    performance: {
      id: 'perf-006',
      title: '뮤직 페스티벌 썸머2025',
      poster: 'https://picsum.photos/seed/perf1/400/600',
    },
    groupTitle: '1박2일 페스티벌 같이 가실 분~',
    category: 'ROOM_SHARE',
    memberCount: 6,
    groupStartDate: '2025-07-01T10:00:00Z',
    groupEndDate: '2025-07-02T12:00:00Z',
    reviews: [
      {
        targetUserId: 'user-203',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        targetUserName: '김태영',
      },
      {
        targetUserId: 'user-204',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        targetUserName: '이하늘',
      },
    ],
  },
  {
    groupId: '903',
    performance: {
      id: 'perf-008',
      title: '인디밴드 라이브',
      poster: 'https://picsum.photos/seed/perf1/400/600',
    },
    groupTitle: '홍대 인디 공연 보러가요',
    category: 'COMPANION',
    memberCount: 3,
    groupStartDate: '2025-06-25T18:00:00Z',
    groupEndDate: '2025-06-25T21:00:00Z',
    reviews: [
      {
        targetUserId: 'user-205',
        targetUserProfileImage: 'https://picsum.photos/seed/perf1/400/600',
        targetUserName: '오서현',
      },
    ],
  },
];

export const reviewsHandlers = [
  http.get(
    'http://localhost:3000/api/v1/performances/recent-reviews',
    () => HttpResponse.json(RECENT_REVIEWS_SAMPLE_DATA)
    // return HttpResponse.json({ code: 200, message: '성공', data: [] })
    // HttpResponse.json(
    //   {
    //     code: 400,
    //   },
    //   { status: 400 }
    // )
  ),

  // 1. 작성한 리뷰 조회
  http.get(
    'http://localhost:3000/api/v1/reviews/written',
    async ({ request }) => {
      await delay(2000);
      const url = new URL(request.url);
      const cursor = url.searchParams.get('cursorId');
      const size = Number(url.searchParams.get('size')) || 20;

      const sorted = WRITTEN_REVIEWS_SAMPLE_DATA.sort(
        (a, b) => Number(b.groupId) - Number(a.groupId)
      );

      const filtered = sorted.filter((group) =>
        cursor ? Number(group.groupId) < Number(cursor) : true
      );

      const paginated = filtered.slice(0, size);
      const nextCursor =
        paginated.length === size ? paginated.at(-1)!.groupId : null;

      return HttpResponse.json({
        code: 200,
        message: '내가 작성한 리뷰 조회 성공',
        data: paginated,
        cursorId: nextCursor,
        hasNext: nextCursor !== null,
      });
    }
  ),

  // 2. 작성 가능한 리뷰 조회
  http.get(
    'http://localhost:3000/api/v1/reviews/writable',
    async ({ request }) => {
      await delay(2000);

      const url = new URL(request.url);
      const cursor = url.searchParams.get('cursorId');
      const size = Number(url.searchParams.get('size')) || 2;

      const sorted = WRITABLE_REVIEWS_SAMPLE_DATA.sort(
        (a, b) => Number(b.groupId) - Number(a.groupId)
      );

      const filtered = sorted.filter((group) =>
        cursor ? Number(group.groupId) < Number(cursor) : true
      );

      const paginated = filtered.slice(0, size);
      const nextCursor =
        paginated.length === size ? paginated.at(-1)!.groupId : null;

      return HttpResponse.json({
        code: 200,
        message: '작성 가능한 리뷰 목록 조회 성공',
        data: paginated,
        cursorId: nextCursor,
        hasNext: nextCursor !== null,
      });
    }
  ),

  // 3. 리뷰 작성
  http.post('http://localhost:3000/api/v1/reviews', async ({ request }) => {
    await delay(2000);

    const body = (await request.json()) as PostReviewRequest;
    const { groupId, targetUserId, rating, content, defaultTag } = body;

    const group = WRITABLE_REVIEWS_SAMPLE_DATA.find(
      (g) => g.groupId === groupId
    );
    if (!group) {
      return HttpResponse.json(
        { code: 404, message: '그룹을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const targetUser = group.reviews.find(
      (r) => r.targetUserId === targetUserId
    );
    if (!targetUser) {
      return HttpResponse.json(
        { code: 404, message: '리뷰 대상 유저를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    let writtenGroup = WRITTEN_REVIEWS_SAMPLE_DATA.find(
      (g) => g.groupId === groupId
    );
    if (!writtenGroup) {
      writtenGroup = {
        ...group,
        reviews: [],
      };
      WRITTEN_REVIEWS_SAMPLE_DATA.push(writtenGroup);
    }

    const newReview = {
      reviewId: Math.random().toString(36).substring(2, 10),
      targetUserId,
      targetUserName: targetUser.targetUserName,
      targetUserProfileImage: targetUser.targetUserProfileImage,
      rating,
      content,
      defaultTag,
      createdAt: new Date().toISOString(),
    };

    writtenGroup.reviews.push(newReview);

    group.reviews = group.reviews.filter(
      (r) => r.targetUserId !== targetUserId
    );
    if (group.reviews.length === 0) {
      const idx = WRITABLE_REVIEWS_SAMPLE_DATA.indexOf(group);
      if (idx !== -1) WRITABLE_REVIEWS_SAMPLE_DATA.splice(idx, 1);
    }

    return HttpResponse.json({ code: 201, message: '리뷰 작성 성공' });
  }),

  http.get(
    'http://localhost:3000/api/v1/reviews/received/:userId',
    async ({ params }) => {
      const { userId } = params;

      const receivedReviews = WRITTEN_REVIEWS_SAMPLE_DATA.flatMap((group) =>
        group.reviews.filter((review) => review.targetUserId === userId)
      );

      return HttpResponse.json({
        code: 200,
        message: '받은 리뷰 조회 성공',
        data: receivedReviews,
      });
    }
  ),

  http.get('http://localhost:3000/api/v1/reviews/:userId', ({ params }) => {
    const { userId } = params;

    const received = WRITTEN_REVIEWS_SAMPLE_DATA.flatMap((group) =>
      group.reviews
        .filter((r) => r.targetUserId === userId)
        .map((r) => ({
          reviewId: r.reviewId,
          reviewerId: 'mock-reviewer',
          rating: r.rating,
          content: r.content,
          createdAt: r.createdAt,
        }))
    );

    return HttpResponse.json({
      code: 200,
      message: '받은 간단 리뷰 조회 성공',
      data: received,
    });
  }),
];
