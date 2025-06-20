import { useParams, useRouter } from 'next/navigation';
import FabButton from '@/components/common/FabButton/FabButton';
import EditIcon from '@/components/icons/EditIcon';
import { useGetGroupPosts } from '@/hooks/groupHooks/groupHooks';
import { useReactionPost } from '@/hooks/postHooks/postHook';
import { Post } from '@/types/post';
import PostCard from './PostCard/PostCard';
import PostNotice from './PostNotice/PostNotice';
import { CheckButton, CommentButton } from '.';

const GroupPosts = () => {
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
    <div className='flex w-full flex-col gap-5 px-4 pt-5 pb-4'>
      <PostNotice />
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
      <FabButton
        onClick={() => router.push(`/groups/${groupId}/posts/create`)}
        icon={<EditIcon />}
        actionLabel='게시글 작성'
      />
    </div>
  );
};

export default GroupPosts;
