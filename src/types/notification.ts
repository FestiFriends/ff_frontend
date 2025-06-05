import { ApiResponse, CursorResponse } from './api';

export interface NotificationData {
  id: string; // 알림 ID
  message: string; // 알림 내용
  createdAt: string; // 알림 생성 시간 (ISO 8601)
}

export type GetNotificationsResponse = ApiResponse<NotificationData[]>
  & CursorResponse;
