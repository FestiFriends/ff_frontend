import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { formatPostDate } from '@/utils/date';
import PostCard from './PostCard';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
}));

jest.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries: jest.fn(),
    setQueryData: jest.fn(),
    getQueryData: jest.fn(),
  }),
  useMutation: () => ({
    mutate: jest.fn(),
    mutateAsync: jest.fn(),
    isLoading: false,
    isError: false,
    isSuccess: false,
    error: null,
    data: null,
  }),
}));

jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children, ...props }: { children: ReactNode }) => (
    <div
      data-testid='post-carousel'
      {...props}
    >
      {children}
    </div>
  ),
  CarouselContent: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  CarouselItem: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
  CarouselNext: () => <button>Next</button>,
  CarouselPrevious: () => <button>Prev</button>,
}));

const mockPost1 = {
  id: 'post1',
  groupId: 'group1',
  content: '테스트 게시글입니다.',
  isPinned: true,
  isReported: false,
  imageCount: 1,
  images: [
    {
      id: 'img1',
      src: '/test-image.jpg',
      alt: '테스트 이미지',
    },
  ],
  author: {
    id: 'user1',
    name: '테스터',
    profileImage: {
      src: '/profile.jpg',
      alt: '프로필 이미지',
    },
  },
  createdAt: formatPostDate('2025-06-01T15:30:00'),
  commentCount: 3,
  reactionCount: 5,
  isMine: true,
  isReactioned: false,
};

const mockPost2 = {
  id: 'post2',
  groupId: 'group2',
  content: '테스트 게시글입니다.',
  isPinned: false,
  isReported: false,
  imageCount: 3,
  images: [
    {
      id: 'img1',
      src: '/test-image1.jpg',
      alt: '테스트 이미지1',
    },
    {
      id: 'img2',
      src: '/test-image2.jpg',
      alt: '테스트 이미지2',
    },
    {
      id: 'img3',
      src: '/test-image3.jpg',
      alt: '테스트 이미지3',
    },
  ],
  author: {
    id: 'user2',
    name: '테스터',
    profileImage: {
      src: '/profile.jpg',
      alt: '프로필 이미지',
    },
  },
  createdAt: formatPostDate('2025-06-01T15:30:00'),
  commentCount: 3,
  reactionCount: 5,
  isMine: false,
  isReactioned: true,
};

describe('PostCard 테스트', () => {
  test('작성자 닉네임과 작성일이 올바르게 표시된다', () => {
    render(<PostCard post={mockPost1}>반응, 댓글 버튼</PostCard>);
    expect(screen.getByText('테스터')).toBeInTheDocument();
    expect(screen.getByText('6월 1일 오후 03:30')).toBeInTheDocument();
  });

  test('MoreDropdown 컴포넌트가 정상적으로 렌더링 된다', () => {
    render(<PostCard post={mockPost1}>반응, 댓글 버튼</PostCard>);
    expect(screen.getByLabelText('더보기 메뉴')).toBeInTheDocument();
  });

  test('게시글 내용이 올바르게 렌더링된다', () => {
    render(<PostCard post={mockPost1}>반응, 댓글 버튼</PostCard>);
    expect(screen.getByText('테스트 게시글입니다.')).toBeInTheDocument();
  });

  test('children 영역이 정상적으로 렌더링된다', () => {
    render(<PostCard post={mockPost1}>반응, 댓글 버튼</PostCard>);
    expect(screen.getByText('반응, 댓글 버튼')).toBeInTheDocument();
  });

  test('post1: isPinned = true이면 공지가 출력된다', () => {
    render(<PostCard post={mockPost1}>반응, 댓글 버튼</PostCard>);
    expect(screen.getByText('· 공지')).toBeInTheDocument();
  });

  test('post2: isPinned = false면 공지가 출력되지 않는다', () => {
    render(<PostCard post={mockPost2}>반응, 댓글 버튼</PostCard>);
    expect(screen.queryByText('· 공지')).not.toBeInTheDocument();
  });

  test('post1: 이미지가 1개일 경우 1개만 렌더링된다', () => {
    render(<PostCard post={mockPost1}>반응, 댓글 버튼</PostCard>);
    expect(screen.getByAltText('테스트 이미지')).toBeInTheDocument();
  });

  test('post2: 이미지가 2개 이상일 경우 Carousel 내부 이미지가 모두 렌더링된다', () => {
    render(<PostCard post={mockPost2}>반응, 댓글 버튼</PostCard>);

    const carousel = screen.getByTestId('carousel');
    const imagesInCarousel = carousel.querySelectorAll('img');

    expect(imagesInCarousel).toHaveLength(3);
  });
});
