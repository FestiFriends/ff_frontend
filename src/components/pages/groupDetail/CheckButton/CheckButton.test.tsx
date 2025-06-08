import { render, screen, fireEvent } from '@testing-library/react';
import CheckButton from './CheckButton';

describe('CheckButton', () => {
  const mockClick = jest.fn();

  test('isReactioned = false일 때 stroke 아이콘으로 렌더링된다', () => {
    render(
      <CheckButton
        isReactioned={false}
        reactionCount={5}
        onClick={mockClick}
      />
    );

    expect(screen.getByLabelText('게시글 확인 버튼')).toBeInTheDocument();
    expect(screen.getByText('확인 5')).toBeInTheDocument();
  });

  test('isReactioned = true일 때 filled 아이콘으로 렌더링된다', () => {
    render(
      <CheckButton
        isReactioned={true}
        reactionCount={3}
        onClick={mockClick}
      />
    );

    expect(screen.getByLabelText('게시글 확인 취소 버튼')).toBeInTheDocument();
    expect(screen.getByText('확인 3')).toBeInTheDocument();
  });

  test('버튼 클릭 시 onClick 핸들러가 호출된다', () => {
    render(
      <CheckButton
        isReactioned={false}
        reactionCount={1}
        onClick={mockClick}
      />
    );

    const button = screen.getByRole('button', { name: '게시글 확인 버튼' });
    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
