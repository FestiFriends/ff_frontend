'use client';

import { useParams, useRouter } from 'next/navigation';
import DetailHeader from '@/components/common/DetailHeader/DetailHeader';
import MessageInput from '@/components/common/MessageInput/MessageInput';
import BackIcon from '@/components/icons/BackIcon';
import {
  useCreateComment,
  useGetPost,
  useReactionPost,
} from '@/hooks/postHooks/postHook';
import CommentList from './CommentList/CommentList';
import PostCard from './PostCard/PostCard';
import { CheckButton, CommentButton } from '.';

const PostDetailWrapper = () => {
  const params = useParams();
  const groupId = params?.groupId as string;
  const postId = params?.postId as string;
  const { data: post, isLoading, error } = useGetPost({ groupId, postId });
  const { mutate: reactionPost } = useReactionPost();
  const { mutate: createComment } = useCreateComment();
  const router = useRouter();
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;
  if (!post) return <div>데이터 없음</div>;
  const handleReaction = () => {
    reactionPost({
      groupId,
      postId,
      hasReactioned: !post.isReactioned,
    });
  };

  const handleSubmit = (message: string) => {
    createComment({ groupId, postId, content: message });
  };

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
        <CommentList />
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
