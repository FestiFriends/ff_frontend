import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import BottomSheetModal from './BottomSheetModal';

const mockCloseModal = jest.fn();

jest.mock('@/components/common/Modal', () => {
  const ModalProvider = ({ children }: { children: React.ReactNode }) => (
    <div data-testid='modal-provider'>{children}</div>
  );

  return {
    Modal: ({
      children,
      disableBackdropClose,
    }: {
      children: React.ReactNode;
      disableBackdropClose: boolean;
    }) => (
      <ModalProvider>
        <div
          data-testid='modal-wrapper'
          data-disable-backdrop={disableBackdropClose}
        >
          {children}
        </div>
      </ModalProvider>
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
  };
});

jest.mock('@/components/common/Modal/ModalContext', () => ({
  useModalContext: () => ({
    closeModal: mockCloseModal,
  }),
}));

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

jest.mock('@/components/common', () => ({
  TwoButton: ({
    leftText,
    rightText,
    leftAction,
    rightAction,
    leftVariant,
    rightVariant,
    leftDisabled,
    rightDisabled,
  }: {
    leftText: string;
    rightText: string;
    leftAction?: () => void;
    rightAction?: () => void;
    leftVariant?: string;
    rightVariant?: string;
    leftDisabled?: boolean;
    rightDisabled?: boolean;
  }) => (
    <div data-testid='two-button'>
      <button
        data-testid='left-button'
        onClick={leftAction}
        disabled={leftDisabled}
        data-variant={leftVariant}
      >
        {leftText}
      </button>
      <button
        data-testid='right-button'
        onClick={rightAction}
        disabled={rightDisabled}
        data-variant={rightVariant}
      >
        {rightText}
      </button>
    </div>
  ),
  buttonStyles: {
    variants: {
      primary: 'primary',
      secondary: 'secondary',
    },
  },
}));

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

    it('controlType이 none일 때 기본 동작한다', () => {
      render(
        <BottomSheetModal
          {...defaultProps}
          controlType='none'
        />
      );

      expect(screen.queryByTestId('two-button')).not.toBeInTheDocument();
    });

    it('controlType이 headerControl일 때 TwoButton이 헤더에 렌더링된다', () => {
      const twoButtonProps = {
        leftText: 'Cancel',
        rightText: 'Confirm',
        leftAction: jest.fn(),
        rightAction: jest.fn(),
      };

      render(
        <BottomSheetModal
          {...defaultProps}
          controlType='headerControl'
          twoButtonProps={twoButtonProps}
        />
      );

      expect(screen.getByTestId('two-button')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Confirm')).toBeInTheDocument();
    });

    it('controlType이 bottomControl일 때 TwoButton이 하단에 렌더링된다', () => {
      const twoButtonProps = {
        leftText: 'Cancel',
        rightText: 'Save',
        leftAction: jest.fn(),
        rightAction: jest.fn(),
      };

      render(
        <BottomSheetModal
          {...defaultProps}
          controlType='bottomControl'
          twoButtonProps={twoButtonProps}
        />
      );

      expect(screen.getByTestId('two-button')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
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

  describe('TwoButton 기능 테스트', () => {
    beforeEach(() => {
      mockCloseModal.mockClear();
      jest.clearAllMocks();
    });

    it('TwoButton의 leftAction이 올바르게 호출된다', () => {
      const leftAction = jest.fn();
      const twoButtonProps = {
        leftText: 'Cancel',
        rightText: 'Confirm',
        leftAction,
        rightAction: jest.fn(),
      };

      render(
        <BottomSheetModal
          {...defaultProps}
          controlType='headerControl'
          twoButtonProps={twoButtonProps}
        />
      );

      const leftButton = screen.getByTestId('left-button');
      fireEvent.click(leftButton);

      expect(leftAction).toHaveBeenCalledTimes(1);
    });

    it('TwoButton의 rightAction이 호출되고 모달이 닫힌다', () => {
      const rightAction = jest.fn();
      const twoButtonProps = {
        leftText: 'Cancel',
        rightText: 'Confirm',
        leftAction: jest.fn(),
        rightAction,
      };

      render(
        <BottomSheetModal
          {...defaultProps}
          controlType='headerControl'
          twoButtonProps={twoButtonProps}
        />
      );

      const rightButton = screen.getByTestId('right-button');
      fireEvent.click(rightButton);

      expect(rightAction).toHaveBeenCalledTimes(1);
    });

    it('TwoButton의 variant props가 올바르게 전달된다', () => {
      const twoButtonProps = {
        leftText: 'Cancel',
        rightText: 'Confirm',
        leftVariant: 'secondary' as const,
        rightVariant: 'primary' as const,
      };

      render(
        <BottomSheetModal
          {...defaultProps}
          controlType='headerControl'
          twoButtonProps={twoButtonProps}
        />
      );

      const leftButton = screen.getByTestId('left-button');
      const rightButton = screen.getByTestId('right-button');

      expect(leftButton).toHaveAttribute('data-variant', 'secondary');
      expect(rightButton).toHaveAttribute('data-variant', 'primary');
    });

    it('TwoButton의 disabled props가 올바르게 전달된다', () => {
      const twoButtonProps = {
        leftText: 'Cancel',
        rightText: 'Confirm',
        leftDisabled: true,
        rightDisabled: false,
      };

      render(
        <BottomSheetModal
          {...defaultProps}
          controlType='headerControl'
          twoButtonProps={twoButtonProps}
        />
      );

      const leftButton = screen.getByTestId('left-button');
      const rightButton = screen.getByTestId('right-button');

      expect(leftButton).toBeDisabled();
      expect(rightButton).not.toBeDisabled();
    });
  });

  describe('hasClose 동작 테스트', () => {
    it('controlType이 headerControl일 때 hasClose가 true로 설정된다', () => {
      render(
        <BottomSheetModal
          {...defaultProps}
          controlType='headerControl'
          hasClose={false}
          twoButtonProps={{
            leftText: 'Cancel',
            rightText: 'Confirm',
          }}
        />
      );

      const bottomSheetContent = screen.getByTestId('bottom-sheet-content');
      expect(bottomSheetContent).toHaveAttribute('data-has-close', 'true');
    });

    it('controlType이 headerControl이 아닐 때 hasClose 값이 유지된다', () => {
      render(
        <BottomSheetModal
          {...defaultProps}
          controlType='bottomControl'
          hasClose={false}
          twoButtonProps={{
            leftText: 'Cancel',
            rightText: 'Confirm',
          }}
        />
      );

      const bottomSheetContent = screen.getByTestId('bottom-sheet-content');
      expect(bottomSheetContent).toHaveAttribute('data-has-close', 'false');
    });
  });

  describe('타입 안전성', () => {
    it('height prop이 올바른 타입만 허용된다', () => {
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

    it('controlType prop이 올바른 타입만 허용된다', () => {
      const validControlTypes = ['none', 'headerControl', 'bottomControl'] as const;

      validControlTypes.forEach((controlType) => {
        expect(() => {
          render(
            <BottomSheetModal
              {...defaultProps}
              controlType={controlType}
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
