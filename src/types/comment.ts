import { ApiResponse, CursorResponse } from './api';

export interface Comment {
  id: string;
  postId: string;
  author: {
    id: string;
    name: string;
    profileImage: string;
  };
  content: string;
  createdAt: string;
  isReported: boolean;
  isMine: boolean;
  mine: boolean;
  reported: boolean;
}

export type CommentsResponse = ApiResponse<Comment[]> & CursorResponse;
