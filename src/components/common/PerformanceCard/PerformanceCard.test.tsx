import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PerformanceCard from './PerformanceCard';
import { Performance } from '@/types/performance';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock PerformanceCardHeadless
const mockOnCardClick = jest.fn();
const mockOnLikeClick = jest.fn();

jest.mock('@/components/common', () => ({
  PerformanceCardHeadless: {
    Image: ({ className }: { className?: string }) => (
      <div data-testid="performance-image" className={className}>
        Performance Image
      </div>
    ),
    LikeButton: ({ 
      isLiked, 
      icon, 
      className 
    }: { 
      isLiked: boolean; 
      icon: { liked: React.ReactNode; unLiked: React.ReactNode }; 
      className?: string; 
    }) => (
      <button 
        data-testid="like-button" 
        data-liked={isLiked}
        className={className}
      >
        {isLiked ? icon.liked : icon.unLiked}
      </button>
    ),
    Location: ({ className }: { className?: string }) => (
      <div data-testid="performance-location" className={className}>
        Performance Location
      </div>
    ),
    Root: ({ 
      children, 
      onCardClick, 
      onLikeClick, 
      performance, 
      className 
    }: {
      children: React.ReactNode;
      onCardClick: () => void;
      onLikeClick: () => void;
      performance: Performance;
      className?: string;
    }) => (
      <div 
        data-testid="performance-root" 
        className={className}
        onClick={onCardClick}
        data-performance-id={performance.id}
      >
        <button data-testid="like-click-handler" onClick={onLikeClick}>
          Like Handler
        </button>
        {children}
      </div>
    ),
    Title: ({ className }: { className?: string }) => (
      <div data-testid="performance-title" className={className}>
        Performance Title
      </div>
    ),
    Cast: ({ className }: { className?: string }) => (
      <div data-testid="performance-cast" className={className}>
        Performance Cast
      </div>
    ),
  },
  Toast: ({ 
    message, 
    type, 
    onClose, 
    className 
  }: {
    message: string;
    type: string;
    onClose: () => void;
    className?: string;
  }) => (
    <div 
      data-testid="toast" 
      data-type={type}
      className={className}
    >
      {message}
      <button data-testid="toast-close" onClick={onClose}>
        Close
      </button>
    </div>
  ),
}));

// Mock LikeIcon
jest.mock('@/components/icons', () => ({
  LikeIcon: ({ 
    type, 
    className 
  }: { 
    type: string; 
    className?: string; 
  }) => (
    <div 
      data-testid="like-icon" 
      data-type={type}
      className={className}
    >
      Like Icon {type}
    </div>
  ),
}));

// Mock hooks
const mockMutate = jest.fn();
const mockIsLoggedIn = jest.fn();

jest.mock('@/hooks', () => ({
  usePatchPerformanceLiked: () => ({
    mutate: mockMutate,
  }),
}));

jest.mock('@/providers/AuthStoreProvider', () => ({
  useAuthStore: (selector: any) => {
    if (typeof selector === 'function') {
      return selector({ isLoggedIn: mockIsLoggedIn() });
    }
    return { isLoggedIn: mockIsLoggedIn() };
  },
}));

// Mock utils
jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}));

