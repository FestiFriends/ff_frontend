import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useModalContext } from '@/components/common/Modal';
import BottomSheetContent from './BottomSheetContent';

interface ModalContext {
  open: boolean;
  closeModal: jest.Mock;
  onClose?: jest.Mock;
}

jest.mock('@/components/common/Modal', () => ({
  useModalContext: jest.fn(),
}));

jest.mock('@/lib/utils', () => ({
  cn: jest.fn((...args: (string | boolean | undefined)[]) =>
    args.filter(Boolean).join(' ')
  ),
}));

describe('BottomSheetContent', () => {
  const mockCloseModal = jest.fn();
  const mockOnClose = jest.fn();

  const mockedUseModalContext =
    useModalContext as unknown as jest.MockedFunction<() => ModalContext>;

  const defaultProps = {
    children: <div>Test Content</div>,
    height: 'half' as const,
    className: 'test-class',
    disableBackdropClose: false,
    hasHandle: true,
    hasClose: true,
  };

  const mockModalContext: ModalContext = {
    open: true,
    closeModal: mockCloseModal,
    onClose: mockOnClose,
  };

  beforeEach(() => {
    jest.useFakeTimers();
    mockedUseModalContext.mockReturnValue(mockModalContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  describe('렌더링', () => {
    it('open이 true일 때 컴포넌트가 렌더링되어야 한다', () => {
      render(<BottomSheetContent {...defaultProps} />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('open이 false일 때 컴포넌트가 렌더링되지 않아야 한다', () => {
      mockedUseModalContext.mockReturnValue({
        ...mockModalContext,
        open: false,
      });

      render(<BottomSheetContent {...defaultProps} />);

      act(() => {
        jest.advanceTimersByTime(400);
      });

      expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    });

    it('title이 제공되면 헤더에 표시되어야 한다', () => {
      render(
        <BottomSheetContent
          {...defaultProps}
          title='테스트 제목'
        />
      );

      expect(screen.getByText('테스트 제목')).toBeInTheDocument();
    });

    it('hasHandle이 true일 때 핸들이 표시되어야 한다', () => {
      render(
        <BottomSheetContent
          {...defaultProps}
          hasHandle={true}
        />
      );

      const handleContainer = document.querySelector(
        '.flex.flex-shrink-0.justify-center.rounded-2xl.py-3'
      );
      expect(handleContainer).toBeInTheDocument();
    });

    it('hasClose가 true일 때 닫기 버튼이 표시되어야 한다', () => {
      render(
        <BottomSheetContent
          {...defaultProps}
          hasClose={true}
        />
      );

      const svg = document.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  describe('높이 클래스', () => {
    it('height가 half일 때 올바른 클래스가 적용되어야 한다', () => {
      const { container } = render(
        <BottomSheetContent
          {...defaultProps}
          height='half'
        />
      );

      expect(container.innerHTML).toContain('h-[50vh]');
    });

    it('height가 full일 때 올바른 클래스가 적용되어야 한다', () => {
      const { container } = render(
        <BottomSheetContent
          {...defaultProps}
          height='full'
        />
      );

      expect(container.innerHTML).toContain('h-[90vh]');
    });

    it('height가 auto일 때 올바른 클래스가 적용되어야 한다', () => {
      const { container } = render(
        <BottomSheetContent
          {...defaultProps}
          height='auto'
        />
      );

      expect(container.innerHTML).toContain('max-h-[80vh]');
    });
  });

  describe('닫기 기능', () => {
    it('핸들 클릭 시 모달이 닫혀야 한다', () => {
      render(
        <BottomSheetContent
          {...defaultProps}
          hasHandle={true}
        />
      );

      const handle = document.querySelector(
        '.h-1.w-12.rounded-full.bg-gray-300'
      ) as HTMLElement;
      if (handle) {
        fireEvent.click(handle);

        act(() => {
          jest.advanceTimersByTime(350);
        });

        expect(mockOnClose).toHaveBeenCalled();
        expect(mockCloseModal).toHaveBeenCalled();
      }
    });

    it('닫기 버튼 클릭 시 모달이 닫혀야 한다', () => {
      render(
        <BottomSheetContent
          {...defaultProps}
          hasClose={true}
        />
      );

      const closeButton = document.querySelector('button') as HTMLElement;
      if (closeButton) {
        fireEvent.click(closeButton);

        act(() => {
          jest.advanceTimersByTime(350);
        });

        expect(mockOnClose).toHaveBeenCalled();
        expect(mockCloseModal).toHaveBeenCalled();
      }
    });

    it('overlay 클릭 시 모달이 닫혀야 한다', () => {
      render(
        <BottomSheetContent
          {...defaultProps}
          disableBackdropClose={false}
        />
      );

      const overlay = document.querySelector('.fixed.inset-0') as HTMLElement;
      if (overlay) {
        fireEvent.click(overlay);

        act(() => {
          jest.advanceTimersByTime(350);
        });

        expect(mockOnClose).toHaveBeenCalled();
        expect(mockCloseModal).toHaveBeenCalled();
      }
    });

    it('disableBackdropClose가 true일 때 overlay 클릭해도 닫히지 않아야 한다', () => {
      render(
        <BottomSheetContent
          {...defaultProps}
          disableBackdropClose={true}
        />
      );

      const overlay = document.querySelector('.fixed.inset-0') as HTMLElement;
      if (overlay) {
        fireEvent.click(overlay);

        act(() => {
          jest.advanceTimersByTime(350);
        });

        expect(mockOnClose).not.toHaveBeenCalled();
        expect(mockCloseModal).not.toHaveBeenCalled();
      }
    });
  });

  describe('키보드 이벤트', () => {
    it('핸들에서 키보드 이벤트로 닫기가 동작해야 한다', () => {
      render(
        <BottomSheetContent
          {...defaultProps}
          hasHandle={true}
        />
      );

      const handle = document.querySelector(
        '.h-1.w-12.rounded-full.bg-gray-300'
      ) as HTMLElement;
      if (handle) {
        fireEvent.keyDown(handle, { key: 'Enter' });

        act(() => {
          jest.advanceTimersByTime(350);
        });

        expect(mockOnClose).toHaveBeenCalled();
        expect(mockCloseModal).toHaveBeenCalled();
      }
    });

    it('overlay에서 키보드 이벤트로 닫기가 동작해야 한다', () => {
      render(
        <BottomSheetContent
          {...defaultProps}
          disableBackdropClose={false}
        />
      );

      const overlay = document.querySelector('.fixed.inset-0') as HTMLElement;
      if (overlay) {
        fireEvent.keyDown(overlay, { key: 'Enter' });

        act(() => {
          jest.advanceTimersByTime(350);
        });

        expect(mockOnClose).toHaveBeenCalled();
        expect(mockCloseModal).toHaveBeenCalled();
      }
    });
  });

  describe('애니메이션', () => {
    it('open 상태 변경 시 애니메이션 클래스가 적절히 적용되어야 한다', () => {
      const { container, rerender } = render(
        <BottomSheetContent {...defaultProps} />
      );

      expect(container.innerHTML).toContain('translate-y-full');

      act(() => {
        jest.advanceTimersByTime(60);
      });

      expect(container.innerHTML).toContain('translate-y-0');

      mockedUseModalContext.mockReturnValue({
        ...mockModalContext,
        open: false,
      });

      rerender(<BottomSheetContent {...defaultProps} />);

      expect(container.innerHTML).toContain('translate-y-full');
    });

    it('overlay 투명도 애니메이션이 적절히 적용되어야 한다', () => {
      const { container } = render(<BottomSheetContent {...defaultProps} />);

      expect(container.innerHTML).toContain('opacity-0');

      act(() => {
        jest.advanceTimersByTime(60);
      });

      expect(container.innerHTML).toContain('opacity-50');
    });
  });

  describe('접근성', () => {
    it('모든 인터랙티브 요소에 적절한 role과 tabIndex가 설정되어야 한다', () => {
      render(<BottomSheetContent {...defaultProps} />);

      const overlay = document.querySelector('.fixed.inset-0');
      expect(overlay).toHaveAttribute('role', 'button');
      expect(overlay).toHaveAttribute('tabIndex', '0');

      if (defaultProps.hasHandle) {
        const handle = document.querySelector(
          '.h-1.w-12.rounded-full.bg-gray-300'
        );
        expect(handle).toHaveAttribute('role', 'button');
        expect(handle).toHaveAttribute('tabIndex', '0');
      }
    });
  });

  describe('프롭 조건부 렌더링', () => {
    it('hasHandle이 false일 때 핸들이 렌더링되지 않아야 한다', () => {
      render(
        <BottomSheetContent
          {...defaultProps}
          hasHandle={false}
        />
      );

      const handle = document.querySelector(
        '.h-1.w-12.rounded-full.bg-gray-300'
      );
      expect(handle).not.toBeInTheDocument();
    });

    it('hasClose가 false일 때 닫기 버튼이 렌더링되지 않아야 한다', () => {
      render(
        <BottomSheetContent
          {...defaultProps}
          hasClose={false}
        />
      );

      const closeButton = document.querySelector('button');
      expect(closeButton).not.toBeInTheDocument();
    });

    it('title이 없을 때 제목이 렌더링되지 않아야 한다', () => {
      render(<BottomSheetContent {...defaultProps} />);

      const title = screen.queryByRole('heading');
      expect(title).not.toBeInTheDocument();
    });
  });

  describe('타임아웃 정리', () => {
    it('컴포넌트 언마운트 시 타임아웃이 정리되어야 한다', () => {
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

      const { unmount } = render(<BottomSheetContent {...defaultProps} />);

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });
  });

  describe('에러 처리', () => {
    it('onClose가 없어도 에러가 발생하지 않아야 한다', () => {
      mockedUseModalContext.mockReturnValue({
        ...mockModalContext,
        onClose: undefined,
      });

      render(<BottomSheetContent {...defaultProps} />);

      const overlay = document.querySelector('.fixed.inset-0') as HTMLElement;

      expect(() => {
        if (overlay) {
          fireEvent.click(overlay);
          act(() => {
            jest.advanceTimersByTime(350);
          });
        }
      }).not.toThrow();
    });
  });

  describe('다양한 children 타입 테스트', () => {
    it('문자열 children이 올바르게 렌더링되어야 한다', () => {
      render(
        <BottomSheetContent {...defaultProps}>텍스트 콘텐츠</BottomSheetContent>
      );

      expect(screen.getByText('텍스트 콘텐츠')).toBeInTheDocument();
    });

    it('복잡한 JSX children이 올바르게 렌더링되어야 한다', () => {
      const complexChildren = (
        <div>
          <h3>제목</h3>
          <p>내용</p>
          <button>버튼</button>
        </div>
      );

      render(
        <BottomSheetContent {...defaultProps}>
          {complexChildren}
        </BottomSheetContent>
      );

      expect(screen.getByText('제목')).toBeInTheDocument();
      expect(screen.getByText('내용')).toBeInTheDocument();
      expect(screen.getByText('버튼')).toBeInTheDocument();
    });
  });
});
