import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

// Mock framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, className, style, ...props }: any) => (
      <div className={className} style={style} {...props}>
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock common components
jest.mock('@/components/common', () => ({
  Notification: () => <div data-testid="notification">Notification</div>,
  SearchInput: React.forwardRef<HTMLInputElement, any>(
    ({ placeholder, className, onSubmit, ...props }, ref) => (
      <input
        ref={ref}
        placeholder={placeholder}
        className={className}
        data-testid="search-input"
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSubmit) {
            onSubmit();
          }
        }}
        {...props}
      />
    )
  ),
}));

// Mock icons
jest.mock('@/components/icons', () => ({
  ArrowLeft: ({ size }: { size?: number }) => (
    <div data-testid="arrow-left" data-size={size}>
      ArrowLeft
    </div>
  ),
  SearchIcon: () => <div data-testid="search-icon">SearchIcon</div>,
}));

// Mock hooks
const mockIsMobile = jest.fn();
const mockOnLogin = jest.fn();
const mockIsLoggedIn = jest.fn();

jest.mock('@/hooks', () => ({
  useIsMobile: () => mockIsMobile(),
}));

jest.mock('@/hooks/useAuth', () => ({
  useLogin: () => ({
    onLogin: mockOnLogin,
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

jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}));

describe('Header', () => {
  const defaultProps = {
    title: 'Test Title',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockIsMobile.mockReturnValue(true);
    mockIsLoggedIn.mockReturnValue(true);
  });

  describe('모바일 환경 테스트', () => {
    it('모바일에서 헤더가 렌더링된다', () => {
      mockIsMobile.mockReturnValue(true);
      render(<Header {...defaultProps} />);

      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('데스크톱에서는 헤더가 렌더링되지 않는다', () => {
      mockIsMobile.mockReturnValue(false);
      render(<Header {...defaultProps} />);

      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });
  });

  describe('기본 렌더링', () => {
    it('제목이 올바르게 렌더링된다', () => {
      render(<Header {...defaultProps} />);

      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('로그인된 상태에서 기본 요소들이 렌더링된다', () => {
      mockIsLoggedIn.mockReturnValue(true);
      render(<Header {...defaultProps} />);

      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
      expect(screen.getByTestId('notification')).toBeInTheDocument();
    });

    it('로그인되지 않은 상태에서 로그인 버튼이 렌더링된다', () => {
      mockIsLoggedIn.mockReturnValue(false);
      render(<Header {...defaultProps} />);

      expect(screen.getByText('로그인')).toBeInTheDocument();
      expect(screen.queryByTestId('notification')).not.toBeInTheDocument();
    });
  });

  describe('hasNotification prop 테스트', () => {
    it('hasNotification이 true일 때 알림이 표시된다', () => {
      mockIsLoggedIn.mockReturnValue(true);
      render(<Header {...defaultProps} hasNotification={true} />);

      expect(screen.getByTestId('notification')).toBeInTheDocument();
    });

    it('hasNotification이 false일 때 알림이 표시되지 않는다', () => {
      mockIsLoggedIn.mockReturnValue(true);
      render(<Header {...defaultProps} hasNotification={false} />);

      expect(screen.queryByTestId('notification')).not.toBeInTheDocument();
    });

    it('로그인되지 않은 상태에서는 hasNotification과 상관없이 알림이 표시되지 않는다', () => {
      mockIsLoggedIn.mockReturnValue(false);
      render(<Header {...defaultProps} hasNotification={true} />);

      expect(screen.queryByTestId('notification')).not.toBeInTheDocument();
    });
  });

  describe('hasSearch prop 테스트', () => {
    it('hasSearch가 true일 때 검색 아이콘이 표시된다', () => {
      render(<Header {...defaultProps} hasSearch={true} />);

      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('hasSearch가 false일 때 검색 아이콘이 표시되지 않는다', () => {
      render(<Header {...defaultProps} hasSearch={false} />);

      expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument();
    });
  });

  describe('검색 기능 테스트', () => {
    it('검색 아이콘 클릭 시 검색 모드가 활성화된다', () => {
      render(<Header {...defaultProps} />);

      const searchIcon = screen.getByTestId('search-icon');
      fireEvent.click(searchIcon);

      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getByTestId('arrow-left')).toBeInTheDocument();
    });

    it('검색 모드에서 뒤로 가기 버튼 클릭 시 검색 모드가 비활성화된다', () => {
      render(<Header {...defaultProps} />);

      // 검색 모드 활성화
      const searchIcon = screen.getByTestId('search-icon');
      fireEvent.click(searchIcon);

      // 뒤로 가기 클릭
      const backButton = screen.getByTestId('arrow-left');
      fireEvent.click(backButton);

      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('검색 모드에서 제목이 숨겨진다', () => {
      render(<Header {...defaultProps} />);

      // 검색 모드 활성화
      const searchIcon = screen.getByTestId('search-icon');
      fireEvent.click(searchIcon);

      expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
    });

    it('hasSearch가 false일 때 검색 모드가 활성화되지 않는다', () => {
      render(<Header {...defaultProps} hasSearch={false} />);

      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();
    });
  });

  describe('검색 실행 테스트', () => {
    it('검색 입력 후 엔터 키 입력 시 라우터가 호출된다', async () => {
      render(<Header {...defaultProps} />);

      // 검색 모드 활성화
      const searchIcon = screen.getByTestId('search-icon');
      fireEvent.click(searchIcon);

      const searchInput = screen.getByTestId('search-input');
      
      // 검색어 입력
      fireEvent.change(searchInput, { target: { value: 'test query' } });
      
      // 엔터 키 입력
      fireEvent.keyDown(searchInput, { key: 'Enter' });

      await waitFor(() => {
        expect(mockPush).toHaveBeenCalledWith('/performances?title=test query');
      });
    });
  });

  describe('로그인 기능 테스트', () => {
    it('로그인 버튼 클릭 시 onLogin이 호출된다', () => {
      mockIsLoggedIn.mockReturnValue(false);
      render(<Header {...defaultProps} />);

      const loginButton = screen.getByText('로그인');
      fireEvent.click(loginButton);

      expect(mockOnLogin).toHaveBeenCalledTimes(1);
    });

    it('로그인된 상태에서는 로그인 버튼이 표시되지 않는다', () => {
      mockIsLoggedIn.mockReturnValue(true);
      render(<Header {...defaultProps} />);

      expect(screen.queryByText('로그인')).not.toBeInTheDocument();
    });
  });

  describe('레이아웃 테스트', () => {
    it('헤더 하단에 spacing div가 렌더링된다', () => {
      const { container } = render(<Header {...defaultProps} />);

      const spacingDiv = container.querySelector('.h-11');
      expect(spacingDiv).toBeInTheDocument();
    });

    it('로그인되지 않은 상태에서 적절한 width 클래스가 적용된다', () => {
      mockIsLoggedIn.mockReturnValue(false);
      const { container } = render(<Header {...defaultProps} />);

      const leftDiv = container.querySelector('.w-\\[81px\\]');
      expect(leftDiv).toBeInTheDocument();
    });

    it('로그인된 상태에서 적절한 width 클래스가 적용된다', () => {
      mockIsLoggedIn.mockReturnValue(true);
      const { container } = render(<Header {...defaultProps} />);

      const leftDiv = container.querySelector('.w-\\[68px\\]');
      expect(leftDiv).toBeInTheDocument();
    });
  });

  describe('props 조합 테스트', () => {
    it('모든 props가 false일 때도 올바르게 렌더링된다', () => {
      render(
        <Header 
          title="No Features" 
          hasNotification={false} 
          hasSearch={false} 
        />
      );

      expect(screen.getByText('No Features')).toBeInTheDocument();
      expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument();
      expect(screen.queryByTestId('notification')).not.toBeInTheDocument();
    });

    it('title이 없어도 올바르게 렌더링된다', () => {
      render(<Header hasNotification={true} hasSearch={true} />);

      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
      // title은 빈 문자열로 렌더링됨
    });
  });
});