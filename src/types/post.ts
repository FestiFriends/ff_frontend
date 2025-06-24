import { ApiResponse, CursorResponse } from './api';
import type { Image } from './image';

export interface Post {
  id: string;
  groupId: string;
  content: string;
  isPinned: boolean;
  isReported: boolean;
  imageCount: number;
  images?: Image[];
  author: {
    id: string;
    name: string;
    profileImage?: Image;
  };
  createdAt: string;
  updatedAt?: string;
  commentCount: number;
  reactionCount: number;
  isMine: boolean;
  isReactioned: boolean;
}

export interface GroupPostsResponse {
  groupId: string;
  posts: Post[];
}

export type GroupsPostsResponseType = ApiResponse<{
  groupId: string;
  posts: Post[];
}>
  & CursorResponse;
