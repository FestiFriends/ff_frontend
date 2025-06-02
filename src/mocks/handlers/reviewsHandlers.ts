import { http, HttpResponse } from 'msw';
import { ReviewsResponse } from '@/types/reviews';

const RECENT_REVIEWS_SAMPLE_DATA: ReviewsResponse = {
  code: 200,
  message: '최근 올라온 리뷰 top5 조회 성공',
  data: [
    {
      groupId: 'fest-20250421',
      groupTitle: '2025 서울 재즈 페스티벌',
      groupStartDate: '2025-04-21',
      groupEndDate: '2025-04-21',
      reviews: [
        {
          reviewId: 'rev-101',
          rating: 5.0,
          content: '분위기를 너무 잘 즐기셔서 같이 다니는 게 즐거웠어요!',
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
      groupTitle: '5월 한라산 등반 모임',
      groupStartDate: '2025-05-01',
      groupEndDate: '2025-05-02',
      reviews: [
        {
          reviewId: 'rev-103',
          rating: 4.5,
          content: '등산 장비도 잘 챙기시고 책임감이 느껴졌어요.',
          defaultTag: ['RESPONSIVE', 'RECOMMEND'],
          createdAt: '2025-05-03T14:10:00+09:00',
        },
      ],
    },
    {
      groupId: 'cook-20250418',
      groupTitle: '함께 요리하는 쿠킹 클래스',
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
      groupTitle: '봄날의 출사 모임',
      groupStartDate: '2025-04-28',
      groupEndDate: '2025-04-28',
      reviews: [
        {
          reviewId: 'rev-105',
          rating: 4.8,
          content: '사진도 잘 찍어주시고, 시간 약속도 철저했어요.',
          defaultTag: ['PUNCTUAL', 'RECOMMEND'],
          createdAt: '2025-04-29T16:45:00+09:00',
        },
      ],
    },
  ],
};

export const reviewsHandlers = [
  http.get('/api/v1/performances/recent-reviews', () =>
    HttpResponse.json(RECENT_REVIEWS_SAMPLE_DATA)
  ),
];
