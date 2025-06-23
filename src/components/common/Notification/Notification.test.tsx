import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Notification from './Notification';

// Mock next/navigation
const mockPush = jest.fn();
const mockPathname = '/test-path';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  usePathname: () => mockPathname,
}));

// Mock BellIcon
jest.mock('@/components/icons/BellIcon', () => {
  return function BellIcon({ 
    isActive, 
    onClick 
  }: { 
    isActive?: boolean; 
    onClick?: () => void; 
  }) {
    return (
      <button 
        data-testid="bell-icon" 
        data-active={isActive !== undefined ? String(isActive) : 'undefined'}
        onClick={onClick}
      >
        Bell Icon
      </button>
    );
  };
});

// Mock NotificationList
jest.mock('@/components/pages/notifications/NotificationList', () => {
  return function NotificationList() {
    return <div data-testid="notification-list">Notification List</div>;
  };
});

// Mock Popover components
jest.mock('@/components/ui/popover', () => ({
  Popover: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover">{children}</div>
  ),
  PopoverTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover-trigger">{children}</div>
  ),
  PopoverContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="popover-content">{children}</div>
  ),
}));

// Mock ScrollArea
jest.mock('@/components/ui/scroll-area', () => ({
  ScrollArea: ({ 
    children, 
    className 
  }: { 
    children: React.ReactNode; 
    className?: string; 
  }) => (
    <div data-testid="scroll-area" className={className}>
      {children}
    </div>
  ),
}));

// Mock hooks
const mockIsDesktop = jest.fn();
const mockNotificationData = jest.fn();
const mockRefetch = jest.fn();

jest.mock('@/hooks', () => ({
  useIsDesktop: () => mockIsDesktop(),
}));

jest.mock('@/hooks/notificationHooks/notificationHooks', () => ({
  useGetNewNotificationsCheck: () => ({
    data: mockNotificationData(),
    refetch: mockRefetch,
  }),
}));

