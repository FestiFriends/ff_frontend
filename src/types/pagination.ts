export interface PaginationInfo {
  page: number; // 페이지 번호 (default: 1)
  size: number; // 한 페이지당 항목 수
  totalElements: number; // 전체 항목 개수
  totalPages: number; // 전체 페이지 수
  first: boolean; // 현재 페이지가 첫 번째 페이지인지 여부
  last: boolean; // 현재 페이지가 마지막 페이지인지 여부
}

export interface PaginatedResponse<T> {
  data: T;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
