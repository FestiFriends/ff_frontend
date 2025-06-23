import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TwoButton from './TwoButton';

jest.mock('@/components/common', () => ({
  Button: ({ 
    children, 
    onClick, 
    disabled, 
    variant, 
    className, 
    type 
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    variant?: string;
    className?: string;
    type?: string;
  }) => (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-variant={variant}
      className={className}
    >
      {children}
    </button>
  ),
  buttonStyles: {
    variants: {
      primary: 'primary',
      secondary: 'secondary',
      danger: 'danger',
    },
  },
}));

jest.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
}));

describe('TwoButton', () => {
  const defaultProps = {
    leftText: '취소',
    rightText: '확인',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('기본 렌더링', () => {
    it('두 개의 버튼이 올바르게 렌더링된다', () => {
      render(<TwoButton {...defaultProps} />);

      expect(screen.getByText('취소')).toBeInTheDocument();
      expect(screen.getByText('확인')).toBeInTheDocument();
    });

    it('기본 variant가 올바르게 적용된다', () => {
      render(<TwoButton {...defaultProps} />);

      const leftButton = screen.getByText('취소');
      const rightButton = screen.getByText('확인');

      expect(leftButton).toHaveAttribute('data-variant', 'secondary');
      expect(rightButton).toHaveAttribute('data-variant', 'primary');
    });

    it('기본적으로 버튼들이 활성화되어 있다', () => {
      render(<TwoButton {...defaultProps} />);

      const leftButton = screen.getByText('취소');
      const rightButton = screen.getByText('확인');

      expect(leftButton).not.toBeDisabled();
      expect(rightButton).not.toBeDisabled();
    });
  });

  describe('props 전달 테스트', () => {
    it('leftVariant와 rightVariant가 올바르게 적용된다', () => {
      render(
        <TwoButton 
          {...defaultProps} 
          leftVariant="danger" 
          rightVariant="secondary" 
        />
      );

      const leftButton = screen.getByText('취소');
      const rightButton = screen.getByText('확인');

      expect(leftButton).toHaveAttribute('data-variant', 'danger');
      expect(rightButton).toHaveAttribute('data-variant', 'secondary');
    });

    it('leftDisabled가 올바르게 적용된다', () => {
      render(<TwoButton {...defaultProps} leftDisabled={true} />);

      const leftButton = screen.getByText('취소');
      const rightButton = screen.getByText('확인');

      expect(leftButton).toBeDisabled();
      expect(rightButton).not.toBeDisabled();
    });

    it('rightDisabled가 올바르게 적용된다', () => {
      render(<TwoButton {...defaultProps} rightDisabled={true} />);

      const leftButton = screen.getByText('취소');
      const rightButton = screen.getByText('확인');

      expect(leftButton).not.toBeDisabled();
      expect(rightButton).toBeDisabled();
    });

    it('className이 올바르게 적용된다', () => {
      const { container } = render(
        <TwoButton {...defaultProps} className="custom-class" />
      );

      const twoButtonDiv = container.firstChild as HTMLElement;
      expect(twoButtonDiv).toHaveClass('custom-class');
    });

    it('leftClassName과 rightClassName이 올바르게 적용된다', () => {
      render(
        <TwoButton 
          {...defaultProps} 
          leftClassName="left-custom" 
          rightClassName="right-custom" 
        />
      );

      const leftButton = screen.getByText('취소');
      const rightButton = screen.getByText('확인');

      expect(leftButton).toHaveClass('left-custom');
      expect(rightButton).toHaveClass('right-custom');
    });
  });

  describe('클릭 이벤트 테스트', () => {
    it('leftAction이 올바르게 호출된다', () => {
      const leftAction = jest.fn();
      render(<TwoButton {...defaultProps} leftAction={leftAction} />);

      const leftButton = screen.getByText('취소');
      fireEvent.click(leftButton);

      expect(leftAction).toHaveBeenCalledTimes(1);
    });

    it('rightAction이 올바르게 호출된다', () => {
      const rightAction = jest.fn();
      render(<TwoButton {...defaultProps} rightAction={rightAction} />);

      const rightButton = screen.getByText('확인');
      fireEvent.click(rightButton);

      expect(rightAction).toHaveBeenCalledTimes(1);
    });

    it('disabled된 leftButton 클릭 시 leftAction이 호출되지 않는다', () => {
      const leftAction = jest.fn();
      render(
        <TwoButton 
          {...defaultProps} 
          leftAction={leftAction} 
          leftDisabled={true} 
        />
      );

      const leftButton = screen.getByText('취소');
      fireEvent.click(leftButton);

      expect(leftAction).not.toHaveBeenCalled();
    });

    it('disabled된 rightButton 클릭 시 rightAction이 호출되지 않는다', () => {
      const rightAction = jest.fn();
      render(
        <TwoButton 
          {...defaultProps} 
          rightAction={rightAction} 
          rightDisabled={true} 
        />
      );

      const rightButton = screen.getByText('확인');
      fireEvent.click(rightButton);

      expect(rightAction).not.toHaveBeenCalled();
    });
  });

  describe('onRightDisabledClick 기능 테스트', () => {
    it('rightDisabled이고 onRightDisabledClick이 있을 때 클릭 시 onRightDisabledClick이 호출된다', () => {
      const rightAction = jest.fn();
      const onRightDisabledClick = jest.fn();
      render(
        <TwoButton 
          {...defaultProps} 
          rightAction={rightAction}
          rightDisabled={true}
          onRightDisabledClick={onRightDisabledClick}
        />
      );

      const rightButton = screen.getByText('확인');
      fireEvent.click(rightButton);

      expect(onRightDisabledClick).toHaveBeenCalledTimes(1);
      expect(rightAction).not.toHaveBeenCalled();
    });

    it('rightDisabled이고 onRightDisabledClick이 있을 때 rightAction은 호출되지 않는다', () => {
      const rightAction = jest.fn();
      const onRightDisabledClick = jest.fn();
      render(
        <TwoButton 
          {...defaultProps} 
          rightAction={rightAction}
          rightDisabled={true}
          onRightDisabledClick={onRightDisabledClick}
        />
      );

      const rightButton = screen.getByText('확인');
      fireEvent.click(rightButton);

      expect(rightAction).not.toHaveBeenCalled();
    });

    it('rightDisabled이 false일 때는 onRightDisabledClick이 호출되지 않는다', () => {
      const rightAction = jest.fn();
      const onRightDisabledClick = jest.fn();
      render(
        <TwoButton 
          {...defaultProps} 
          rightAction={rightAction}
          rightDisabled={false}
          onRightDisabledClick={onRightDisabledClick}
        />
      );

      const rightButton = screen.getByText('확인');
      fireEvent.click(rightButton);

      expect(rightAction).toHaveBeenCalledTimes(1);
      expect(onRightDisabledClick).not.toHaveBeenCalled();
    });

    it('onRightDisabledClick이 있을 때 rightButton이 활성화된다', () => {
      render(
        <TwoButton 
          {...defaultProps} 
          rightDisabled={true}
          onRightDisabledClick={jest.fn()}
        />
      );

      const rightButton = screen.getByText('확인');
      expect(rightButton).not.toBeDisabled();
    });

    it('onRightDisabledClick이 없을 때 rightButton이 비활성화된다', () => {
      render(<TwoButton {...defaultProps} rightDisabled={true} />);

      const rightButton = screen.getByText('확인');
      expect(rightButton).toBeDisabled();
    });
  });

  describe('스타일링 테스트', () => {
    it('rightDisabled이고 onRightDisabledClick이 없을 때 적절한 클래스가 적용된다', () => {
      render(<TwoButton {...defaultProps} rightDisabled={true} />);

      const rightButton = screen.getByText('확인');
      expect(rightButton).toHaveClass('cursor-not-allowed', 'opacity-50');
    });

    it('rightDisabled이고 onRightDisabledClick이 있을 때 적절한 클래스가 적용된다', () => {
      render(
        <TwoButton 
          {...defaultProps} 
          rightDisabled={true} 
          onRightDisabledClick={jest.fn()} 
        />
      );

      const rightButton = screen.getByText('확인');
      expect(rightButton).toHaveClass('cursor-pointer', 'opacity-50');
    });

    it('기본 flex 클래스가 적용된다', () => {
      const { container } = render(<TwoButton {...defaultProps} />);

      const twoButtonDiv = container.firstChild as HTMLElement;
      expect(twoButtonDiv).toHaveClass('flex', 'gap-4');
    });

    it('버튼들에 flex-1 클래스가 적용된다', () => {
      render(<TwoButton {...defaultProps} />);

      const leftButton = screen.getByText('취소');
      const rightButton = screen.getByText('확인');

      expect(leftButton).toHaveClass('flex-1', 'whitespace-nowrap');
      expect(rightButton).toHaveClass('flex-1', 'whitespace-nowrap');
    });
  });

  describe('통합 테스트', () => {
    it('모든 props가 함께 전달될 때 올바르게 작동한다', () => {
      const leftAction = jest.fn();
      const rightAction = jest.fn();
      const onRightDisabledClick = jest.fn();

      render(
        <TwoButton 
          leftText="Delete"
          rightText="Save"
          leftAction={leftAction}
          rightAction={rightAction}
          leftVariant="danger"
          rightVariant="primary"
          leftDisabled={false}
          rightDisabled={true}
          onRightDisabledClick={onRightDisabledClick}
          className="custom-wrapper"
          leftClassName="custom-left"
          rightClassName="custom-right"
        />
      );

      const leftButton = screen.getByText('Delete');
      const rightButton = screen.getByText('Save');

      // 텍스트 확인
      expect(leftButton).toBeInTheDocument();
      expect(rightButton).toBeInTheDocument();

      // variant 확인
      expect(leftButton).toHaveAttribute('data-variant', 'danger');
      expect(rightButton).toHaveAttribute('data-variant', 'primary');

      // 클래스 확인
      expect(leftButton).toHaveClass('custom-left');
      expect(rightButton).toHaveClass('custom-right');

      // 클릭 이벤트 확인
      fireEvent.click(leftButton);
      expect(leftAction).toHaveBeenCalledTimes(1);

      fireEvent.click(rightButton);
      expect(onRightDisabledClick).toHaveBeenCalledTimes(1);
      expect(rightAction).not.toHaveBeenCalled();
    });
  });
});