describe('Notification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNotificationData.mockReturnValue({
      data: { hasUnread: false },
    });
  });

  describe('모바일 환경 테스트', () => {
    beforeEach(() => {
      mockIsDesktop.mockReturnValue(false);
    });

    it('모바일에서 MobileNotification이 렌더링된다', () => {
      render(<Notification />);

      expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
    });

    it('새 알림이 없을 때 BellIcon이 비활성 상태로 렌더링된다', () => {
      mockNotificationData.mockReturnValue({
        data: { hasUnread: false },
      });

      render(<Notification />);

      const bellIcon = screen.getByTestId('bell-icon');
      expect(bellIcon).toHaveAttribute('data-active', 'false');
    });

    it('새 알림이 있을 때 BellIcon이 활성 상태로 렌더링된다', () => {
      mockNotificationData.mockReturnValue({
        data: { hasUnread: true },
      });

      render(<Notification />);

      const bellIcon = screen.getByTestId('bell-icon');
      expect(bellIcon).toHaveAttribute('data-active', 'true');
    });

    it('BellIcon 클릭 시 알림 페이지로 이동한다', () => {
      render(<Notification />);

      const bellIcon = screen.getByTestId('bell-icon');
      fireEvent.click(bellIcon);

      expect(mockPush).toHaveBeenCalledWith('/notifications');
    });

    it('알림 데이터가 없을 때도 올바르게 렌더링된다', () => {
      mockNotificationData.mockReturnValue(null);

      render(<Notification />);

      const bellIcon = screen.getByTestId('bell-icon');
      expect(bellIcon).toHaveAttribute('data-active', 'undefined');
    });

    it('알림 데이터의 hasUnread가 undefined일 때 비활성 상태로 렌더링된다', () => {
      mockNotificationData.mockReturnValue({
        data: { hasUnread: undefined },
      });

      render(<Notification />);

      const bellIcon = screen.getByTestId('bell-icon');
      expect(bellIcon).toHaveAttribute('data-active', 'undefined');
    });
  });

  describe('데스크톱 환경 테스트', () => {
    beforeEach(() => {
      mockIsDesktop.mockReturnValue(true);
    });

    it('데스크톱에서 DesktopNotification이 렌더링된다', () => {
      render(<Notification />);

      expect(screen.getByTestId('popover')).toBeInTheDocument();
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('popover-content')).toBeInTheDocument();
    });

    it('데스크톱에서 BellIcon이 Popover 트리거로 렌더링된다', () => {
      render(<Notification />);

      expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
      expect(screen.getByTestId('popover-trigger')).toBeInTheDocument();
    });

    it('데스크톱에서 새 알림이 없을 때 BellIcon이 비활성 상태로 렌더링된다', () => {
      mockNotificationData.mockReturnValue({
        data: { hasUnread: false },
      });

      render(<Notification />);

      const bellIcon = screen.getByTestId('bell-icon');
      expect(bellIcon).toHaveAttribute('data-active', 'false');
    });

    it('데스크톱에서 새 알림이 있을 때 BellIcon이 활성 상태로 렌더링된다', () => {
      mockNotificationData.mockReturnValue({
        data: { hasUnread: true },
      });

      render(<Notification />);

      const bellIcon = screen.getByTestId('bell-icon');
      expect(bellIcon).toHaveAttribute('data-active', 'true');
    });

    it('데스크톱에서 NotificationList가 ScrollArea 안에 렌더링된다', () => {
      render(<Notification />);

      expect(screen.getByTestId('scroll-area')).toBeInTheDocument();
      expect(screen.getByTestId('notification-list')).toBeInTheDocument();
    });

    it('데스크톱에서 ScrollArea에 적절한 높이 클래스가 적용된다', () => {
      render(<Notification />);

      const scrollArea = screen.getByTestId('scroll-area');
      expect(scrollArea).toHaveClass('h-80');
    });

    it('데스크톱에서 컴포넌트 마운트 시 refetch가 호출된다', () => {
      render(<Notification />);

      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });

    it('데스크톱에서 알림 데이터가 없을 때도 올바르게 렌더링된다', () => {
      mockNotificationData.mockReturnValue(null);

      render(<Notification />);

      const bellIcon = screen.getByTestId('bell-icon');
      expect(bellIcon).toHaveAttribute('data-active', 'undefined');
      expect(screen.getByTestId('notification-list')).toBeInTheDocument();
    });
  });

  describe('반응형 전환 테스트', () => {
    it('모바일에서 데스크톱으로 전환될 때 올바른 컴포넌트가 렌더링된다', () => {
      // 처음에는 모바일
      mockIsDesktop.mockReturnValue(false);
      const { rerender } = render(<Notification />);

      expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
      expect(screen.queryByTestId('popover')).not.toBeInTheDocument();

      // 데스크톱으로 변경
      mockIsDesktop.mockReturnValue(true);
      rerender(<Notification />);

      expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
      expect(screen.getByTestId('popover')).toBeInTheDocument();
    });

    it('데스크톱에서 모바일로 전환될 때 올바른 컴포넌트가 렌더링된다', () => {
      // 처음에는 데스크톱
      mockIsDesktop.mockReturnValue(true);
      const { rerender } = render(<Notification />);

      expect(screen.getByTestId('popover')).toBeInTheDocument();

      // 모바일로 변경
      mockIsDesktop.mockReturnValue(false);
      rerender(<Notification />);

      expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
      expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
    });
  });

  describe('알림 상태 변화 테스트', () => {
    it('알림 상태가 변경될 때 BellIcon 상태가 업데이트된다', () => {
      mockIsDesktop.mockReturnValue(false);
      mockNotificationData.mockReturnValue({
        data: { hasUnread: false },
      });

      const { rerender } = render(<Notification />);

      let bellIcon = screen.getByTestId('bell-icon');
      expect(bellIcon).toHaveAttribute('data-active', 'false');

      // 알림 상태 변경
      mockNotificationData.mockReturnValue({
        data: { hasUnread: true },
      });
      rerender(<Notification />);

      bellIcon = screen.getByTestId('bell-icon');
      expect(bellIcon).toHaveAttribute('data-active', 'true');
    });
  });

  describe('에러 처리 테스트', () => {
    it('useGetNewNotificationsCheck가 에러를 반환해도 렌더링된다', () => {
      mockNotificationData.mockReturnValue(undefined);

      expect(() => {
        render(<Notification />);
      }).not.toThrow();

      expect(screen.getByTestId('bell-icon')).toBeInTheDocument();
    });

    it('데이터 구조가 예상과 다를 때도 안전하게 처리된다', () => {
      mockNotificationData.mockReturnValue({
        // data 프로퍼티가 없는 경우
        wrongProperty: { hasUnread: true },
      });

      expect(() => {
        render(<Notification />);
      }).not.toThrow();

      const bellIcon = screen.getByTestId('bell-icon');
      expect(bellIcon).toHaveAttribute('data-active', 'undefined');
    });
  });
});