import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { GROUP_QUERY_KEYS, POSTS_QUERY_KEYS } from '@/constants/queryKeys';
import { postApi } from '@/services/postService';
import { Post } from '@/types/post';

export const useGetPost = ({
  groupId,
  postId,
}: {
  groupId: string;
  postId: string;
}) =>
  useQuery<Post>({
    queryKey: [POSTS_QUERY_KEYS.postDetail, groupId, postId],
    queryFn: async () => {
      const res = await postApi.getPost({ groupId, postId });
      return res;
    },
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      content,
      isPinned,
      images,
    }: {
      groupId: string;
      content: string;
      isPinned: boolean;
      images: { alt: string; src: string }[];
    }) => postApi.createPost({ groupId, content, isPinned, images }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.groupPosts, String(variables.groupId)],
      });
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.groupPosts],
      });
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.postDetail],
      });
    },
  });
};

export const usePinPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      postId,
      isPinned,
    }: {
      groupId: string;
      postId: string;
      isPinned: boolean;
    }) => postApi.pinPost({ groupId, postId, isPinned }),

    onSuccess: (_data, variables) => {
      console.log('onSuccess', variables);
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.groupPosts, String(variables.groupId)],
      });
      queryClient.invalidateQueries({
        queryKey: [
          POSTS_QUERY_KEYS.postDetail,
          String(variables.groupId),
          String(variables.postId),
        ],
      });
    },
  });
};

export const useReactionPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      postId,
      hasReactioned,
    }: {
      groupId: string;
      postId: string;
      hasReactioned: boolean;
    }) => postApi.reactionPost({ groupId, postId, hasReactioned }),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.groupPosts, String(variables.groupId)],
      });
      queryClient.invalidateQueries({
        queryKey: [
          POSTS_QUERY_KEYS.postDetail,
          String(variables.groupId),
          String(variables.postId),
        ],
      });
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      postId,
      content,
      isPinned,
      images,
    }: {
      groupId: string;
      postId: string;
      content: string;
      isPinned: boolean;
      images: { alt: string; src: string }[];
    }) => postApi.updatePost({ groupId, postId, content, isPinned, images }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.groupPosts, String(variables.groupId)],
      });
      queryClient.invalidateQueries({
        queryKey: [
          POSTS_QUERY_KEYS.postDetail,
          String(variables.groupId),
          String(variables.postId),
        ],
      });
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ groupId, postId }: { groupId: string; postId: string }) =>
      postApi.deletePost({ groupId, postId }),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.groupPosts, String(variables.groupId)],
      });
      queryClient.invalidateQueries({
        queryKey: [GROUP_QUERY_KEYS.groupPosts],
      });
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.postDetail],
      });
    },
  });
};

export const useGetComments = ({
  groupId,
  postId,
}: {
  groupId: string;
  postId: string;
}) => {
  const size = 20;
  return useInfiniteQuery({
    queryKey: [POSTS_QUERY_KEYS.comments, groupId, postId],
    queryFn: async ({ pageParam }) => {
      const res = await postApi.getComments({
        groupId,
        postId,
        cursorId: pageParam,
        size,
      });
      return res;
    },
    getNextPageParam: (lastPage) =>
      lastPage.hasNext && lastPage.cursorId ? lastPage.cursorId : undefined,
    initialPageParam: 0,
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      postId,
      content,
    }: {
      groupId: string;
      postId: string;
      content: string;
    }) => postApi.createComment({ groupId, postId, content }),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          POSTS_QUERY_KEYS.postDetail,
          String(variables.groupId),
          String(variables.postId),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.comments, String(variables.groupId)],
      });
    },
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      postId,
      commentId,
      content,
    }: {
      groupId: string;
      postId: string;
      commentId: string;
      content: string;
    }) => postApi.updateComment({ groupId, postId, commentId, content }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [
          POSTS_QUERY_KEYS.postDetail,
          String(variables.groupId),
          String(variables.postId),
        ],
      });
      queryClient.invalidateQueries({
        queryKey: [
          POSTS_QUERY_KEYS.comments,
          String(variables.groupId),
          String(variables.postId),
        ],
      });
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      postId,
      commentId,
    }: {
      groupId: string;
      postId: string;
      commentId: string;
    }) => postApi.deleteComment({ groupId, postId, commentId }),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.postDetail],
      });
      queryClient.invalidateQueries({
        queryKey: [POSTS_QUERY_KEYS.comments],
      });
    },
  });
};
