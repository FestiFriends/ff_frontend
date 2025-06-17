'use client';

import { useParams, useRouter } from 'next/navigation';
import { useGetGroupPosts } from '@/hooks/groupHooks/groupHooks';
import { useReactionPost } from '@/hooks/postHooks/postHook';
import { Post } from '@/types/post';
import PostCard from './PostCard/PostCard';
import { CheckButton, CommentButton } from '.';

const GroupWrapper = () => {
  const router = useRouter();
  const params = useParams();
  const groupId = params?.groupId as string;

  const { data: posts, isPending, error } = useGetGroupPosts({ groupId });
  const { mutate: reactionPost } = useReactionPost();

  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;
  if (!posts?.posts) return <div>데이터 없음</div>;

  const handleReaction = (post: Post) => {
    reactionPost({
      groupId,
      postId: post.id,
      hasReactioned: !post.isReactioned,
    });
  };

  const handlePostClick = (post: Post) => {
    router.push(`/groups/${groupId}/posts/${post.id}`);
  };

  return (
    <div className='flex w-full flex-col px-4 pb-4'>
      {posts.posts.map((post: Post) => (
        <PostCard
          key={post.id}
          post={post}
          type='posts'
        >
          <CheckButton
            post={post}
            onClick={handleReaction}
          />
          <CommentButton
            commentCount={post.commentCount}
            onClick={() => handlePostClick(post)}
          />
        </PostCard>
      ))}
    </div>
  );
};

export default GroupWrapper;
