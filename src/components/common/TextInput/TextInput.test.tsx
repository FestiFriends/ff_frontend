import { render, screen, fireEvent } from '@testing-library/react';
import TextInput from './TextInput';

describe('TextInput Component', () => {
  test('라벨, 플레이스홀더, 헬퍼 텍스트가 렌더링되어야 한다', () => {
    render(
      <TextInput
        id='nickname'
        label='닉네임'
        value=''
        onChange={() => {}}
        helperText='2~20자 입력'
      />
    );
    expect(screen.getByLabelText('닉네임')).toBeInTheDocument();
    expect(screen.getByText('2~20자 입력')).toBeInTheDocument();
  });

  test('필수 입력 표시(*)가 있어야 한다', () => {
    render(
      <TextInput
        id='email'
        label='이메일'
        value=''
        onChange={() => {}}
        required
      />
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  test('에러 메시지가 렌더링되어야 한다', () => {
    render(
      <TextInput
        id='email'
        label='이메일'
        value='abc'
        onChange={() => {}}
        error='이메일 형식이 아닙니다'
      />
    );
    expect(screen.getByText('이메일 형식이 아닙니다')).toBeInTheDocument();
  });

  test('비밀번호 토글 아이콘이 동작해야 한다', () => {
    render(
      <TextInput
        id='password'
        label='비밀번호'
        type='password'
        value='password'
        onChange={() => {}}
      />
    );
    const toggleButton = screen.getByRole('button', { name: '비밀번호 보기' });
    expect(toggleButton).toBeInTheDocument();
    fireEvent.click(toggleButton);
    expect(
      screen.getByRole('button', { name: '비밀번호 숨기기' })
    ).toBeInTheDocument();
  });
});

test('지원되지 않는 size는 기본 md 스타일을 사용해야 한다', () => {
  const { container } = render(
    <TextInput
      id='invalid-size'
      value=''
      onChange={() => {}}
    />
  );
  const input = container.querySelector('input');
  expect(input).toHaveClass('text-16_M');
});

test('disabled, readOnly 상태에서도 스타일이 적용되어야 한다', () => {
  const { container } = render(
    <TextInput
      id='disabled-input'
      value='읽기전용'
      onChange={() => {}}
      disabled
      readOnly
    />
  );
  const input = container.querySelector('input');
  expect(input).toBeDisabled();
  expect(input).toHaveAttribute('readonly');
  expect(input?.className).toMatch(/bg-gray-100|text-gray-400|gray-50/);
});
