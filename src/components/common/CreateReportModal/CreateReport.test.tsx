import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { ReportTargetType } from '@/types/enums';
import CreateReportModal from './CreateReportModal';

// Mock 컴포넌트 타입 정의
interface MockButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: string;
  type?: string;
}

interface MockLoadingOverlayProps {
  style?: React.CSSProperties;
}

interface MockTextareaInputProps {
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  className?: string;
  placeholder?: string;
}

interface MockToastProps {
  message: string;
  type: string;
  onClose: () => void;
  className?: string;
}

// Mock 모듈들
jest.mock('@/components/common', () => ({
  Button: ({ children, onClick, disabled, variant, type }: MockButtonProps) => (
    <button
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      type={type as 'button' | 'submit' | 'reset'}
    >
      {children}
    </button>
  ),
  LoadingOverlay: ({ style }: MockLoadingOverlayProps) => (
    <div
      data-testid='loading-overlay'
      style={style}
    >
      Loading...
    </div>
  ),
  TextareaInput: ({
    value,
    onChange,
    maxLength,
    className,
    placeholder,
  }: MockTextareaInputProps) => (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      className={className}
      placeholder={placeholder}
      data-testid='details-textarea'
    />
  ),
  Toast: ({ message, type, onClose, className }: MockToastProps) => (
    <div
      data-testid='toast'
      data-type={type}
      className={className}
      onClick={onClose}
      onKeyDown={onClose}
      role='button'
      tabIndex={0}
    >
      {message}
    </div>
  ),
}));

interface MockDropdownProps {
  children: React.ReactNode;
}

interface MockDropdownItemProps {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}

interface MockDropdownTriggerProps {
  placeholder: string;
  className?: string;
}

jest.mock('@/components/common/Dropdown', () => ({
  Dropdown: ({ children }: MockDropdownProps) => (
    <div data-testid='dropdown'>{children}</div>
  ),
  DropdownContent: ({ children }: MockDropdownProps) => (
    <div data-testid='dropdown-content'>{children}</div>
  ),
  DropdownItem: ({ children, onClick, label }: MockDropdownItemProps) => (
    <button
      onClick={onClick}
      data-testid={`dropdown-item-${label}`}
    >
      {children}
    </button>
  ),
  DropdownTrigger: ({ placeholder, className }: MockDropdownTriggerProps) => (
    <button
      data-testid='dropdown-trigger'
      className={className}
    >
      {placeholder}
    </button>
  ),
}));

interface MockModalProps {
  children: React.ReactNode;
  disableBackdropClose?: boolean;
}

interface MockModalContentProps {
  children: React.ReactNode;
  className?: string;
}

interface MockModalChildProps {
  children: React.ReactNode;
}

jest.mock('@/components/common/Modal', () => ({
  Modal: ({ children, disableBackdropClose }: MockModalProps) => (
    <div
      data-testid='modal'
      data-disable-backdrop-close={disableBackdropClose}
    >
      {children}
    </div>
  ),
  ModalAction: ({ children }: MockModalChildProps) => (
    <div data-testid='modal-action'>{children}</div>
  ),
  ModalCancel: ({ children }: MockModalChildProps) => (
    <div data-testid='modal-cancel'>{children}</div>
  ),
  ModalContent: ({ children, className }: MockModalContentProps) => (
    <div
      data-testid='modal-content'
      className={className}
    >
      {children}
    </div>
  ),
  ModalTrigger: ({ children }: MockModalChildProps) => (
    <div data-testid='modal-trigger'>{children}</div>
  ),
}));

interface MockImageUploadProps {
  images: Array<{ file: File }>;
  upload: (files: File[]) => void;
  remove: (index: number) => void;
  reset: () => void;
}

jest.mock('./ImageUpload', () => {
  const ImageUpload = ({
    images,
    upload,
    remove,
    reset,
  }: MockImageUploadProps) => (
    <div data-testid='image-upload'>
      <button
        onClick={() =>
          upload([new File(['test'], 'test.jpg', { type: 'image/jpeg' })])
        }
      >
        Upload Image
      </button>
      <button onClick={() => remove(0)}>Remove Image</button>
      <button onClick={reset}>Reset Images</button>
      <span data-testid='image-count'>{images.length}</span>
    </div>
  );
  return ImageUpload;
});

