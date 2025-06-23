'use client';

import { useParams, useRouter } from 'next/navigation';
import DetailHeader from '@/components/common/DetailHeader/DetailHeader';
import MessageInput from '@/components/common/MessageInput/MessageInput';
import BackIcon from '@/components/icons/BackIcon';
import {
  useCreateComment,
  useGetComments,
  useGetPost,
  useReactionPost,
} from '@/hooks/postHooks/postHook';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import { Comment } from '@/types/comment';
import CommentList from './CommentList/CommentList';
import CommentsSkeleton from './CommentsSkeleton';
import PostCard from './PostCard/PostCard';
import PostSkeleton from './PostSkeleton';
import { CheckButton, CommentButton } from '.';

const PostDetailWrapper = () => {
  const router = useRouter();
  const params = useParams();
  const groupId = params?.groupId as string;
  const postId = params?.postId as string;
  const {
    data: post,
    isPending: isPostPending,
    error: postError,
    isError: isPostError,
  } = useGetPost({ groupId, postId });
  const { mutate: reactionPost } = useReactionPost();
  const { mutate: createComment } = useCreateComment();
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isCommentsPending,
    error: commentsError,
  } = useGetComments({ groupId, postId });
  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );
  const commentsData = comments?.pages?.flatMap(
    (page) => (page.data as unknown as Comment[]) || []
  );
  const isPending = isPostPending && isCommentsPending;

  const handleReaction = () => {
    reactionPost({
      groupId,
      postId,
      hasReactioned: !post?.isReactioned,
    });
  };

  const handleSubmit = (message: string) => {
    createComment({ groupId, postId, content: message });
  };

  if (isPending || !post)
    return (
      <div className='h-screen'>
        {/* <div className='flex h-screen w-full flex-col items-center justify-center'> */}
        <DetailHeader
          title='상세보기'
          hasLeftIcon={<BackIcon />}
          onLeftClick={() => router.back()}
        />
        <div className='flex flex-col items-center gap-5 px-4 pt-[68px]'>
          <PostSkeleton />
        </div>
        <MessageInput
          type='comment'
          sendMessage={handleSubmit}
          maxLength={150}
          className='fixed bottom-0'
        />
      </div>
    );
  if (isPostError) return <div>{postError?.message}</div>;

  return (
    <>
      <DetailHeader
        title='상세보기'
        hasLeftIcon={<BackIcon />}
        onLeftClick={() => router.back()}
      />
      <div className='scrollbar-hide flex h-screen w-full flex-col overflow-auto px-4 pt-11 pb-[89px]'>
        <PostCard
          post={post}
          type='detail'
        >
          <CheckButton
            post={post}
            onClick={handleReaction}
          />
          <CommentButton commentCount={post.commentCount} />
        </PostCard>
        <CommentList
          comments={commentsData ?? []}
          error={commentsError || null}
        />
        {hasNextPage && (
          <>
            {isFetchingNextPage && <CommentsSkeleton />}
            <div
              ref={bottomRef}
              className='h-10'
            />
          </>
        )}
      </div>
      <MessageInput
        type='comment'
        sendMessage={handleSubmit}
        maxLength={150}
        className='fixed bottom-0'
      />
    </>
  );
};

export default PostDetailWrapper;
