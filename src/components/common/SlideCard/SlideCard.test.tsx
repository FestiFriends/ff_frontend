import { fireEvent, render, screen } from '@testing-library/react';
import SlideCard from '@/components/common/SlideCard/SlideCard';
import '@testing-library/jest-dom';
import { ApplicationGroupInfo } from '@/types/application';
import { ReviewGroupInfo } from '@/types/reviews';

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});

const mockReviewGroupInfo: ReviewGroupInfo & { memberCount: number } = {
  category: 'COMPANION',
  performance: {
    poster: '/poster.jpg',
    title: '뮤지컬 라이온킹',
    id: 'p1',
  },
  groupTitle: '뮤지컬 감상 모임',
  groupStartDate: '2024-01-01T00:00:00Z',
  groupEndDate: '2024-02-01T00:00:00Z',
  groupId: 'g1',
  memberCount: 5,
};

const mockApplicationGroupInfo: ApplicationGroupInfo = {
  category: 'COMPANION',
  performance: {
    poster: '/poster2.jpg',
    title: '연극 햄릿',
    id: 'p2',
  },
  groupTitle: '햄릿 같이 볼 사람~',
  startDate: '2025-01-01T00:00:00Z',
  endDate: '2025-01-31T00:00:00Z',
  groupId: 'g2',
  memberCount: 3,
  maxMembers: 10,
};

describe('SlideCard component', () => {
  test('리뷰 카드 정보가 제대로 렌더링된다', () => {
    render(
      <SlideCard
        type='review'
        groupInfo={mockReviewGroupInfo}
        reviewsCount={2}
        content={<div>리뷰 내용</div>}
      />
    );

    expect(screen.getByText('뮤지컬 감상 모임')).toBeInTheDocument();
    expect(screen.getByText('뮤지컬 라이온킹')).toBeInTheDocument();
    expect(screen.getByText(/멤버 \(5명\)/)).toBeInTheDocument();
    expect(screen.getByText('더보기')).toBeInTheDocument();
  });

  test('신청 카드 정보가 제대로 렌더링된다', () => {
    render(
      <SlideCard
        type='application'
        groupInfo={mockApplicationGroupInfo}
      />
    );

    expect(screen.getByText('햄릿 같이 볼 사람~')).toBeInTheDocument();
    expect(screen.getByText('연극 햄릿')).toBeInTheDocument();
    expect(screen.getByText(/모집 인원 \(3\/10명\)/)).toBeInTheDocument();
    expect(screen.getByText('더보기')).toBeInTheDocument();
  });

  test('더보기 버튼 클릭 시 콘텐츠가 나타난다', () => {
    render(
      <SlideCard
        type='review'
        groupInfo={mockReviewGroupInfo}
        reviewsCount={2}
        content={'내용 나왔음'}
      />
    );

    const toggleButton = screen.getByText('더보기');
    expect(screen.getByText('내용 나왔음')).toHaveClass('max-h-0');

    fireEvent.click(toggleButton);
    expect(screen.getByText('내용 나왔음')).toHaveClass('max-h-dvh');

    fireEvent.click(toggleButton);
    expect(screen.getByText('내용 나왔음')).toHaveClass('max-h-0');
  });
});
