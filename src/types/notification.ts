import { ApiResponse, CursorResponse } from './api';

export type NotificationTargetType =
  | null
  | { postId: string; groupId: string }
  | { groupId: string };

export type NotificationType =
  | 'APPLICATION'
  | 'APPLIED'
  | 'POST'
  | 'GROUP'
  | 'SCHEDULE'
  | 'REVIEW'
  | 'MY_PROFILE'
  | 'REJECTED'
  | 'BANNED';

export interface NotificationData {
  id: string; // 알림 ID
  message: string; // 알림 내용
  type: NotificationType;
  target: NotificationTargetType;
  createdAt: string; // 알림 생성 시간 (ISO 8601)
  isRead: boolean;
}

export type GetNotificationsResponse = {
  data: NotificationData[];
} & ApiResponse
  & CursorResponse;

export type GetNewNotificationsCheckResponse = ApiResponse<{
  hasUnread: boolean;
}>;

export interface SseNotificationResponse {
  message: string;
  createdAt: string;
}
