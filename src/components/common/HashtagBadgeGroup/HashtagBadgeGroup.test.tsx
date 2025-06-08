import { render, screen, fireEvent } from '@testing-library/react';
import HashtagBadgeGroup from './HashtagBadgeGroup';

const hashtags = ['클래식', '락', '뮤지컬'];

test('해시태그가 정상적으로 렌더링된다', () => {
  render(<HashtagBadgeGroup hashtags={hashtags} />);
  hashtags.forEach((tag) => {
    expect(screen.getByText(tag)).toBeInTheDocument();
  });
});

test('isClickable이면 onClick()이 정상적으로 호출된다', () => {
  const mockClick = jest.fn();
  render(
    <HashtagBadgeGroup
      hashtags={hashtags}
      isClickable
      onClick={mockClick}
    />
  );
  fireEvent.click(screen.getByText('클래식'));
  expect(mockClick).toHaveBeenCalledWith('클래식');
});

test('isClickable = false면 onClick()이 호출되지 않는다', () => {
  const mockClick = jest.fn();
  render(
    <HashtagBadgeGroup
      hashtags={hashtags}
      isClickable={false}
      onClick={mockClick}
    />
  );
  fireEvent.click(screen.getByText('클래식'));
  expect(mockClick).not.toHaveBeenCalled();
});
