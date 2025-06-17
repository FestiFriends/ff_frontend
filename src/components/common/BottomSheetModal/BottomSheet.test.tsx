import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BottomSheetModal from './BottomSheetModal';

// Modal 컴포넌트 모킹
jest.mock('@/components/common/Modal', () => ({
  Modal: ({
    children,
    disableBackdropClose,
  }: {
    children: React.ReactNode;
    disableBackdropClose: boolean;
  }) => (
    <div
      data-testid='modal-wrapper'
      data-disable-backdrop={disableBackdropClose}
    >
      {children}
    </div>
  ),
  ModalTrigger: ({ children }: { children: React.ReactNode }) => (
    <div data-testid='modal-trigger'>{children}</div>
  ),
  ModalContent: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className: string;
  }) => (
    <div
      data-testid='modal-content'
      className={className}
    >
      {children}
    </div>
  ),
}));

// BottomSheetContent 모킹
jest.mock('./BottomSheetContent', () => {
  const MockBottomSheetContent = ({
    children,
    title,
    height,
    className,
    disableBackdropClose,
    hasHandle,
    hasClose,
  }: {
    children: React.ReactNode;
    title?: string;
    height: 'half' | 'full' | 'auto';
    className: string;
    disableBackdropClose: boolean;
    hasHandle: boolean;
    hasClose: boolean;
  }) => (
    <div
      data-testid='bottom-sheet-content'
      data-title={title}
      data-height={height}
      data-class={className}
      data-disable-backdrop={disableBackdropClose}
      data-has-handle={hasHandle}
      data-has-close={hasClose}
    >
      {children}
    </div>
  );

  return MockBottomSheetContent;
});