describe('PerformanceCard', () => {
  const mockPerformance: Performance = {
    id: 1,
    title: 'Test Performance',
    location: 'Test Location',
    isLiked: false,
    imageUrl: 'test-image.jpg',
    cast: 'Test Cast',
    startDate: '2023-01-01',
    endDate: '2023-01-31',
    category: 'music',
    genre: 'pop',
  } as Performance;

  const defaultProps = {
    performance: mockPerformance,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockIsLoggedIn.mockReturnValue(true);
  });

  describe('기본 렌더링', () => {
    it('card 타입으로 기본 렌더링된다', () => {
      render(<PerformanceCard {...defaultProps} />);

      expect(screen.getByTestId('performance-root')).toBeInTheDocument();
      expect(screen.getByTestId('performance-image')).toBeInTheDocument();
      expect(screen.getByTestId('performance-title')).toBeInTheDocument();
      expect(screen.getByTestId('performance-location')).toBeInTheDocument();
      expect(screen.getByTestId('like-button')).toBeInTheDocument();
    });

    it('listItem 타입으로 렌더링된다', () => {
      render(<PerformanceCard {...defaultProps} type="listItem" />);

      expect(screen.getByTestId('performance-root')).toBeInTheDocument();
      expect(screen.getByTestId('performance-cast')).toBeInTheDocument();
    });

    it('ranking이 표시된다', () => {
      render(<PerformanceCard {...defaultProps} ranking={1} />);

      expect(screen.getByText('1')).toBeInTheDocument();
    });
  });

  describe('props 테스트', () => {
    it('size="fixed"일 때 올바른 클래스가 적용된다', () => {
      render(<PerformanceCard {...defaultProps} size="fixed" />);

      const root = screen.getByTestId('performance-root');
      expect(root).toHaveClass('w-[150px]');
    });

    it('size="auto"일 때 올바른 클래스가 적용된다', () => {
      render(<PerformanceCard {...defaultProps} size="auto" />);

      const root = screen.getByTestId('performance-root');
      expect(root).toHaveClass('w-full');
    });

    it('type="card"일 때 Card 컴포넌트가 렌더링된다', () => {
      render(<PerformanceCard {...defaultProps} type="card" />);

      const root = screen.getByTestId('performance-root');
      expect(root).toHaveClass('flex-col', 'gap-3');
      expect(screen.queryByTestId('performance-cast')).not.toBeInTheDocument();
    });

    it('type="listItem"일 때 ListItem 컴포넌트가 렌더링된다', () => {
      render(<PerformanceCard {...defaultProps} type="listItem" />);

      const root = screen.getByTestId('performance-root');
      expect(root).toHaveClass('items-center', 'bg-gray-25');
      expect(screen.getByTestId('performance-cast')).toBeInTheDocument();
    });
  });

  describe('좋아요 기능 테스트', () => {
    it('로그인된 상태에서 좋아요 버튼 클릭 시 mutate가 호출된다', () => {
      mockIsLoggedIn.mockReturnValue(true);
      render(<PerformanceCard {...defaultProps} />);

      const likeHandler = screen.getByTestId('like-click-handler');
      fireEvent.click(likeHandler);

      expect(mockMutate).toHaveBeenCalledWith({
        performanceId: mockPerformance.id,
        isLiked: !mockPerformance.isLiked,
      });
    });

    it('로그인되지 않은 상태에서 좋아요 버튼 클릭 시 토스트가 표시된다', async () => {
      mockIsLoggedIn.mockReturnValue(false);
      render(<PerformanceCard {...defaultProps} />);

      const likeHandler = screen.getByTestId('like-click-handler');
      fireEvent.click(likeHandler);

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
        expect(screen.getByText('로그인이 필요합니다!')).toBeInTheDocument();
      });

      expect(mockMutate).not.toHaveBeenCalled();
    });

    it('좋아요 상태에 따라 올바른 아이콘이 표시된다', () => {
      const likedPerformance = { ...mockPerformance, isLiked: true };
      render(<PerformanceCard performance={likedPerformance} />);

      const likeButton = screen.getByTestId('like-button');
      expect(likedPerformance.isLiked).toBe(true);
      expect(likeButton).toHaveAttribute('data-liked', 'true');
    });

    it('좋아요되지 않은 상태에서 올바른 아이콘이 표시된다', () => {
      render(<PerformanceCard {...defaultProps} />);

      const likeButton = screen.getByTestId('like-button');
      expect(likeButton).toHaveAttribute('data-liked', 'false');
    });
  });

  describe('LikeIcon 테스트', () => {
    it('좋아요된 상태에서 active 타입 아이콘이 렌더링된다', () => {
      const likedPerformance = { ...mockPerformance, isLiked: true };
      render(<PerformanceCard performance={likedPerformance} />);

      const activeIcon = screen.getByTestId('like-icon');
      expect(activeIcon).toHaveAttribute('data-type', 'active');
      expect(activeIcon).toHaveClass('h-[30px]', 'w-[30px]', 'hover:opacity-80');
    });

    it('좋아요되지 않은 상태에서 emptyWhite 타입 아이콘이 렌더링된다', () => {
      render(<PerformanceCard {...defaultProps} />);

      const emptyIcon = screen.getByTestId('like-icon');
      expect(emptyIcon).toHaveAttribute('data-type', 'emptyWhite');
      expect(emptyIcon).toHaveClass('h-[30px]', 'w-[30px]', 'hover:opacity-80');
    });
  });

  describe('토스트 기능 테스트', () => {
    it('토스트가 표시된 후 닫기 버튼으로 닫을 수 있다', async () => {
      mockIsLoggedIn.mockReturnValue(false);
      render(<PerformanceCard {...defaultProps} />);

      const likeHandler = screen.getByTestId('like-click-handler');
      fireEvent.click(likeHandler);

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
      });

      const closeButton = screen.getByTestId('toast-close');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
      });
    });

    it('토스트에 올바른 props가 전달된다', async () => {
      mockIsLoggedIn.mockReturnValue(false);
      render(<PerformanceCard {...defaultProps} />);

      const likeHandler = screen.getByTestId('like-click-handler');
      fireEvent.click(likeHandler);

      await waitFor(() => {
        const toast = screen.getByTestId('toast');
        expect(toast).toHaveAttribute('data-type', 'error');
        expect(toast).toHaveClass('bottom-4', 'left-1/2', '-translate-x-1/2');
      });
    });
  });

  describe('네비게이션 테스트', () => {
    it('카드 클릭 시 상세 페이지로 이동한다', () => {
      render(<PerformanceCard {...defaultProps} />);

      const root = screen.getByTestId('performance-root');
      fireEvent.click(root);

      expect(mockPush).toHaveBeenCalledWith(`/performances/${mockPerformance.id}`);
    });

    it('listItem 타입에서도 클릭 시 상세 페이지로 이동한다', () => {
      render(<PerformanceCard {...defaultProps} type="listItem" />);

      const root = screen.getByTestId('performance-root');
      fireEvent.click(root);

      expect(mockPush).toHaveBeenCalledWith(`/performances/${mockPerformance.id}`);
    });
  });

  describe('클래스명 테스트', () => {
    it('Card 타입에서 size에 따른 올바른 클래스가 적용된다', () => {
      const { rerender } = render(
        <PerformanceCard {...defaultProps} type="card" size="fixed" />
      );

      let image = screen.getByTestId('performance-image');
      expect(image).toHaveClass('h-[200px]', 'w-[150px]');

      rerender(<PerformanceCard {...defaultProps} type="card" size="auto" />);

      image = screen.getByTestId('performance-image');
      expect(image).toHaveClass('aspect-[3/4]', 'w-full');
    });

    it('ListItem 타입에서 올바른 레이아웃 클래스가 적용된다', () => {
      render(<PerformanceCard {...defaultProps} type="listItem" />);

      const root = screen.getByTestId('performance-root');
      expect(root).toHaveClass('flex', 'w-full', 'items-center', 'rounded-lg', 'border-0', 'bg-gray-25', 'p-5');
    });

    it('LikeButton에 올바른 클래스가 적용된다', () => {
      render(<PerformanceCard {...defaultProps} />);

      const likeButton = screen.getByTestId('like-button');
      expect(likeButton).toHaveClass(
        'h-fit', 'w-fit', 'cursor-pointer', 'bg-transparent', 'hover:bg-transparent', 'top-2.5', 'right-2.5'
      );
    });
  });

  describe('performance 데이터 전달 테스트', () => {
    it('performance 객체가 Root 컴포넌트에 올바르게 전달된다', () => {
      render(<PerformanceCard {...defaultProps} />);

      const root = screen.getByTestId('performance-root');
      expect(root).toHaveAttribute('data-performance-id', String(mockPerformance.id));
    });

    it('다른 performance 객체로 렌더링할 수 있다', () => {
      const anotherPerformance = {
        ...mockPerformance,
        id: 999,
        isLiked: true,
      };

      render(<PerformanceCard performance={anotherPerformance} />);

      const root = screen.getByTestId('performance-root');
      expect(root).toHaveAttribute('data-performance-id', '999');

      const likeButton = screen.getByTestId('like-button');
      expect(likeButton).toHaveAttribute('data-liked', 'true');
    });
  });

  describe('통합 테스트', () => {
    it('모든 props와 상태가 함께 작동한다', async () => {
      mockIsLoggedIn.mockReturnValue(false);
      const likedPerformance = { ...mockPerformance, isLiked: true };

      render(
        <PerformanceCard 
          performance={likedPerformance}
          ranking={5}
          size="auto"
          type="listItem"
        />
      );

      // 렌더링 확인
      expect(screen.getByTestId('performance-root')).toHaveClass('w-full', 'bg-gray-25');
      expect(screen.getByTestId('performance-cast')).toBeInTheDocument();
      expect(screen.getByTestId('like-button')).toHaveAttribute('data-liked', 'true');

      // 좋아요 클릭 (로그인 안됨)
      const likeHandler = screen.getByTestId('like-click-handler');
      fireEvent.click(likeHandler);

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
      });

      // 카드 클릭
      const root = screen.getByTestId('performance-root');
      fireEvent.click(root);

      expect(mockPush).toHaveBeenCalledWith(`/performances/${likedPerformance.id}`);
    });
  });
});