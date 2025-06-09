import { render, screen, fireEvent } from '@testing-library/react';
import HashtagBadgeGroup from './HashtagBadgeGroup';

const hashtags = ['클래식', '락', '뮤지컬'];

describe('HashtagBadgeGroup 컴포넌트', () => {
  test('해시태그가 정상적으로 렌더링된다', () => {
    render(<HashtagBadgeGroup hashtags={hashtags} />);
    hashtags.forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  test('isClickable이면 onClick이 (tag, e) 인자로 호출된다', () => {
    const mockClick = jest.fn();
    render(
      <HashtagBadgeGroup
        hashtags={hashtags}
        isClickable
        onClick={mockClick}
      />
    );
    const tagElement = screen.getByText('클래식');
    fireEvent.click(tagElement);
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
});
