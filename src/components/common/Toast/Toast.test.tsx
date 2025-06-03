import { render, screen, act } from '@testing-library/react';
import Toast, { ToastProps } from './Toast';

jest.useFakeTimers();

describe('Toast 컴포넌트', () => {
  const setup = (props: Partial<ToastProps> = {}) => {
    const onClose = jest.fn();
    render(
      <Toast
        message='메시지'
        type='success'
        onClose={onClose}
        {...props}
      />
    );
    return { onClose };
  };

  test('메시지 props가 정상적으로 렌더링된다', () => {
    setup();
    expect(screen.getByText('메시지')).toBeInTheDocument();
  });

  test('type pros가 없으면 default 스타일이 적용된다', () => {
    render(
      <Toast
        message='기본 메시지'
        onClose={jest.fn()}
      />
    );
    const toast = screen.getByText('기본 메시지');
    expect(toast).toHaveClass('bg-gray-800');
  });

  test('타입 props에 따라 올바른 스타일이 적용된다', () => {
    setup({ type: 'error' });
    const toast = screen.getByRole('alert');

    expect(toast).toHaveClass('bg-red-500');
  });

  test('초기에는 isVisible = true로 보여진다', () => {
    setup();
    const toast = screen.getByRole('alert');

    expect(toast.className).toMatch(/opacity-100/);
  });

  test('onClose props가 3초 후에 정상적으로 호출된다', () => {
    const { onClose } = setup();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('onClose props가 3초 전에는 호출되지 않는다', () => {
    const onClose = jest.fn();
    render(
      <Toast
        message='메시지'
        onClose={onClose}
      />
    );

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(onClose).not.toHaveBeenCalled();
  });

  test('애니메이션 클래스가 2.5초 후에 opactesty-0으로 변경된다', () => {
    setup();

    act(() => {
      jest.advanceTimersByTime(2500);
    });

    const toast = screen.getByRole('alert');

    expect(toast.className).toMatch(/opacity-0/);
  });

  test('className props가 정상적으로 적용된다', () => {
    const customClass = 'top-10 right-10';
    render(
      <Toast
        message='위치 조정 메시지'
        onClose={jest.fn()}
        className={customClass}
      />
    );

    const toast = screen.getByText('위치 조정 메시지');
    expect(toast.className).toContain('top-10 right-10');
  });
});
