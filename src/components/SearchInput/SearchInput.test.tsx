import { createRef, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';

describe('<SearchInput>컴포넌트 테스트', () => {
  test('input과 버튼이 렌더링되고, 버튼 텍스트가 표시된다', () => {
    render(<SearchInput onSubmit={() => {}}>제출</SearchInput>);

    const input = screen.getByLabelText('검색어 입력');
    const button = screen.getByRole('button', { name: '제출' });

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('input에 ref가 정상적으로 전달된다', async () => {
    const inputRef = createRef<HTMLInputElement | null>();
    render(
      <SearchInput
        onSubmit={() => {}}
        ref={inputRef}
      >
        제출
      </SearchInput>
    );

    const input = screen.getByLabelText('검색어 입력');

    await userEvent.type(input, '검색');
    expect(inputRef.current?.value).toBe('검색');
  });

  test('input에 value와 onChange가 정상적으로 전달된다', async () => {
    const TestComponent = () => {
      const [value, setValue] = useState('');
      return (
        <SearchInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onSubmit={() => {}}
        >
          제출
        </SearchInput>
      );
    };

    render(<TestComponent />);

    const input = screen.getByLabelText('검색어 입력');

    await userEvent.type(input, '검색');
    expect(input).toHaveValue('검색');
  });

  test('버튼 클릭, 엔터 입력시 폼이 제출된다', async () => {
    const onSubmit = jest.fn();
    render(<SearchInput onSubmit={onSubmit}>제출</SearchInput>);

    const input = screen.getByLabelText('검색어 입력');
    const button = screen.getByRole('button', { name: '제출' });

    input.focus();
    await userEvent.keyboard('{Enter}');
    expect(onSubmit).toHaveBeenCalledTimes(1);

    await userEvent.click(button);
    expect(onSubmit).toHaveBeenCalledTimes(2);
  });
});
