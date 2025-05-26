import { useRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useClickOutside from './useClickOutside';

const TestComponent = ({ onClose }: { onClose: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(true);

  useClickOutside({
    ref,
    onClose: () => {
      setIsOpen(false);
      onClose();
    },
  });

  return (
    <div>
      {isOpen && (
        <div
          ref={ref}
          data-testid='inside'
        >
          내부
        </div>
      )}
      <button data-testid='outside'>외부</button>
    </div>
  );
};

describe('useClickOutside 훅 테스트', () => {
  test('외부 클릭 시 onClose가 호출된다', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();

    render(<TestComponent onClose={onClose} />);
    await user.click(screen.getByTestId('outside'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('외부 터치 시 onClose가 호출된다', () => {
    const onClose = jest.fn();

    render(<TestComponent onClose={onClose} />);
    fireEvent.touchStart(screen.getByTestId('outside'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('Escape 키 입력 시 onClose가 호출된다', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();

    render(<TestComponent onClose={onClose} />);
    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('ref 내부 클릭 시 onClose가 호출되지 않는다', async () => {
    const onClose = jest.fn();
    const user = userEvent.setup();

    render(<TestComponent onClose={onClose} />);
    await user.click(screen.getByTestId('inside'));

    expect(onClose).not.toHaveBeenCalled();
  });

  test('ref 내부 터치 시 onClose가 호출되지 않는다', () => {
    const onClose = jest.fn();
    render(<TestComponent onClose={onClose} />);

    fireEvent.touchStart(screen.getByTestId('inside'));

    expect(onClose).not.toHaveBeenCalled();
  });
});
