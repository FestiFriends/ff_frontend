import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook, act } from '@testing-library/react';
import TwoButtonModal, { useModalController } from './TwoButtonModal';
import type { ModalStyles } from './TwoButtonModal.style';

interface MockModalProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  disableBackdropClose?: boolean;
  onClose?: () => void;
}

interface MockModalContentProps {
  children: React.ReactNode;
  className?: string;
}

interface MockModalButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

jest.mock('@/components/common/Modal', () => ({
  Modal: ({ children, onClose, defaultOpen }: MockModalProps) => (
    <div
      data-testid='modal'
      data-open={defaultOpen}
    >
      {children}
      <button
        onClick={onClose}
        data-testid='backdrop'
      >
        backdrop
      </button>
    </div>
  ),
  ModalContent: ({ children, className }: MockModalContentProps) => (
    <div
      data-testid='modal-content'
      className={className}
    >
      {children}
    </div>
  ),
  ModalClose: ({ className }: MockModalButtonProps) => (
    <button
      className={className}
      data-testid='close-button'
    >
      ×
    </button>
  ),
  ModalAction: ({ children, onClick, className }: MockModalButtonProps) => (
    <button
      onClick={onClick}
      className={className}
      data-testid='confirm-button'
    >
      {children}
    </button>
  ),
  ModalCancel: ({ children, onClick, className }: MockModalButtonProps) => (
    <button
      onClick={onClick}
      className={className}
      data-testid='cancel-button'
    >
      {children}
    </button>
  ),
}));

// Mock styles
jest.mock('./TwoButtonModal.style', () => ({
  modalVariants: {
    default: {
      modal: 'default-modal',
      header: 'default-header',
      content: 'default-content',
      confirmButton: 'default-confirm',
      cancelButton: 'default-cancel',
    },
    danger: {
      modal: 'danger-modal',
      header: 'danger-header',
      content: 'danger-content',
      confirmButton: 'danger-confirm',
      cancelButton: 'danger-cancel',
    },
  },
  mergeModalStyles: (
    base: Partial<ModalStyles>,
    custom: Partial<ModalStyles>
  ) => ({ ...base, ...custom }),
}));

