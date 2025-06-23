import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TabBar from './TabBar';

// Mock next/navigation
const mockPathname = jest.fn();
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

// Mock path-to-regexp
jest.mock('path-to-regexp', () => ({
  match: jest.fn((route: string) => (pathname: string) => {
    // 간단한 패턴 매칭 구현
    if (route.includes(':')) {
      const pattern = route.replace(/:[\w]+/g, '[^/]+');
      const regex = new RegExp(`^${pattern}$`);
      return regex.test(pathname) ? { path: pathname } : false;
    }
    return pathname === route ? { path: pathname } : false;
  }),
}));

// Mock NavLink
jest.mock('@/components/common', () => ({
  NavLink: ({ 
    href, 
    children, 
    className, 
    activeClassName 
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    activeClassName?: string;
  }) => (
    <a 
      href={href} 
      className={className}
      data-active-class={activeClassName}
      data-testid={`nav-link-${href}`}
    >
      {children}
    </a>
  ),
}));

// Mock icons
jest.mock('@/components/icons', () => {
  const createMockIcon = (name: string) => {
    return function MockIcon({ type, className }: { type?: string; className?: string }) {
      return (
        <div 
          data-testid={`${name.toLowerCase()}-icon`} 
          data-type={type}
          className={className}
        >
          {name}
        </div>
      );
    };
  };

  return {
    CalendarIcon: createMockIcon('Calendar'),
    GroupIcon: createMockIcon('Group'),
    HomeIcon: createMockIcon('Home'),
    LikeIcon: createMockIcon('Like'),
    UserIcon: createMockIcon('User'),
  };
});

// Mock hooks
const mockIsMobile = jest.fn();
jest.mock('@/hooks', () => ({
  useIsMobile: () => mockIsMobile(),
}));

// Mock utils
jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}));

