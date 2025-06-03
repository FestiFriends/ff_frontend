import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Performance } from '@/types/performance';
import { PerformanceCard } from './PerformanceCard';
import { PERFORMANCE_CARD_MESSAGES } from './PerformanceCard.messages';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
    className?: string;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={props.src}
      alt={props.alt}
      className={props.className}
    />
  ),
}));

// 현재 진행중인 공연으로 설정 (현재 날짜 포함)
const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const futureDate = new Date(today);
futureDate.setMonth(today.getMonth() + 2); // 2개월 후 종료

const mockPerformance: Performance = {
  id: '1',
  title: '레미제라블',
  startDate: yesterday.toISOString(),
  endDate: futureDate.toISOString(),
  location: '블루스퀘어 신한카드홀',
  cast: ['홍광호', '김소향', '정성화'],
  price: ['77000', '99000', '121000'],
  poster: '/images/les-miserables-poster.jpg',
  state: 'available',
  visit: 'domestic',
  time: ['19:30', '14:00'],
};

describe('PerformanceCard', () => {
  describe('Root Component', () => {
    it('기본 렌더링이 정상적으로 동작한다', () => {
      render(
        <PerformanceCard.Root performance={mockPerformance}>
          <div>Test Content</div>
        </PerformanceCard.Root>
      );

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    describe('Messages Integration', () => {
      it('메시지 객체가 export되어 접근 가능하다', () => {
        expect(PERFORMANCE_CARD_MESSAGES).toBeDefined();
        expect(PERFORMANCE_CARD_MESSAGES.CONTEXT_ERROR).toBe(
          PERFORMANCE_CARD_MESSAGES.CONTEXT_ERROR
        );
      });

      it('함수형 메시지가 올바르게 동작한다', () => {
        const title = '레미제라블';
        expect(PERFORMANCE_CARD_MESSAGES.CARD_DETAIL_LABEL(title)).toBe(
          `${title} 공연 상세 보기`
        );
        expect(PERFORMANCE_CARD_MESSAGES.POSTER_ALT(title)).toBe(
          `${title} 포스터`
        );
      });

      it('메시지를 외부에서 직접 참조할 수 있다', () => {
        expect(typeof PERFORMANCE_CARD_MESSAGES.LIKE_TEXT).toBe('string');
        expect(typeof PERFORMANCE_CARD_MESSAGES.UNLIKE_TEXT).toBe('string');
      });
    });

    it('onCardClick이 전달되면 클릭 이벤트가 동작한다', async () => {
      const user = userEvent.setup();
      const mockOnCardClick = jest.fn();

      render(
        <PerformanceCard.Root
          performance={mockPerformance}
          onCardClick={mockOnCardClick}
        >
          <div>Clickable Content</div>
        </PerformanceCard.Root>
      );

      const cardElement = screen.getByRole('button');
      await user.click(cardElement);

      expect(mockOnCardClick).toHaveBeenCalledWith(mockPerformance);
    });

    it('onCardClick이 전달되면 키보드 이벤트가 동작한다', () => {
      const mockOnCardClick = jest.fn();

      render(
        <PerformanceCard.Root
          performance={mockPerformance}
          onCardClick={mockOnCardClick}
        >
          <div>Keyboard Accessible</div>
        </PerformanceCard.Root>
      );

      const cardElement = screen.getByRole('button');
      fireEvent.keyDown(cardElement, { key: 'Enter' });
      expect(mockOnCardClick).toHaveBeenCalledWith(mockPerformance);

      fireEvent.keyDown(cardElement, { key: ' ' });
      expect(mockOnCardClick).toHaveBeenCalledTimes(2);
    });

    it('onCardClick이 없으면 button role이 없다', () => {
      render(
        <PerformanceCard.Root performance={mockPerformance}>
          <div>Non-clickable Content</div>
        </PerformanceCard.Root>
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });
  });

  describe('Individual Components', () => {
    const renderWithContext = (children: React.ReactNode) =>
      render(
        <PerformanceCard.Root performance={mockPerformance}>
          {children}
        </PerformanceCard.Root>
      );

    it('Title 컴포넌트가 제목을 렌더링한다', () => {
      renderWithContext(<PerformanceCard.Title />);
      expect(screen.getByText('레미제라블')).toBeInTheDocument();
    });

    it('Title 컴포넌트에 custom children을 전달할 수 있다', () => {
      renderWithContext(
        <PerformanceCard.Title>커스텀 제목</PerformanceCard.Title>
      );
      expect(screen.getByText('커스텀 제목')).toBeInTheDocument();
    });

    it('Status 컴포넌트가 상태를 렌더링한다', () => {
      renderWithContext(<PerformanceCard.Status />);
      expect(screen.getByText('공연 중')).toBeInTheDocument();
    });

    it('DateRange 컴포넌트가 날짜를 렌더링한다', () => {
      renderWithContext(<PerformanceCard.DateRange />);
      const currentYear = new Date().getFullYear();
      const dateRangeElement = screen.getByText(new RegExp(`${currentYear}`));
      expect(dateRangeElement).toBeInTheDocument();
    });

    it('Location 컴포넌트가 장소를 렌더링한다', () => {
      renderWithContext(<PerformanceCard.Location />);
      expect(screen.getByText('블루스퀘어 신한카드홀')).toBeInTheDocument();
    });

    it('Cast 컴포넌트가 출연진을 렌더링한다', () => {
      renderWithContext(<PerformanceCard.Cast />);
      expect(screen.getByText('홍광호, 김소향 외 1명')).toBeInTheDocument();
    });

    it('Price 컴포넌트가 가격을 렌더링한다', () => {
      renderWithContext(<PerformanceCard.Price />);
      expect(screen.getByText('77,000원 - 121,000원')).toBeInTheDocument();
    });

    it('Image 컴포넌트가 이미지를 렌더링한다', () => {
      renderWithContext(<PerformanceCard.Image />);
      const image = screen.getByAltText(
        PERFORMANCE_CARD_MESSAGES.POSTER_ALT('레미제라블')
      );
      expect(image).toBeInTheDocument();
      expect(image.getAttribute('src')).toContain(
        '/images/les-miserables-poster.jpg'
      );
    });

    it('Image 컴포넌트가 fallback을 렌더링한다', () => {
      const performanceWithoutImage = { ...mockPerformance, poster: '' };
      render(
        <PerformanceCard.Root performance={performanceWithoutImage}>
          <PerformanceCard.Image />
        </PerformanceCard.Root>
      );
      expect(
        screen.getByText(PERFORMANCE_CARD_MESSAGES.NO_IMAGE_FALLBACK)
      ).toBeInTheDocument();
    });

    it('Image 컴포넌트에 custom fallback을 전달할 수 있다', () => {
      const performanceWithoutImage = { ...mockPerformance, poster: '' };
      render(
        <PerformanceCard.Root performance={performanceWithoutImage}>
          <PerformanceCard.Image fallback={<div>커스텀 Fallback</div>} />
        </PerformanceCard.Root>
      );
      expect(screen.getByText('커스텀 Fallback')).toBeInTheDocument();
    });
  });

  describe('LikeButton Component', () => {
    const renderLikeButtonWithContext = (
      props: Parameters<typeof PerformanceCard.LikeButton>[0] = {}
    ) => {
      const mockOnLikeClick = jest.fn();
      return {
        mockOnLikeClick,
        ...render(
          <PerformanceCard.Root
            performance={mockPerformance}
            onLikeClick={mockOnLikeClick}
          >
            <PerformanceCard.LikeButton {...props} />
          </PerformanceCard.Root>
        ),
      };
    };

    it('좋아요 버튼이 렌더링된다', () => {
      renderLikeButtonWithContext();
      const likeButton = screen.getByRole('button', {
        name: PERFORMANCE_CARD_MESSAGES.LIKE_BUTTON_LABEL,
      });
      expect(likeButton).toBeInTheDocument();
    });

    it('좋아요 버튼 클릭이 동작한다', async () => {
      const user = userEvent.setup();
      const { mockOnLikeClick } = renderLikeButtonWithContext({
        isLiked: false,
      });

      const likeButton = screen.getByRole('button', {
        name: PERFORMANCE_CARD_MESSAGES.LIKE_BUTTON_LABEL,
      });
      await user.click(likeButton);

      expect(mockOnLikeClick).toHaveBeenCalledWith(mockPerformance, true);
    });

    it('좋아요 취소 버튼 클릭이 동작한다', async () => {
      const user = userEvent.setup();
      const { mockOnLikeClick } = renderLikeButtonWithContext({
        isLiked: true,
      });

      const likeButton = screen.getByRole('button', {
        name: PERFORMANCE_CARD_MESSAGES.UNLIKE_BUTTON_LABEL,
      });
      await user.click(likeButton);

      expect(mockOnLikeClick).toHaveBeenCalledWith(mockPerformance, false);
    });

    it('좋아요 버튼 클릭 시 이벤트 전파가 중단된다', async () => {
      const user = userEvent.setup();
      const mockOnCardClick = jest.fn();
      const mockOnLikeClick = jest.fn();

      render(
        <PerformanceCard.Root
          performance={mockPerformance}
          onCardClick={mockOnCardClick}
          onLikeClick={mockOnLikeClick}
        >
          <PerformanceCard.LikeButton />
        </PerformanceCard.Root>
      );

      const likeButton = screen.getByRole('button', {
        name: PERFORMANCE_CARD_MESSAGES.LIKE_BUTTON_LABEL,
      });
      await user.click(likeButton);

      expect(mockOnLikeClick).toHaveBeenCalled();
      expect(mockOnCardClick).not.toHaveBeenCalled();
    });

    it('onLikeClick이 없으면 좋아요 버튼이 렌더링되지 않는다', () => {
      render(
        <PerformanceCard.Root performance={mockPerformance}>
          <PerformanceCard.LikeButton />
        </PerformanceCard.Root>
      );

      expect(screen.queryByRole('button')).not.toBeInTheDocument();
    });

    it('showText가 true이면 텍스트가 표시된다', () => {
      renderLikeButtonWithContext({ showText: true });
      expect(
        screen.getByText(PERFORMANCE_CARD_MESSAGES.LIKE_TEXT)
      ).toBeInTheDocument();
    });

    it('커스텀 아이콘을 설정할 수 있다', () => {
      renderLikeButtonWithContext({
        icon: { liked: '💖', unliked: '🖤' },
        isLiked: false,
      });
      expect(screen.getByText('🖤')).toBeInTheDocument();
    });
  });

  describe('Preset Components', () => {
    it('DefaultCard가 기본 스타일로 렌더링된다', () => {
      render(
        <PerformanceCard.Default
          performance={mockPerformance}
          onCardClick={jest.fn()}
        />
      );

      expect(screen.getByText('레미제라블')).toBeInTheDocument();
      expect(screen.getByText('공연 중')).toBeInTheDocument();
      expect(screen.getByText('블루스퀘어 신한카드홀')).toBeInTheDocument();
    });

    it('CompactCard가 컴팩트 스타일로 렌더링된다', () => {
      render(
        <PerformanceCard.Compact
          performance={mockPerformance}
          onCardClick={jest.fn()}
        />
      );

      expect(screen.getByText('레미제라블')).toBeInTheDocument();
    });

    it('VerticalCard가 세로 스타일로 렌더링된다', () => {
      render(
        <PerformanceCard.Vertical
          performance={mockPerformance}
          onCardClick={jest.fn()}
        />
      );

      expect(screen.getByText('레미제라블')).toBeInTheDocument();
    });

    it('DetailedCard가 상세 스타일로 렌더링된다', () => {
      render(
        <PerformanceCard.Detailed
          performance={mockPerformance}
          onCardClick={jest.fn()}
        />
      );

      expect(screen.getByText('레미제라블')).toBeInTheDocument();
    });
  });

  describe('Context Error Handling', () => {
    it('Context 밖에서 하위 컴포넌트를 사용하면 에러가 발생한다', () => {
      // Error boundary로 에러를 잡기 위한 설정
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        render(<PerformanceCard.Title />);
      }).toThrow(PERFORMANCE_CARD_MESSAGES.CONTEXT_ERROR);

      consoleSpy.mockRestore();
    });
  });

  describe('Accessibility', () => {
    it('클릭 가능한 카드에 적절한 aria-label이 설정된다', () => {
      render(
        <PerformanceCard.Root
          performance={mockPerformance}
          onCardClick={jest.fn()}
        >
          <div>Content</div>
        </PerformanceCard.Root>
      );

      const button = screen.getByRole('button');
      expect(button).toHaveAttribute(
        'aria-label',
        PERFORMANCE_CARD_MESSAGES.CARD_DETAIL_LABEL('레미제라블')
      );
    });

    it('좋아요 버튼에 적절한 aria-label이 설정된다', () => {
      render(
        <PerformanceCard.Root
          performance={mockPerformance}
          onLikeClick={jest.fn()}
        >
          <PerformanceCard.LikeButton isLiked={false} />
        </PerformanceCard.Root>
      );

      const likeButton = screen.getByRole('button');
      expect(likeButton).toHaveAttribute(
        'aria-label',
        PERFORMANCE_CARD_MESSAGES.LIKE_BUTTON_LABEL
      );
    });
  });

  describe('Custom Props', () => {
    it('className이 적절히 적용된다', () => {
      const { container } = render(
        <PerformanceCard.Root
          performance={mockPerformance}
          className='custom-class'
        >
          <div>Content</div>
        </PerformanceCard.Root>
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('data-testid 같은 custom props가 전달된다', () => {
      render(
        <PerformanceCard.Root
          performance={mockPerformance}
          data-testid='performance-card'
        >
          <div>Content</div>
        </PerformanceCard.Root>
      );

      expect(screen.getByTestId('performance-card')).toBeInTheDocument();
    });
  });
});