describe('BottomSheetModal', () => {
  const defaultProps = {
    trigger: <button>Open Bottom Sheet</button>,
    children: <div>Test Content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('기본 렌더링', () => {
    it('트리거와 컨텐츠가 올바르게 렌더링된다', () => {
      render(<BottomSheetModal {...defaultProps} />);

      expect(screen.getByTestId('modal-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('bottom-sheet-content')).toBeInTheDocument();
      expect(screen.getByText('Open Bottom Sheet')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('Modal 컴포넌트에 올바른 props가 전달된다', () => {
      render(<BottomSheetModal {...defaultProps} />);

      const modalWrapper = screen.getByTestId('modal-wrapper');
      expect(modalWrapper).toHaveAttribute('data-disable-backdrop', 'true');
    });

    it('ModalContent에 빈 className이 전달된다', () => {
      render(<BottomSheetModal {...defaultProps} />);

      const modalContent = screen.getByTestId('modal-content');
      expect(modalContent.className).toBe('');
    });
  });

  describe('Props 전달 테스트', () => {
    it('기본값들이 올바르게 BottomSheetContent에 전달된다', () => {
      render(<BottomSheetModal {...defaultProps} />);

      const bottomSheetContent = screen.getByTestId('bottom-sheet-content');
      expect(bottomSheetContent).toHaveAttribute('data-height', 'half');
      expect(bottomSheetContent).toHaveAttribute('data-class', '');
      expect(bottomSheetContent).toHaveAttribute(
        'data-disable-backdrop',
        'false'
      );
      expect(bottomSheetContent).toHaveAttribute('data-has-handle', 'true');
      expect(bottomSheetContent).toHaveAttribute('data-has-close', 'true');
    });

    it('title이 올바르게 전달된다', () => {
      const title = 'Test Title';
      render(
        <BottomSheetModal
          {...defaultProps}
          title={title}
        />
      );

      const bottomSheetContent = screen.getByTestId('bottom-sheet-content');
      expect(bottomSheetContent).toHaveAttribute('data-title', title);
    });

    it('height prop이 올바르게 전달된다', () => {
      const heights = ['half', 'full', 'auto'] as const;

      heights.forEach((height) => {
        const { unmount } = render(
          <BottomSheetModal
            {...defaultProps}
            height={height}
          />
        );

        const bottomSheetContent = screen.getByTestId('bottom-sheet-content');
        expect(bottomSheetContent).toHaveAttribute('data-height', height);

        unmount();
      });
    });

    it('className이 올바르게 전달된다', () => {
      const className = 'custom-class';
      render(
        <BottomSheetModal
          {...defaultProps}
          className={className}
        />
      );

      const bottomSheetContent = screen.getByTestId('bottom-sheet-content');
      expect(bottomSheetContent).toHaveAttribute('data-class', className);
    });

    it('disableBackdropClose가 올바르게 전달된다', () => {
      render(
        <BottomSheetModal
          {...defaultProps}
          disableBackdropClose={true}
        />
      );

      const bottomSheetContent = screen.getByTestId('bottom-sheet-content');
      expect(bottomSheetContent).toHaveAttribute(
        'data-disable-backdrop',
        'true'
      );
    });

    it('hasHandle이 올바르게 전달된다', () => {
      render(
        <BottomSheetModal
          {...defaultProps}
          hasHandle={false}
        />
      );

      const bottomSheetContent = screen.getByTestId('bottom-sheet-content');
      expect(bottomSheetContent).toHaveAttribute('data-has-handle', 'false');
    });

    it('hasClose가 올바르게 전달된다', () => {
      render(
        <BottomSheetModal
          {...defaultProps}
          hasClose={false}
        />
      );

      const bottomSheetContent = screen.getByTestId('bottom-sheet-content');
      expect(bottomSheetContent).toHaveAttribute('data-has-close', 'false');
    });
  });

  describe('복합 Props 테스트', () => {
    it('모든 props가 함께 전달될 때 올바르게 작동한다', () => {
      const allProps = {
        ...defaultProps,
        title: 'Complete Test',
        height: 'full' as const,
        className: 'test-class',
        disableBackdropClose: true,
        hasHandle: false,
        hasClose: false,
      };

      render(<BottomSheetModal {...allProps} />);

      const bottomSheetContent = screen.getByTestId('bottom-sheet-content');
      expect(bottomSheetContent).toHaveAttribute('data-title', 'Complete Test');
      expect(bottomSheetContent).toHaveAttribute('data-height', 'full');
      expect(bottomSheetContent).toHaveAttribute('data-class', 'test-class');
      expect(bottomSheetContent).toHaveAttribute(
        'data-disable-backdrop',
        'true'
      );
      expect(bottomSheetContent).toHaveAttribute('data-has-handle', 'false');
      expect(bottomSheetContent).toHaveAttribute('data-has-close', 'false');
    });
  });

  describe('컨텐츠 렌더링', () => {
    it('복잡한 children이 올바르게 렌더링된다', () => {
      const complexChildren = (
        <div>
          <h1>Title</h1>
          <p>Description</p>
          <button>Action</button>
        </div>
      );

      render(
        <BottomSheetModal trigger={<button>Open</button>}>
          {complexChildren}
        </BottomSheetModal>
      );

      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('복잡한 trigger가 올바르게 렌더링된다', () => {
      const complexTrigger = (
        <div>
          <span>Click me</span>
          <svg data-testid='icon'>
            <path />
          </svg>
        </div>
      );

      render(
        <BottomSheetModal trigger={complexTrigger}>
          <div>Content</div>
        </BottomSheetModal>
      );

      expect(screen.getByText('Click me')).toBeInTheDocument();
      expect(screen.getByTestId('icon')).toBeInTheDocument();
    });
  });

  describe('타입 안전성', () => {
    it('height prop이 올바른 타입만 허용된다', () => {
      // 이 테스트는 TypeScript 컴파일 시점에서 확인됨
      // 런타임에서는 유효한 값들만 테스트
      const validHeights = ['half', 'full', 'auto'] as const;

      validHeights.forEach((height) => {
        expect(() => {
          render(
            <BottomSheetModal
              {...defaultProps}
              height={height}
            />
          );
        }).not.toThrow();
      });
    });

    it('boolean props가 올바르게 작동한다', () => {
      const booleanProps = [
        { disableBackdropClose: true },
        { disableBackdropClose: false },
        { hasHandle: true },
        { hasHandle: false },
        { hasClose: true },
        { hasClose: false },
      ];

      booleanProps.forEach((prop) => {
        expect(() => {
          render(
            <BottomSheetModal
              {...defaultProps}
              {...prop}
            />
          );
        }).not.toThrow();
      });
    });
  });
});
