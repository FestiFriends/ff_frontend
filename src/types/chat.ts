import { ApiResponse, CursorRequest, CursorResponse } from './api';

export interface ChatMessage {
  chatId: number;
  senderId: number;
  senderName: string;
  senderImage?: {
    id: number;
    src: string;
    alt: string;
  };
  content: string;
  createdAt: string;
  isMine?: boolean;
}

export interface ChatMessageRequest {
  chatRoomId: string;
  cursorId?: number;
  size?: number;
}

export type GetChatMessageListRequest = {
  chatRoomId: number;
} & CursorRequest;

export type GetChatMessageListResponse = ApiResponse<ChatMessage[]>
  & CursorResponse;
