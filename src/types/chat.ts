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

export type GetChatHistoryRequest = {
  chatRoomId: number;
} & CursorRequest;

export type GetChatHistoryResponse = ApiResponse<ChatMessage[]>
  & CursorResponse;