describe('useModalController', () => {
  it('초기 상태는 닫힌 상태여야 함', () => {
    const { result } = renderHook(() => useModalController());

    expect(result.current.isOpen).toBe(false);
  });

  it('openModal 호출 시 모달이 열려야 함', () => {
    const { result } = renderHook(() => useModalController());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it('closeModal 호출 시 모달이 닫혀야 함', () => {
    const { result } = renderHook(() => useModalController());

    act(() => {
      result.current.openModal();
      result.current.closeModal();
    });

    expect(result.current.isOpen).toBe(false);
  });
});

describe('TwoButtonModal', () => {
  const defaultProps = {
    isOpen: true,
    onModalClose: jest.fn(),
    title: 'Test Title',
    message: 'Test Message',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('isOpen이 false일 때 렌더링되지 않아야 함', () => {
    render(
      <TwoButtonModal
        {...defaultProps}
        isOpen={false}
      />
    );

    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('isOpen이 true일 때 모달이 렌더링되어야 함', () => {
    render(<TwoButtonModal {...defaultProps} />);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });

  it('기본 버튼 텍스트가 표시되어야 함', () => {
    render(<TwoButtonModal {...defaultProps} />);

    expect(screen.getByText('확인')).toBeInTheDocument();
    expect(screen.getByText('취소')).toBeInTheDocument();
  });

  it('커스텀 버튼 텍스트가 표시되어야 함', () => {
    render(
      <TwoButtonModal
        {...defaultProps}
        confirmText='삭제'
        cancelText='닫기'
      />
    );

    expect(screen.getByText('삭제')).toBeInTheDocument();
    expect(screen.getByText('닫기')).toBeInTheDocument();
  });

  it('확인 버튼 클릭 시 onConfirm이 호출되고 모달이 닫혀야 함', async () => {
    const onConfirm = jest.fn();
    const onModalClose = jest.fn();

    render(
      <TwoButtonModal
        {...defaultProps}
        onConfirm={onConfirm}
        onModalClose={onModalClose}
      />
    );

    fireEvent.click(screen.getByTestId('confirm-button'));

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onModalClose).toHaveBeenCalledTimes(1);
    });
  });

  it('취소 버튼 클릭 시 onCancel이 호출되고 모달이 닫혀야 함', () => {
    const onCancel = jest.fn();
    const onModalClose = jest.fn();

    render(
      <TwoButtonModal
        {...defaultProps}
        onCancel={onCancel}
        onModalClose={onModalClose}
      />
    );

    fireEvent.click(screen.getByTestId('cancel-button'));

    expect(onCancel).toHaveBeenCalledTimes(1);
    expect(onModalClose).toHaveBeenCalledTimes(1);
  });

  it('닫기 버튼 클릭 시 onClose가 호출되고 모달이 닫혀야 함', async () => {
    const onClose = jest.fn();
    const onModalClose = jest.fn();

    render(
      <TwoButtonModal
        {...defaultProps}
        onClose={onClose}
        onModalClose={onModalClose}
      />
    );

    fireEvent.click(screen.getByTestId('backdrop'));

    await waitFor(() => {
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onModalClose).toHaveBeenCalledTimes(1);
    });
  });

  it('variant에 따른 스타일이 적용되어야 함', () => {
    render(
      <TwoButtonModal
        {...defaultProps}
        variant='danger'
      />
    );

    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('danger-modal');
  });

  it('커스텀 스타일이 적용되어야 함', () => {
    render(
      <TwoButtonModal
        {...defaultProps}
        styles={{
          modal: 'custom-modal-class',
        }}
      />
    );

    const modalContent = screen.getByTestId('modal-content');
    expect(modalContent).toHaveClass('custom-modal-class');
  });

  it('비동기 onConfirm 처리', async () => {
    const onConfirm = jest.fn().mockResolvedValue(undefined);
    const onModalClose = jest.fn();

    render(
      <TwoButtonModal
        {...defaultProps}
        onConfirm={onConfirm}
        onModalClose={onModalClose}
      />
    );

    fireEvent.click(screen.getByTestId('confirm-button'));

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onModalClose).toHaveBeenCalledTimes(1);
    });
  });

  it('onConfirm 에러 발생 시 모달이 닫히지 않아야 함', async () => {
    const onConfirm = jest.fn().mockRejectedValue(new Error('Test Error'));
    const onModalClose = jest.fn();
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <TwoButtonModal
        {...defaultProps}
        onConfirm={onConfirm}
        onModalClose={onModalClose}
      />
    );

    fireEvent.click(screen.getByTestId('confirm-button'));

    await waitFor(() => {
      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onModalClose).not.toHaveBeenCalled();
      expect(consoleSpy).toHaveBeenCalledWith(
        'Modal confirm error:',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});

describe('Integration Test', () => {
  it('useModalController와 TwoButtonModal 통합 테스트', () => {
    const TestComponent = () => {
      const modal = useModalController();
      const onConfirm = jest.fn();

      return (
        <>
          <button
            onClick={modal.openModal}
            data-testid='trigger'
          >
            Open Modal
          </button>
          <TwoButtonModal
            isOpen={modal.isOpen}
            onModalClose={modal.closeModal}
            title='Test Modal'
            message='Test Message'
            onConfirm={onConfirm}
          />
        </>
      );
    };

    render(<TestComponent />);

    // 초기 상태: 모달이 닫혀있음
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();

    // 트리거 버튼 클릭: 모달 열림
    fireEvent.click(screen.getByTestId('trigger'));
    expect(screen.getByTestId('modal')).toBeInTheDocument();

    // 취소 버튼 클릭: 모달 닫힘
    fireEvent.click(screen.getByTestId('cancel-button'));
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
