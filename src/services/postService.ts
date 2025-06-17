import apiFetcher from '@/lib/apiFetcher';
import { ApiResponse } from '@/types/api';
import { CommentsResponse } from '@/types/comment';
import { Post } from '@/types/post';
import { formatPost } from '@/utils/formatPostCard';

export const postApi = {
  getPost: async ({
    groupId,
    postId,
  }: {
    groupId: string;
    postId: string;
  }): Promise<Post> => {
    const res = await apiFetcher.get<ApiResponse<Post>>(
      `/api/v1/groups/${groupId}/posts/${postId}`
    );
    return formatPost(res.data);
  },

  pinPost: async ({
    groupId,
    postId,
    isPinned,
  }: {
    groupId: string;
    postId: string;
    isPinned: boolean;
  }): Promise<ApiResponse> => {
    const res = await apiFetcher.patch<ApiResponse>(
      `/api/v1/groups/${groupId}/posts/${postId}/pinned`,
      {
        isPinned,
      }
    );

    return res.data;
  },

  reactionPost: async ({
    groupId,
    postId,
    hasReactioned,
  }: {
    groupId: string;
    postId: string;
    hasReactioned: boolean;
  }): Promise<ApiResponse> => {
    const res = await apiFetcher.patch<ApiResponse>(
      `/api/v1/groups/${groupId}/posts/${postId}/reaction`,
      {
        hasReactioned,
      }
    );

    return res.data;
  },

  createPost: async ({
    groupId,
    content,
    isPinned = false,
    images = [],
  }: {
    groupId: string;
    content: string;
    isPinned?: boolean;
    images?: { alt: string; src: string }[];
  }): Promise<ApiResponse> => {
    const res = await apiFetcher.post<ApiResponse>(
      `/api/v1/groups/${groupId}/posts`,
      {
        content,
        isPinned,
        images,
      }
    );
    return res.data;
  },

  updatePost: async ({
    groupId,
    postId,
    content,
    isPinned = false,
    images = [],
  }: {
    groupId: string;
    postId: string;
    content: string;
    isPinned?: boolean;
    images?: { alt: string; src: string }[];
  }): Promise<ApiResponse> => {
    const res = await apiFetcher.patch<ApiResponse>(
      `/api/v1/groups/${groupId}/posts/${postId}`,
      {
        content,
        isPinned,
        images,
      }
    );
    return res.data;
  },

  deletePost: async ({
    groupId,
    postId,
  }: {
    groupId: string;
    postId: string;
  }): Promise<ApiResponse> => {
    const res = await apiFetcher.delete<ApiResponse>(
      `/api/v1/groups/${groupId}/posts/${postId}`
    );
    return res.data;
  },

  getComments: async ({
    groupId,
    postId,
  }: {
    groupId: string;
    postId: string;
  }): Promise<CommentsResponse> => {
    const res = await apiFetcher.get<CommentsResponse>(
      `/api/v1/groups/${groupId}/posts/${postId}/comments`
    );
    return res.data;
  },

  createComment: async ({
    groupId,
    postId,
    content,
  }: {
    groupId: string;
    postId: string;
    content: string;
  }): Promise<ApiResponse> => {
    const res = await apiFetcher.post<ApiResponse>(
      `/api/v1/groups/${groupId}/posts/${postId}/comments`,
      {
        content,
      }
    );

    return res.data;
  },

  updateComment: async ({
    groupId,
    postId,
    commentId,
    content,
  }: {
    groupId: string;
    postId: string;
    commentId: string;
    content: string;
  }): Promise<ApiResponse> => {
    const res = await apiFetcher.put<ApiResponse>(
      `/api/v1/groups/${groupId}/posts/${postId}/comments/${commentId}`,
      {
        content,
      }
    );

    return res.data;
  },

  deleteComment: async ({
    groupId,
    postId,
    commentId,
  }: {
    groupId: string;
    postId: string;
    commentId: string;
  }): Promise<ApiResponse> => {
    const res = await apiFetcher.delete<ApiResponse>(
      `/api/v1/groups/${groupId}/posts/${postId}/comments/${commentId}`
    );

    return res.data;
  },
};
