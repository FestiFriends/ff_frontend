import { ApiResponse } from '@/types/api';
import { Post } from '@/types/post';
import { formatPostDate } from '@/utils/date';

export const formatPost = (post: ApiResponse<Post>): Post => {
  if (!post.data) throw new Error('Post data is undefined');

  return {
    id: post.data.id,
    groupId: post.data.groupId,
    content: post.data.content,
    isPinned: post.data.isPinned,
    isReported: post.data.isReported,
    imageCount: post.data.imageCount,
    images: post.data.images,
    author: {
      id: post.data.author.id,
      name: post.data.author.name,
      profileImage: post.data.author.profileImage,
    },
    createdAt: formatPostDate(post.data.createdAt),
    updatedAt: post.data.updatedAt,
    commentCount: post.data.commentCount,
    reactionCount: post.data.reactionCount,
    isMine: post.data.isMine,
    isReactioned: post.data.isReactioned,
  };
};