describe('TabBar', () => {
  const TestChildren = () => <div data-testid="test-children">Test Content</div>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockIsMobile.mockReturnValue(true);
    mockPathname.mockReturnValue('/');
  });

  describe('기본 렌더링', () => {
    it('children이 올바르게 렌더링된다', () => {
      mockPathname.mockReturnValue('/');
      render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });

    it('모바일에서 네비게이션 아이템들이 렌더링된다', () => {
      mockIsMobile.mockReturnValue(true);
      mockPathname.mockReturnValue('/');

      render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
      expect(screen.getByTestId('calendar-icon')).toBeInTheDocument();
      expect(screen.getByTestId('group-icon')).toBeInTheDocument();
      expect(screen.getByTestId('like-icon')).toBeInTheDocument();
      expect(screen.getByTestId('user-icon')).toBeInTheDocument();

      expect(screen.getByText('홈')).toBeInTheDocument();
      expect(screen.getByText('캘린더')).toBeInTheDocument();
      expect(screen.getByText('나의모임')).toBeInTheDocument();
      expect(screen.getByText('찜')).toBeInTheDocument();
      expect(screen.getByText('마이')).toBeInTheDocument();
    });

    it('데스크톱에서는 TabBar가 표시되지 않는다', () => {
      mockIsMobile.mockReturnValue(false);
      mockPathname.mockReturnValue('/');

      render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      expect(screen.queryByTestId('home-icon')).not.toBeInTheDocument();
      expect(screen.getByTestId('test-children')).toBeInTheDocument();
    });
  });

  describe('tabBarHide 기능 테스트', () => {
    beforeEach(() => {
      mockIsMobile.mockReturnValue(true);
    });

    it('숨김 경로에서는 TabBar가 표시되지 않는다', () => {
      const hiddenRoutes = [
        '/groups/create',
        '/profiles/me/edit',
        '/reviews/managements',
      ];

      hiddenRoutes.forEach(route => {
        mockPathname.mockReturnValue(route);
        
        const { unmount } = render(
          <TabBar>
            <TestChildren />
          </TabBar>
        );

        expect(screen.queryByTestId('home-icon')).not.toBeInTheDocument();
        expect(screen.getByTestId('test-children')).toBeInTheDocument();

        unmount();
      });
    });

    it('동적 경로에서도 TabBar가 숨겨진다', () => {
      const dynamicRoutes = [
        '/groups/123/edit',
        '/groups/456/posts/789',
        '/groups/abc/posts/create',
        '/groups/def/posts/ghi/edit',
      ];

      dynamicRoutes.forEach(route => {
        mockPathname.mockReturnValue(route);
        
        const { unmount } = render(
          <TabBar>
            <TestChildren />
          </TabBar>
        );

        expect(screen.queryByTestId('home-icon')).not.toBeInTheDocument();
        expect(screen.getByTestId('test-children')).toBeInTheDocument();

        unmount();
      });
    });

    it('일반 경로에서는 TabBar가 표시된다', () => {
      const visibleRoutes = [
        '/',
        '/calendar',
        '/groups/managements',
        '/favorite',
        '/mypage',
        '/performances',
        '/groups/123', // edit가 없는 그룹 상세
      ];

      visibleRoutes.forEach(route => {
        mockPathname.mockReturnValue(route);
        
        const { unmount } = render(
          <TabBar>
            <TestChildren />
          </TabBar>
        );

        expect(screen.getByTestId('home-icon')).toBeInTheDocument();
        expect(screen.getByTestId('test-children')).toBeInTheDocument();

        unmount();
      });
    });
  });

  describe('네비게이션 아이템 테스트', () => {
    beforeEach(() => {
      mockIsMobile.mockReturnValue(true);
      mockPathname.mockReturnValue('/');
    });

    it('모든 네비게이션 링크가 올바른 href를 가진다', () => {
      render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      expect(screen.getByTestId('nav-link-/')).toHaveAttribute('href', '/');
      expect(screen.getByTestId('nav-link-/calendar')).toHaveAttribute('href', '/calendar');
      expect(screen.getByTestId('nav-link-/groups/managements')).toHaveAttribute('href', '/groups/managements');
      expect(screen.getByTestId('nav-link-/favorite')).toHaveAttribute('href', '/favorite');
      expect(screen.getByTestId('nav-link-/mypage')).toHaveAttribute('href', '/mypage');
    });

    it('아이콘들이 올바른 props로 렌더링된다', () => {
      render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      const icons = [
        'home-icon',
        'calendar-icon', 
        'group-icon',
        'like-icon',
        'user-icon'
      ];

      icons.forEach(iconTestId => {
        const icon = screen.getByTestId(iconTestId);
        expect(icon).toHaveAttribute('data-type', 'active');
        expect(icon).toHaveClass('h-6', 'w-6', 'text-center', 'text-inherit');
      });
    });

    it('NavLink에 올바른 className이 적용된다', () => {
      render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      const navLinks = screen.getAllByRole('link');
      navLinks.forEach(link => {
        expect(link).toHaveClass(
          'flex', 'h-11', 'w-11', 'flex-col', 'items-center', 
          'gap-1.5', 'text-gray-400'
        );
        expect(link).toHaveAttribute('data-active-class', 'text-primary-red');
      });
    });
  });

  describe('레이아웃 테스트', () => {
    it('모바일에서 children에 올바른 높이 클래스가 적용된다', () => {
      mockIsMobile.mockReturnValue(true);
      mockPathname.mockReturnValue('/');

      const { container } = render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      const childrenContainer = container.querySelector('.overflow-auto');
      expect(childrenContainer).toHaveClass('h-[calc(100dvh-80px)]');
    });

    it('데스크톱에서 children에 높이 클래스가 적용되지 않는다', () => {
      mockIsMobile.mockReturnValue(false);
      mockPathname.mockReturnValue('/');

      const { container } = render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      const childrenContainer = container.querySelector('.overflow-auto');
      expect(childrenContainer).toHaveClass('overflow-auto');
      expect(childrenContainer).not.toHaveClass('h-[calc(100dvh-80px)]');
    });

    it('TabBar가 올바른 스타일 클래스를 가진다', () => {
      mockIsMobile.mockReturnValue(true);
      mockPathname.mockReturnValue('/');

      const { container } = render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      const tabBar = container.querySelector('.sticky');
      expect(tabBar).toHaveClass(
        'sticky', 'right-0', 'bottom-0', 'left-0', 'flex', 'h-20',
        'justify-between', 'border-t', 'border-gray-50', 'bg-white', 'p-4'
      );
    });
  });

  describe('조건부 렌더링 테스트', () => {
    it('숨김 경로에서는 TabBar 관련 요소가 렌더링되지 않는다', () => {
      mockIsMobile.mockReturnValue(true);
      mockPathname.mockReturnValue('/groups/create');

      const { container } = render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      expect(container.querySelector('.sticky')).not.toBeInTheDocument();
      expect(screen.queryByTestId('home-icon')).not.toBeInTheDocument();
    });

    it('표시 경로에서는 모든 TabBar 요소가 렌더링된다', () => {
      mockIsMobile.mockReturnValue(true);
      mockPathname.mockReturnValue('/');

      const { container } = render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      expect(container.querySelector('.sticky')).toBeInTheDocument();
      expect(container.querySelector('.overflow-auto')).toBeInTheDocument();
      expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    });
  });

  describe('NAV_ITEM 구성 테스트', () => {
    it('정확한 수의 네비게이션 아이템이 렌더링된다', () => {
      mockIsMobile.mockReturnValue(true);
      mockPathname.mockReturnValue('/');

      render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      const navLinks = screen.getAllByRole('link');
      expect(navLinks).toHaveLength(5);
    });

    it('각 네비게이션 아이템이 고유한 key를 가진다', () => {
      mockIsMobile.mockReturnValue(true);
      mockPathname.mockReturnValue('/');

      render(
        <TabBar>
          <TestChildren />
        </TabBar>
      );

      // 각 텍스트가 정확히 한 번씩만 나타나는지 확인
      expect(screen.getByText('홈')).toBeInTheDocument();
      expect(screen.getByText('캘린더')).toBeInTheDocument();
      expect(screen.getByText('나의모임')).toBeInTheDocument();
      expect(screen.getByText('찜')).toBeInTheDocument();
      expect(screen.getByText('마이')).toBeInTheDocument();
    });
  });
});