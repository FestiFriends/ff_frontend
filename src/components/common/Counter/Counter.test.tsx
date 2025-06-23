import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './Counter';

describe('Counter', () => {
  const defaultProps = {
    value: 5,
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('기본 렌더링', () => {
    it('카운터가 올바르게 렌더링된다', () => {
      render(<Counter {...defaultProps} />);

      expect(screen.getByDisplayValue('5')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '-' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
      expect(screen.getByText('명')).toBeInTheDocument();
    });

    it('기본 props가 올바르게 적용된다', () => {
      render(<Counter {...defaultProps} />);

      const decrementButton = screen.getByRole('button', { name: '-' });
      const incrementButton = screen.getByRole('button', { name: '+' });
      const input = screen.getByDisplayValue('5');

      expect(decrementButton).not.toBeDisabled();
      expect(incrementButton).not.toBeDisabled();
      expect(input).not.toBeDisabled();
    });
  });

  describe('props 전달 테스트', () => {
    it('min prop이 올바르게 적용된다', () => {
      render(
        <Counter
          {...defaultProps}
          value={2}
          min={2}
        />
      );

      const decrementButton = screen.getByRole('button', { name: '-' });
      expect(decrementButton).toBeDisabled();
    });

    it('max prop이 올바르게 적용된다', () => {
      render(
        <Counter
          {...defaultProps}
          value={10}
          max={10}
        />
      );

      const incrementButton = screen.getByRole('button', { name: '+' });
      expect(incrementButton).toBeDisabled();
    });

    it('disabled prop이 올바르게 적용된다', () => {
      render(
        <Counter
          {...defaultProps}
          disabled={true}
        />
      );

      const decrementButton = screen.getByRole('button', { name: '-' });
      const incrementButton = screen.getByRole('button', { name: '+' });
      const input = screen.getByDisplayValue('5');

      expect(decrementButton).toBeDisabled();
      expect(incrementButton).toBeDisabled();
      expect(input).toBeDisabled();
    });

    it('className이 올바르게 적용된다', () => {
      const { container } = render(
        <Counter
          {...defaultProps}
          className='custom-class'
        />
      );

      const counterDiv = container.firstChild as HTMLElement;
      expect(counterDiv).toHaveClass('custom-class');
    });
  });

  describe('increment 기능', () => {
    it('+ 버튼 클릭 시 value가 1 증가한다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          {...defaultProps}
          onChange={onChange}
        />
      );

      const incrementButton = screen.getByRole('button', { name: '+' });
      fireEvent.click(incrementButton);

      expect(onChange).toHaveBeenCalledWith(6);
    });

    it('최대값에서 + 버튼 클릭 시 최대값을 유지한다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          {...defaultProps}
          value={10}
          max={10}
          onChange={onChange}
        />
      );

      const incrementButton = screen.getByRole('button', { name: '+' });
      expect(incrementButton).toBeDisabled();

      // disabled 상태에서는 onClick이 호출되지 않음
      fireEvent.click(incrementButton);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('최대값 근처에서 + 버튼 클릭 시 최대값으로 제한된다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          {...defaultProps}
          value={9}
          max={10}
          onChange={onChange}
        />
      );

      const incrementButton = screen.getByRole('button', { name: '+' });
      fireEvent.click(incrementButton);

      expect(onChange).toHaveBeenCalledWith(10);
    });
  });

  describe('decrement 기능', () => {
    it('- 버튼 클릭 시 value가 1 감소한다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          {...defaultProps}
          onChange={onChange}
        />
      );

      const decrementButton = screen.getByRole('button', { name: '-' });
      fireEvent.click(decrementButton);

      expect(onChange).toHaveBeenCalledWith(4);
    });

    it('최소값에서 - 버튼 클릭 시 최소값을 유지한다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          {...defaultProps}
          value={0}
          min={0}
          onChange={onChange}
        />
      );

      const decrementButton = screen.getByRole('button', { name: '-' });
      expect(decrementButton).toBeDisabled();

      // disabled 상태에서는 onClick이 호출되지 않음
      fireEvent.click(decrementButton);
      expect(onChange).not.toHaveBeenCalled();
    });

    it('최소값 근처에서 - 버튼 클릭 시 최소값으로 제한된다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          {...defaultProps}
          value={1}
          min={0}
          onChange={onChange}
        />
      );

      const decrementButton = screen.getByRole('button', { name: '-' });
      fireEvent.click(decrementButton);

      expect(onChange).toHaveBeenCalledWith(0);
    });
  });

  describe('입력 필드 기능', () => {
    it('유효한 숫자 입력 시 값이 변경된다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          {...defaultProps}
          onChange={onChange}
        />
      );

      const input = screen.getByDisplayValue('5');
      fireEvent.change(input, { target: { value: '7' } });

      expect(onChange).toHaveBeenCalledWith(7);
    });

    it('최대값을 초과하는 입력 시 최대값으로 제한된다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          {...defaultProps}
          max={10}
          onChange={onChange}
        />
      );

      const input = screen.getByDisplayValue('5');
      fireEvent.change(input, { target: { value: '15' } });

      expect(onChange).toHaveBeenCalledWith(10);
    });

    it('최소값보다 작은 입력 시 최소값으로 제한된다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          {...defaultProps}
          min={2}
          onChange={onChange}
        />
      );

      const input = screen.getByDisplayValue('5');
      fireEvent.change(input, { target: { value: '1' } });

      expect(onChange).toHaveBeenCalledWith(2);
    });

    it('유효하지 않은 입력 시 최소값으로 설정된다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          {...defaultProps}
          min={1}
          onChange={onChange}
        />
      );

      const input = screen.getByDisplayValue('5');
      fireEvent.change(input, { target: { value: 'abc' } });

      expect(onChange).toHaveBeenCalledWith(1);
    });

    it('빈 입력 시 최소값으로 설정된다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          {...defaultProps}
          min={3}
          onChange={onChange}
        />
      );

      const input = screen.getByDisplayValue('5');
      fireEvent.change(input, { target: { value: '' } });

      expect(onChange).toHaveBeenCalledWith(3);
    });
  });

  describe('버튼 상태 테스트', () => {
    it('최소값일 때 감소 버튼이 비활성화된다', () => {
      render(
        <Counter
          {...defaultProps}
          value={0}
          min={0}
        />
      );

      const decrementButton = screen.getByRole('button', { name: '-' });
      expect(decrementButton).toBeDisabled();
    });

    it('최대값일 때 증가 버튼이 비활성화된다', () => {
      render(
        <Counter
          {...defaultProps}
          value={100}
          max={100}
        />
      );

      const incrementButton = screen.getByRole('button', { name: '+' });
      expect(incrementButton).toBeDisabled();
    });

    it('disabled일 때 모든 버튼이 비활성화된다', () => {
      render(
        <Counter
          {...defaultProps}
          disabled={true}
        />
      );

      const decrementButton = screen.getByRole('button', { name: '-' });
      const incrementButton = screen.getByRole('button', { name: '+' });

      expect(decrementButton).toBeDisabled();
      expect(incrementButton).toBeDisabled();
    });
  });

  describe('범위 테스트', () => {
    it('커스텀 min/max 범위가 올바르게 작동한다', () => {
      const onChange = jest.fn();
      render(
        <Counter
          value={15}
          min={10}
          max={20}
          onChange={onChange}
        />
      );

      // 증가 테스트
      const incrementButton = screen.getByRole('button', { name: '+' });
      fireEvent.click(incrementButton);
      expect(onChange).toHaveBeenCalledWith(16);

      // 감소 테스트
      const decrementButton = screen.getByRole('button', { name: '-' });
      fireEvent.click(decrementButton);
      expect(onChange).toHaveBeenCalledWith(14);
    });
  });
});
