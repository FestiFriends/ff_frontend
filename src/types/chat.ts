import { ApiResponse, CursorRequest, CursorResponse } from './api';

export interface ChatMessage {
  chatId: string;
  senderId: string;
  senderName: string;
  senderImage: {
    id: string;
    src: string;
    alt: string;
  };
  content: string;
  createdAt: string;
  isMine: boolean;
}

export interface ChatMessageRequest {
  chatRoomId: string;
  cursorId?: number;
  size?: number;
}

export type ChatMessageResponse = {
  chatId: string;
  senderId: string;
  senderName: string;
  senderImage: string | null;
  content: string;
};

export type GetChatMessageListRequest = {
  chatRoomId: string;
} & CursorRequest;

export type GetChatMessageListResponse = ApiResponse<ChatMessage[]>
  & CursorResponse;
