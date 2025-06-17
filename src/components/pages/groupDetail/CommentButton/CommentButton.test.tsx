import { render, screen, fireEvent } from '@testing-library/react';
import CommentButton from './CommentButton';

describe('CommentButton', () => {
  const mockClick = jest.fn();

  test('버튼이 올바르게 렌더링된다', () => {
    render(
      <CommentButton
        commentCount={3}
        onClick={mockClick}
      />
    );

    expect(screen.getByLabelText('댓글 목록 이동')).toBeInTheDocument();
    expect(screen.getByText('댓글 3')).toBeInTheDocument();
  });

  test('버튼 클릭 시 onClick 핸들러가 호출된다', () => {
    render(
      <CommentButton
        commentCount={1}
        onClick={mockClick}
      />
    );
    const button = screen.getByRole('button', { name: '댓글 목록 이동' });

    fireEvent.click(button);
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
