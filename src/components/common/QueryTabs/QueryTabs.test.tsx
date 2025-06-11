import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import useQueryParam from '@/hooks/useQueryParam/useQueryParam';
import QueryTabs from './QueryTabs';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('@/hooks/useQueryParam/useQueryParam', () => ({
  __esModule: true,
  default: jest.fn(),
}));

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

jest.mock('@/components/common', () => ({
  Tabs: ({ tabs, activeTab, onTabChange }: TabsProps) => (
    <div data-testid='tabs-container'>
      {tabs.map((tab: string) => (
        <button
          key={tab}
          data-testid={`tab-${tab}`}
          className={activeTab === tab ? 'active' : ''}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  ),
}));

const mockRouter = {
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
};

const mockUseQueryParam = {
  getQueryParam: jest.fn(),
  setQueryParam: jest.fn(),
  clearAllParams: jest.fn(),
  setMultipleQueryParams: jest.fn(),
  getPerformanceQueryString: jest.fn(),
};

describe('QueryTabs', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    const useQueryParamMock = jest.mocked(useQueryParam);
    useQueryParamMock.mockReturnValue(mockUseQueryParam);
  });

  const defaultProps = {
    tabs: ['탭1', '탭2', '탭3'],
  };

  describe('렌더링', () => {
    it('모든 탭이 렌더링되어야 한다', () => {
      mockUseQueryParam.getQueryParam.mockReturnValue(null);

      render(<QueryTabs {...defaultProps} />);

      expect(screen.getByTestId('tabs-container')).toBeInTheDocument();
      expect(screen.getByTestId('tab-탭1')).toBeInTheDocument();
      expect(screen.getByTestId('tab-탭2')).toBeInTheDocument();
      expect(screen.getByTestId('tab-탭3')).toBeInTheDocument();
    });

    it('첫 번째 탭이 기본적으로 활성화되어야 한다', () => {
      mockUseQueryParam.getQueryParam.mockReturnValue(null);

      render(<QueryTabs {...defaultProps} />);

      const firstTab = screen.getByTestId('tab-탭1');
      expect(firstTab).toHaveClass('active');
    });

    it('커스텀 기본 탭이 활성화되어야 한다', () => {
      mockUseQueryParam.getQueryParam.mockReturnValue(null);

      render(
        <QueryTabs
          {...defaultProps}
          defaultTab='탭2'
        />
      );

      const secondTab = screen.getByTestId('tab-탭2');
      expect(secondTab).toHaveClass('active');
    });
  });

  describe('쿼리 파라미터 처리', () => {
    it('URL에서 탭 값을 가져와야 한다', () => {
      mockUseQueryParam.getQueryParam.mockReturnValue('탭2');

      render(<QueryTabs {...defaultProps} />);

      expect(mockUseQueryParam.getQueryParam).toHaveBeenCalledWith('tab');
      const secondTab = screen.getByTestId('tab-탭2');
      expect(secondTab).toHaveClass('active');
    });

    it('커스텀 쿼리 파라미터 키를 사용해야 한다', () => {
      mockUseQueryParam.getQueryParam.mockReturnValue('탭3');

      render(
        <QueryTabs
          {...defaultProps}
          queryParamKey='section'
        />
      );

      expect(mockUseQueryParam.getQueryParam).toHaveBeenCalledWith('section');
    });

    it('유효하지 않은 탭 값일 때 기본값을 사용해야 한다', () => {
      mockUseQueryParam.getQueryParam.mockReturnValue('존재하지않는탭');

      render(<QueryTabs {...defaultProps} />);

      const firstTab = screen.getByTestId('tab-탭1');
      expect(firstTab).toHaveClass('active');
    });
  });

  describe('탭 변경', () => {
    it('탭 클릭 시 쿼리 파라미터가 업데이트되어야 한다', () => {
      mockUseQueryParam.getQueryParam.mockReturnValue('탭1');

      render(<QueryTabs {...defaultProps} />);

      const secondTab = screen.getByTestId('tab-탭2');
      fireEvent.click(secondTab);

      expect(mockUseQueryParam.setQueryParam).toHaveBeenCalledWith(
        'tab',
        '탭2'
      );
    });

    it('커스텀 쿼리 파라미터 키로 업데이트되어야 한다', () => {
      mockUseQueryParam.getQueryParam.mockReturnValue('탭1');

      render(
        <QueryTabs
          {...defaultProps}
          queryParamKey='section'
        />
      );

      const thirdTab = screen.getByTestId('tab-탭3');
      fireEvent.click(thirdTab);

      expect(mockUseQueryParam.setQueryParam).toHaveBeenCalledWith(
        'section',
        '탭3'
      );
    });

    it('onTabChange 콜백이 호출되어야 한다', () => {
      const mockOnTabChange = jest.fn();
      mockUseQueryParam.getQueryParam.mockReturnValue('탭1');

      render(
        <QueryTabs
          {...defaultProps}
          onTabChange={mockOnTabChange}
        />
      );

      const secondTab = screen.getByTestId('tab-탭2');
      fireEvent.click(secondTab);

      expect(mockOnTabChange).toHaveBeenCalledWith('탭2');
    });
  });

  describe('엣지 케이스', () => {
    it('빈 탭 배열일 때 에러가 발생하지 않아야 한다', () => {
      mockUseQueryParam.getQueryParam.mockReturnValue(null);

      expect(() => {
        render(<QueryTabs tabs={[]} />);
      }).not.toThrow();
    });

    it('단일 탭일 때 정상 작동해야 한다', () => {
      mockUseQueryParam.getQueryParam.mockReturnValue(null);

      render(<QueryTabs tabs={['단일탭']} />);

      const singleTab = screen.getByTestId('tab-단일탭');
      expect(singleTab).toHaveClass('active');
    });
  });
});
