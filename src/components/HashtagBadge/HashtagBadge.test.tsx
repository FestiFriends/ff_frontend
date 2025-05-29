import { fireEvent, render, screen } from '@testing-library/react';
import HashtagBadge from './HashtagBadge';

describe('HashtagBadge 컴포넌트 테스트', () => {
  test('배지 및 text가 화면에 정상적으로 렌더링된다', () => {
    render(
      <HashtagBadge
        text='펜타포트'
        type='userProfile'
      />
    );
    const badge = screen.getByText('펜타포트');
    expect(badge).toBeInTheDocument();
  });

  //   Todo: 스타일 변경에 따른 리팩토링 필요
  test('type props에 따라 올바른 클래스가 적용된다', () => {
    render(
      <>
        <HashtagBadge
          text='groupInfo'
          type='groupInfo'
        />
        <HashtagBadge
          text='groupCard'
          type='groupCard'
        />
        <HashtagBadge
          text='userProfile'
          type='userProfile'
        />
      </>
    );
    const groupInfo = screen.getByText('groupInfo');
    const groupCard = screen.getByText('groupCard');
    const userProfile = screen.getByText('userProfile');
    expect(groupInfo).toBeInTheDocument();
    expect(groupCard).toBeInTheDocument();
    expect(userProfile).toBeInTheDocument();
    expect(groupInfo).toHaveClass(
      'cursor-pointer rounded-full bg-yellow-200 px-4 py-2 font-semibold text-gray-800 select-none'
    );
    expect(groupCard).toHaveClass(
      'cursor-pointer rounded-lg bg-blue-100 px-4 py-2 font-medium text-blue-600 select-none'
    );
    expect(userProfile).toHaveClass(
      'cursor-pointer rounded-lg bg-purple-100 px-4 py-2 font-semibold text-purple-600 select-none'
    );
  });

  test('className props를 할당했을 때 올바른 클래스가 적용된다', () => {
    render(
      <HashtagBadge
        text='펜타포트'
        type='userProfile'
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
        type='groupInfo'
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
        type='groupInfo'
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
        type='groupInfo'
        isClickable={true}
      />
    );
    const badge = screen.getByText('클릭');
    fireEvent.click(badge);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });
});
