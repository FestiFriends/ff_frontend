import { ApiResponse, CursorResponse } from './api';
import { GroupCategoryType, ReviewTagType } from './enums';

export interface ReviewGroupInfo {
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
}

export interface RecentReviewsData extends ReviewGroupInfo {
  reviews: {
    reviewId: string; // 리뷰 ID
    rating: number; // 별점
    content?: string; // 리뷰 추가 입력 내용
    defaultTag: ReviewTagType[]; // ReviewTag (ENUM)
    createdAt: string; // 리뷰 생성 날짜 (ISO 8601)
  }[];
}

export type RecentReviewsResponse = ApiResponse<RecentReviewsData[]>;

export interface PostReviewRequest {
  groupId: string; // 모임 ID
  targetUserId: string; // 리뷰 대상 사용자 ID
  rating: number; // 별점 (1~5, 0.5단위)
  content?: string; // 직접 작성한 리뷰 내용 (optional)
  defaultTag: ReviewTagType[]; // ReviewTag (ENUM), 선택한 기본 문구 리스트 (optional)
}

export interface WritableReviewsData extends ReviewGroupInfo {
  memberCount: number; // 그룹 인원 수
  reviews: {
    targetUserId: string; // 리뷰 대상 사용자 ID
    targetUserProfileImage: string; // 리뷰 대상 사용자 프로필 이미지
    targetUserName: string; // 리뷰 대상 사용자 이름
  }[];
}

export type WritableReviewsResponse = ApiResponse<WritableReviewsData[]>
  & CursorResponse;

export interface WrittenReviewsData extends ReviewGroupInfo {
  memberCount: number; // 그룹 인원 수
  reviews: {
    reviewId: string; // 리뷰 ID
    targetUserId: string; // 리뷰 대상 사용자 ID
    targetUserName: string; // 리뷰 대상 사용자 이름
    targetUserProfileImage: string; // 리뷰 대상 사용자 프로필 이미지
    rating: number; // 별점
    content?: string; // 리뷰 추가 입력 내용
    defaultTag: ReviewTagType[]; // ReviewTag (ENUM)
    createdAt: string; // 리뷰 생성 날짜 (ISO 8601)
  }[];
}

export type WrittenReviewsResponse = ApiResponse<WrittenReviewsData[]>
  & CursorResponse;
