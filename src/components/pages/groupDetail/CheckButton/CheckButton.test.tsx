import { render, screen, fireEvent } from '@testing-library/react';
import { Post } from '@/types/post';
import CheckButton from './CheckButton';

describe('CheckButton', () => {
  const mockClick = jest.fn();

  const basePost: Post = {
    id: '1',
    groupId: 'g1',
    author: {
      id: 'u1',
      name: '작성자',
      profileImage: {
        src: '',
        alt: '프로필 이미지',
      },
    },
    content: '내용',
    images: [],
    createdAt: '2025-06-17T12:00:00Z',
    isMine: false,
    isReactioned: false,
    reactionCount: 0,
    isPinned: false,
    isReported: false,
    imageCount: 0,
    commentCount: 0,
  };

  test('isReactioned = false일 때 stroke 아이콘으로 렌더링된다', () => {
    const post = { ...basePost, isReactioned: false, reactionCount: 5 };
    render(
      <CheckButton
        post={post}
        onClick={mockClick}
      />
    );

    expect(screen.getByLabelText('게시글 반응')).toBeInTheDocument();
    expect(screen.getByText('확인 5')).toBeInTheDocument();
  });

  test('isReactioned = true일 때 filled 아이콘으로 렌더링된다', () => {
    const post = {
      ...basePost,
      isReactioned: true,
      reactionCount: 3,
      isPinned: true,
    };
    render(
      <CheckButton
        post={post}
        onClick={mockClick}
      />
    );

    expect(screen.getByLabelText('게시글 반응 취소')).toBeInTheDocument();
    expect(screen.getByText('확인 3')).toBeInTheDocument();
  });

  test('버튼 클릭 시 onClick 핸들러가 호출된다', () => {
    const post = { ...basePost, isReactioned: false, reactionCount: 1 };
    render(
      <CheckButton
        post={post}
        onClick={mockClick}
      />
    );

    const button = screen.getByRole('button', { name: '게시글 반응' });
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
    expect(mockClick).toHaveBeenCalledWith(post);
  });
});
