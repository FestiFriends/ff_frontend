import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import FabButton from '@/components/common/FabButton/FabButton';
import StateNotice from '@/components/common/StateNotice/StateNotice';
import EditIcon from '@/components/icons/EditIcon';
import { useGetGroupPosts } from '@/hooks/groupHooks/groupHooks';
import { useReactionPost } from '@/hooks/postHooks/postHook';
import { renderErrorNotice } from '@/hooks/useErrorNoticePreset/useErrorNoticePreset';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import { Post } from '@/types/post';
import PostCard from './PostCard/PostCard';
import PostNotice from './PostNotice/PostNotice';
import PostsSkeleton from './PostsSkeleton';
import { CheckButton, CommentButton } from '.';

const GroupPosts = () => {
  const router = useRouter();
  const params = useParams();
  const groupId = params?.groupId as string;
  const [pinnedPost, setPinnedPost] = useState<Post | null>(null);

  const {
    data: posts,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
    error,
  } = useGetGroupPosts({ groupId });
  const { mutate: reactionPost } = useReactionPost();

  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  useEffect(() => {
    if (posts?.pages) {
      const pinned = posts.pages
        .flatMap((page) => page.data?.posts || [])
        .find((post) => post.isPinned);
      setPinnedPost(pinned || null);
    }
  }, [posts?.pages]);

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

  if (isPending && !posts)
    return (
      <div className='px-4'>
        <PostsSkeleton />
      </div>
    );

  if (error) return <div>{renderErrorNotice(error, '100%')}</div>;

  if (posts?.pages?.flatMap((page) => page.data?.posts || []).length === 0)
    return (
      <div className='flex h-full items-center justify-center py-20'>
        <StateNotice
          height='100%'
          preset='postsEmpty'
        />
        <FabButton
          onClick={() => router.push(`/groups/${groupId}/posts/create`)}
          icon={<EditIcon />}
          actionLabel='게시글 작성'
        />
      </div>
    );

  return (
    <div className='flex w-full flex-col gap-5 px-4 pt-5 pb-4'>
      <PostNotice pinnedPost={pinnedPost} />
      {posts?.pages
        .flatMap((page) => page.data?.posts || [])
        .map((post: Post) => (
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
      {hasNextPage && (
        <>
          {isFetchingNextPage && <PostsSkeleton />}
          <div
            ref={bottomRef}
            className='h-10'
          />
        </>
      )}
      <FabButton
        onClick={() => router.push(`/groups/${groupId}/posts/create`)}
        icon={<EditIcon />}
        actionLabel='게시글 작성'
      />
    </div>
  );
};

export default GroupPosts;
