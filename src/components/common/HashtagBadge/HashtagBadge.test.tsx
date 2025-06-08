import { fireEvent, render, screen } from '@testing-library/react';
import HashtagBadge from './HashtagBadge';

describe('HashtagBadge 컴포넌트 테스트', () => {
  test('배지 및 text가 화면에 정상적으로 렌더링된다', () => {
    render(<HashtagBadge text='펜타포트' />);
    const badge = screen.getByText('펜타포트');
    expect(badge).toBeInTheDocument();
  });

  //   Todo: 스타일 변경에 따른 리팩토링 필요
  test('className props를 할당했을 때 올바른 클래스가 적용된다', () => {
    render(
      <HashtagBadge
        text='펜타포트'
        className='font-extrabold'
      />
    );
    const badge = screen.getByText('펜타포트');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('font-extrabold');
  });

  test('배지 클릭 시 onClick 핸들러가 호출된다', () => {
    const handleClick = jest.fn();
    render(
      <HashtagBadge
        text='클릭'
        isClickable={true}
        onClick={handleClick}
      />
    );
    const badge = screen.getByText('클릭');
    fireEvent.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith('클릭');
  });

  test('isClickable = false일 때 onClick이 실행되지 않는다', () => {
    const handleClick = jest.fn();
    render(
      <HashtagBadge
        text='클릭'
        isClickable={false}
        onClick={handleClick}
      />
    );
    const badge = screen.getByText('클릭');
    fireEvent.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  test('onClick props를 할당하지 않으면 isClickable = true여도 onClick이 실행되지 않는다', () => {
    const handleClick = jest.fn();
    render(
      <HashtagBadge
        text='클릭'
        isClickable={true}
      />
    );
    const badge = screen.getByText('클릭');
    fireEvent.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
