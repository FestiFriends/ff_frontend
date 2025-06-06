export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data?: T;
}

export interface CursorResponse {
  cursorId?: number; // 다음 페이지 조회용 커서, 더 이상 없으면 undefined
  hasNext: boolean; // 다음 페이지 존재 여부
}

export interface CursorRequest {
  cursorId?: number; // 커서 id (default: 첫번째 요소)
  size?: number; // 한 페이지당 항목 수 (default: 20)
}

export interface PageRequest {
  page?: number;
  size?: number;
}

export interface PageResponse {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}
