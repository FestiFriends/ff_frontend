import { ApiResponse } from './api';
import { Image } from './image';
import { PaginationInfo } from './pagination';

export interface Performance {
  id: string; // 공연 ID
  title: string; // 공연명
  startDate: string; // 공연 시작 날짜 (ISO 8601)
  endDate: string; // 공연 종료 날짜 (ISO 8601)
  location: string; // 공연 장소
  cast: string[]; // 공연 출연진
  crew?: string[]; // 공연 제작진
  runtime?: string; // 공연 런타임
  age?: string; // 관람 연령
  productionCompany?: string[]; // 제작사
  agency?: string[]; // 기획사
  host?: string[]; // 주최
  organizer?: string[]; // 주관
  price: string[]; // 티켓 가격
  poster?: string; // 포스터 이미지 URL
  state: string; // 공연 상태
  visit: string; // 내한 여부
  images?: Image[]; // 소개 이미지 리스트
  time: string[]; // 요일별 공연 시간
  groupCount: number; // 해당 공연의 모임 개수
  favoriteCount: number; // 공연 찜 수
  isLiked: boolean;
}

export type PerformancesResponse = ApiResponse<Performance[]>;

export interface PerformanceIsLikedData {
  performanceId: string;
  isLiked: boolean;
}

export type PerformanceIsLikedResponse = ApiResponse<PerformanceIsLikedData>;
export type PerformanceDetailResponse = ApiResponse<Performance>;

export type PerformancesResponsePagination = ApiResponse<Performance[]>
  & PaginationInfo;