// Hook mocks 타입 정의
interface MockError {
  message: string;
}

interface MockImageUploaderReturn {
  images: Array<{ file: File }>;
  upload: jest.Mock;
  remove: jest.Mock;
  reset: jest.Mock;
}

interface MockMutationReturn {
  mutateAsync: jest.Mock;
  isPending: boolean;
  error: MockError | null;
}

// Hook mocks
const mockImageUploader: MockImageUploaderReturn = {
  images: [],
  upload: jest.fn(),
  remove: jest.fn(),
  reset: jest.fn(),
};

const mockUploadMultipleFiles: MockMutationReturn = {
  mutateAsync: jest.fn(),
  isPending: false,
  error: null,
};

const mockPostReport: MockMutationReturn = {
  mutateAsync: jest.fn(),
  isPending: false,
  error: null,
};

jest.mock('@/hooks', () => ({
  useImageUploader: jest.fn(() => mockImageUploader),
}));

jest.mock('@/hooks/useGetPresignedUrl', () => ({
  useUploadMultipleFiles: jest.fn(() => mockUploadMultipleFiles),
}));

jest.mock('@/hooks/reportHooks', () => ({
  usePostReport: jest.fn(() => mockPostReport),
}));

jest.mock('@/constants/reportLabels', () => ({
  ReportReasonLabels: {
    SPAM: '스팸',
    INAPPROPRIATE_CONTENT: '부적절한 콘텐츠',
    HARASSMENT: '괴롭힘',
    FALSE_INFORMATION: '허위 정보',
    COPYRIGHT_VIOLATION: '저작권 침해',
  },
}));

