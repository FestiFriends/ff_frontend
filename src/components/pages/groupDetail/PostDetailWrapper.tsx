'use client';

import { useParams } from 'next/navigation';
import Header from '@/components/common/Header/Header';
import MessageInput from '@/components/common/MessageInput/MessageInput';
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
      <Header
        title='게시글 상세'
        hasNotification={false}
        hasSearch={false}
      />
      <div className='mb-[89px] flex w-full flex-col px-4'>
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
      />
    </>
  );
};

export default PostDetailWrapper;
