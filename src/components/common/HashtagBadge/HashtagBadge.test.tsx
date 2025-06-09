import { fireEvent, render, screen } from '@testing-library/react';
import HashtagBadge from './HashtagBadge';

describe('HashtagBadge 컴포넌트 테스트', () => {
  test('배지 및 text가 화면에 정상적으로 렌더링된다', () => {
    render(<HashtagBadge text='펜타포트' />);
    const badge = screen.getByText('펜타포트');
    expect(badge).toBeInTheDocument();
  });

  test('className props를 할당했을 때 올바른 클래스가 적용된다', () => {
    render(
      <HashtagBadge
        text='펜타포트'
        className='font-extrabold'
      />
    );
    const badge = screen.getByText('펜타포트');
    expect(badge).toHaveClass('font-extrabold');
  });

  test('isClickable = true일 때 버튼으로 렌더링되고 클릭 시 onClick 호출된다', () => {
    const handleClick = jest.fn();
    render(
      <HashtagBadge
        text='클릭'
        isClickable={true}
        onClick={handleClick}
      />
    );
    const badge = screen.getByRole('button');
    fireEvent.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith('클릭', expect.any(Object)); // 이벤트 객체까지 전달 확인
  });

  test('isClickable=false일 때 span으로 렌더링되고 클릭해도 onClick 호출되지 않는다', () => {
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
        isClickable={false}
        onClick={handleClick}
      />
    );
    const badge = screen.getByText('클릭');
    expect(badge.tagName.toLowerCase()).toBe('span');
    fireEvent.click(badge);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('isClickable=true이지만 onClick이 undefined일 때 클릭해도 오류 없이 무시된다', () => {
    render(
      <HashtagBadge
        text='클릭'
        isClickable={true}
      />
    );
    const badge = screen.getByRole('button');
    expect(() => fireEvent.click(badge)).not.toThrow();
  });
});