describe('CreateReportModal', () => {
  const defaultProps = {
    targetId: 'target-123',
    category: 'POST' as ReportTargetType,
    children: <button>신고하기</button>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockImageUploader.images = [];
    mockUploadMultipleFiles.isPending = false;
    mockUploadMultipleFiles.error = null;
    mockPostReport.isPending = false;
    mockPostReport.error = null;
  });

  describe('렌더링', () => {
    it('모든 필수 요소들이 렌더링되어야 한다', () => {
      render(<CreateReportModal {...defaultProps} />);

      expect(
        screen.getByText('신고 사유를 선택해 주세요.(필수)')
      ).toBeInTheDocument();
      expect(
        screen.getByText('신고 상세 내용을 작성해주세요.')
      ).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-trigger')).toBeInTheDocument();
      expect(screen.getByTestId('details-textarea')).toBeInTheDocument();
      expect(screen.getByTestId('image-upload')).toBeInTheDocument();
      expect(screen.getByText('취소')).toBeInTheDocument();
      expect(screen.getByText('확인')).toBeInTheDocument();
    });

    it('children이 modal trigger로 래핑되어야 한다', () => {
      render(<CreateReportModal {...defaultProps} />);

      const modalTrigger = screen.getByTestId('modal-trigger');
      expect(modalTrigger).toContainElement(screen.getByText('신고하기'));
    });

    it('modal이 disableBackdropClose 속성으로 렌더링되어야 한다', () => {
      render(<CreateReportModal {...defaultProps} />);

      const modal = screen.getByTestId('modal');
      expect(modal).toHaveAttribute('data-disable-backdrop-close', 'true');
    });
  });

  describe('신고 사유 선택', () => {
    it('드롭다운에서 신고 사유를 선택할 수 있어야 한다', () => {
      render(<CreateReportModal {...defaultProps} />);

      // 드롭다운 항목들이 렌더링되는지 확인
      expect(screen.getByTestId('dropdown-item-스팸')).toBeInTheDocument();
      expect(
        screen.getByTestId('dropdown-item-부적절한 콘텐츠')
      ).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-item-괴롭힘')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-item-허위 정보')).toBeInTheDocument();
      expect(
        screen.getByTestId('dropdown-item-저작권 침해')
      ).toBeInTheDocument();
    });

    it('신고 사유를 클릭하면 선택되어야 한다', () => {
      render(<CreateReportModal {...defaultProps} />);

      const spamOption = screen.getByTestId('dropdown-item-스팸');
      fireEvent.click(spamOption);

      // 내부 상태 변경은 직접 테스트하기 어려우므로,
      // 확인 버튼의 disabled 상태로 간접 확인
      const confirmButton = screen.getByText('확인');
      expect(confirmButton).not.toBeDisabled();
    });
  });

  describe('상세 내용 입력', () => {
    it('텍스트 영역에 내용을 입력할 수 있어야 한다', async () => {
      const user = userEvent.setup();
      render(<CreateReportModal {...defaultProps} />);

      const textarea = screen.getByTestId('details-textarea');
      await user.type(textarea, '신고 상세 내용입니다.');

      expect(textarea).toHaveValue('신고 상세 내용입니다.');
    });

    it('텍스트 영역에 최대 200자 제한이 있어야 한다', () => {
      render(<CreateReportModal {...defaultProps} />);

      const textarea = screen.getByTestId('details-textarea');
      expect(textarea).toHaveAttribute('maxLength', '200');
    });
  });

  describe('이미지 업로드', () => {
    it('이미지 업로드 컴포넌트가 렌더링되어야 한다', () => {
      render(<CreateReportModal {...defaultProps} />);

      expect(screen.getByTestId('image-upload')).toBeInTheDocument();
    });

    it('이미지 업로드 기능이 동작해야 한다', () => {
      render(<CreateReportModal {...defaultProps} />);

      const uploadButton = screen.getByText('Upload Image');
      fireEvent.click(uploadButton);

      expect(mockImageUploader.upload).toHaveBeenCalled();
    });
  });

  describe('폼 제출', () => {
    beforeEach(() => {
      // 신고 사유가 선택된 상태로 설정
      mockPostReport.mutateAsync.mockResolvedValue({
        message: '신고가 접수되었습니다.',
      });
      mockUploadMultipleFiles.mutateAsync.mockResolvedValue([
        'https://example.com/image1.jpg',
      ]);
    });

    it('신고 사유가 선택되지 않으면 확인 버튼이 비활성화되어야 한다', () => {
      render(<CreateReportModal {...defaultProps} />);

      const confirmButton = screen.getByText('확인');
      expect(confirmButton).toBeDisabled();
    });

    it('로딩 중일 때 버튼들이 비활성화되어야 한다', () => {
      mockPostReport.isPending = true;
      render(<CreateReportModal {...defaultProps} />);

      const confirmButton = screen.getByText('확인');
      const cancelButton = screen.getByText('취소');

      expect(confirmButton).toBeDisabled();
      expect(cancelButton).toBeDisabled();
    });

    it('로딩 중일 때 로딩 오버레이가 표시되어야 한다', () => {
      mockPostReport.isPending = true;
      render(<CreateReportModal {...defaultProps} />);

      expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
    });

    it('이미지가 있을 때 이미지 업로드 후 신고를 제출해야 한다', async () => {
      mockImageUploader.images = [
        { file: new File(['test'], 'test.jpg', { type: 'image/jpeg' }) },
      ];

      render(<CreateReportModal {...defaultProps} />);

      // 신고 사유 선택
      const spamOption = screen.getByTestId('dropdown-item-스팸');
      fireEvent.click(spamOption);

      const confirmButton = screen.getByText('확인');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockUploadMultipleFiles.mutateAsync).toHaveBeenCalled();
        expect(mockPostReport.mutateAsync).toHaveBeenCalled();
      });
    });

    it('이미지가 없을 때 바로 신고를 제출해야 한다', async () => {
      render(<CreateReportModal {...defaultProps} />);

      // 신고 사유 선택
      const spamOption = screen.getByTestId('dropdown-item-스팸');
      fireEvent.click(spamOption);

      const confirmButton = screen.getByText('확인');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockUploadMultipleFiles.mutateAsync).not.toHaveBeenCalled();
        expect(mockPostReport.mutateAsync).toHaveBeenCalledWith({
          targetId: 'target-123',
          category: 'POST',
          reason: 'SPAM',
          snapshots: [],
          details: '',
        });
      });
    });
  });

  describe('에러 처리', () => {
    it('이미지 업로드 에러 시 토스트를 표시해야 한다', () => {
      mockUploadMultipleFiles.error = { message: '이미지 업로드 실패' };
      render(<CreateReportModal {...defaultProps} />);

      expect(screen.getByTestId('toast')).toBeInTheDocument();
      expect(screen.getByText('이미지 업로드 실패')).toBeInTheDocument();
      expect(screen.getByTestId('toast')).toHaveAttribute('data-type', 'error');
    });

    it('신고 제출 에러 시 토스트를 표시해야 한다', () => {
      mockPostReport.error = { message: '신고 제출 실패' };
      render(<CreateReportModal {...defaultProps} />);

      expect(screen.getByTestId('toast')).toBeInTheDocument();
      expect(screen.getByText('신고 제출 실패')).toBeInTheDocument();
      expect(screen.getByTestId('toast')).toHaveAttribute('data-type', 'error');
    });
  });

  describe('성공 처리', () => {
    it('신고 제출 성공 시 성공 토스트를 표시해야 한다', async () => {
      mockPostReport.mutateAsync.mockResolvedValue({
        message: '신고가 접수되었습니다.',
      });

      render(<CreateReportModal {...defaultProps} />);

      // 신고 사유 선택
      const spamOption = screen.getByTestId('dropdown-item-스팸');
      fireEvent.click(spamOption);

      const confirmButton = screen.getByText('확인');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(screen.getByTestId('toast')).toBeInTheDocument();
        expect(screen.getByText('신고가 접수되었습니다.')).toBeInTheDocument();
        expect(screen.getByTestId('toast')).toHaveAttribute(
          'data-type',
          'success'
        );
      });
    });
  });

  describe('폼 리셋', () => {
    it('취소 버튼 클릭 시 폼이 리셋되어야 한다', async () => {
      const user = userEvent.setup();
      render(<CreateReportModal {...defaultProps} />);

      // 텍스트 입력
      const textarea = screen.getByTestId('details-textarea');
      await user.type(textarea, '테스트 내용');

      // 취소 버튼 클릭
      const cancelButton = screen.getByText('취소');
      fireEvent.click(cancelButton);

      expect(textarea).toHaveValue('');
    });

    it('성공 후 폼이 자동으로 리셋되어야 한다', async () => {
      mockPostReport.mutateAsync.mockResolvedValue({
        message: '신고가 접수되었습니다.',
      });

      const user = userEvent.setup();
      render(<CreateReportModal {...defaultProps} />);

      // 텍스트 입력
      const textarea = screen.getByTestId('details-textarea');
      await user.type(textarea, '테스트 내용');

      // 신고 사유 선택 및 제출
      const spamOption = screen.getByTestId('dropdown-item-스팸');
      fireEvent.click(spamOption);

      const confirmButton = screen.getByText('확인');
      fireEvent.click(confirmButton);

      await waitFor(() => {
        expect(mockImageUploader.reset).toHaveBeenCalled();
      });
    });
  });

  describe('토스트 닫기', () => {
    it('토스트 클릭 시 닫혀야 한다', () => {
      mockPostReport.error = { message: '에러 메시지' };
      render(<CreateReportModal {...defaultProps} />);

      const toast = screen.getByTestId('toast');
      fireEvent.click(toast);

      expect(screen.queryByTestId('toast')).not.toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('모든 폼 요소들이 적절한 라벨을 가져야 한다', () => {
      render(<CreateReportModal {...defaultProps} />);

      expect(
        screen.getByText('신고 사유를 선택해 주세요.(필수)')
      ).toBeInTheDocument();
      expect(
        screen.getByText('신고 상세 내용을 작성해주세요.')
      ).toBeInTheDocument();
    });

    it('텍스트 영역에 placeholder가 설정되어야 한다', () => {
      render(<CreateReportModal {...defaultProps} />);

      const textarea = screen.getByTestId('details-textarea');
      expect(textarea).toHaveAttribute(
        'placeholder',
        '상세 내용을 작성해주세요'
      );
    });
  });
});
