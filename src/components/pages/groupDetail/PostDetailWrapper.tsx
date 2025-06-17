'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import SendIcon from '@/components/icons/SendIcon';
import {
  useCreateComment,
  useGetPost,
  useReactionPost,
  useUpdateComment,
} from '@/hooks/postHooks/postHook';
import { hasProfanity } from '@/lib/utils';
import CommentList from './CommentList/CommentList';
import PostCard from './PostCard/PostCard';
import { CheckButton, CommentButton } from '.';

const PostDetailWrapper = () => {
  const params = useParams();
  const groupId = params?.groupId as string;
  const postId = params?.postId as string;
  const [message, setMessage] = useState('');
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [isValidText, setIsValidText] = useState(true);
  const [originalMessage, setOriginalMessage] = useState('');
  const { data: post, isLoading, error } = useGetPost({ groupId, postId });
  const { mutate: reactionPost } = useReactionPost();
  const { mutate: createComment } = useCreateComment();
  const { mutate: updateComment } = useUpdateComment();
  const placeholder = '댓글을 입력해 보세요';
  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error.message}</div>;
  if (!post) return <div>데이터 없음</div>;
  const isEditDisabled = message === originalMessage;

  const handleReaction = () => {
    reactionPost({
      groupId,
      postId,
      hasReactioned: !post.isReactioned,
    });
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setMessage('');
    setOriginalMessage('');
    setIsValidText(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setIsValidText(!hasProfanity(e.target.value));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hasProfanity(message)) {
      setIsValidText(false);
      return;
    }

    createComment({ groupId, postId, content: message });
    setMessage('');
    setIsValidText(true);
  };

  const handleUpdateComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isEditDisabled) {
      return;
    } else if (hasProfanity(message)) {
      setIsValidText(false);
      return;
    }

    updateComment({
      groupId,
      postId,
      commentId: editCommentId as string,
      content: message,
    });
    setEditCommentId(null);
    setMessage('');
    setOriginalMessage('');
  };

  return (
    <>
      <div className='flex w-full flex-col px-4 pb-4'>
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
          setMessage={setMessage}
          setEditCommentId={setEditCommentId}
          setOriginalMessage={setOriginalMessage}
        />
      </div>
      <div className='flex flex-col gap-2.5 border-t border-gray-100 p-4'>
        <div className='flex gap-2.5'>
          {editCommentId && (
            <Button
              className='inline-block'
              size='sm'
              onClick={handleCancelEdit}
            >
              수정 취소
            </Button>
          )}
          {/* TODO: 서경님 메시지 입력 컴포넌트 수정해서 가져오기 */}
          <form
            onSubmit={editCommentId ? handleUpdateComment : handleSubmit}
            className='flex h-11 w-full flex-1 gap-2.5 rounded-[100px] border-1 border-gray-100 bg-gray-25 py-1.5 pr-2 pl-3.5'
          >
            <input
              type='text'
              value={message}
              onChange={handleChange}
              placeholder={placeholder}
              className='flex w-full items-center text-16_M text-gray-950 placeholder:text-16_M placeholder:leading-normal placeholder:tracking-[-0.35px] placeholder:text-gray-400 focus:outline-none'
            />
            <Button
              type='submit'
              variant='primary'
              className='flex w-11 shrink-0 items-center justify-center self-stretch rounded-[100px] px-3 py-1.5'
            >
              <SendIcon className='aspect-square h-4 w-4 shrink-0' />
            </Button>
          </form>
        </div>
        {!isValidText && (
          <p className='pl-2 text-12_M text-red-500'>
            부적절한 단어가 포함되어 있습니다
          </p>
        )}
      </div>
    </>
  );
};

export default PostDetailWrapper;
