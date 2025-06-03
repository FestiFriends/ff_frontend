import { ApiResponse } from './api';
import { GroupCategoryType, ReviewTagType } from './enums';

export interface RecentReviewsData {
  groupId: string; // 모임 ID
  performance: {
    id: string; // 공연 ID
    title: string; // 공연 이름
    poster: string; // 포스터 이미지 url
  };
  groupTitle: string; // 모임 이름
  category: GroupCategoryType; // 모임 카테고리 종류
  groupStartDate: string; // 모임 시작 날짜 (ISO 8601)
  groupEndDate: string; // 모임 종료 날짜 (ISO 8601)
  reviews: {
    reviewId: string; // 리뷰 ID
    rating: number; // 별점
    content?: string; // 리뷰 추가 입력 내용
    defaultTag: ReviewTagType[]; // ReviewTag (ENUM)
    createdAt: string; // 리뷰 생성 날짜 (ISO 8601)
  }[];
}

export type RecentReviewsResponse = ApiResponse<RecentReviewsData[]>;
