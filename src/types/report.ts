import { ApiResponse, PageResponse } from './api';
import { ReportReasonType, ReportStatusType, ReportTargetType } from './enums';
import { Image } from './image';

export interface Report {
  id: string; // 신고 ID
  createdAt: string; // 신고 일시 (ISO 8601)
  category: ReportTargetType; // 신고 유형 (enum)
  reason: ReportReasonType; // 신고 사유 (enum)
  snapshots?: Image[]; // 캡처 이미지 url (선택사항)
  details?: string; // 신고 상세 내용 입력(선택사항, 200자)
  status: ReportStatusType; // 신고 처리 상태 (enum)
}

export interface ReportAction {
  reportStatus: 'APPROVED' | 'REJECTED';
}

export type ReportListResponse = ApiResponse & {
  data: Omit<Report, 'details' | 'snapshots'>[];
} & PageResponse;

export type ReportDetailResponse = ApiResponse & { data: Report };
