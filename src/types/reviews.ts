import { ApiResponse } from './api';
import { ReviewTagType } from './enums';

export interface ReviewsData {
  groupId: string; // 모임 ID
  groupTitle: string; // 모임 이름
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

export type ReviewsResponse = ApiResponse<ReviewsData[]>;
