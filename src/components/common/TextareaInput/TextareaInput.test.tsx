import { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { hasProfanity } from '@/lib/utils';
import TextareaInput from './TextareaInput';

const Wrapper = () => {
  const [text, setText] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleChange = (value: string) => {
    setText(value);
    setIsValid(!hasProfanity(value));
  };

  return (
    <>
      <TextareaInput
        value={text}
        onChange={handleChange}
        isValidText={isValid}
        maxLength={100}
      />
      <div data-testid='valid-state'>{isValid ? 'valid' : 'invalid'}</div>
    </>
  );
};
describe('TextareaInput 컴포넌트', () => {
  const setup = (props = {}) => {
    const defaultProps = {
      value: '',
      onChange: jest.fn(),
      ...props,
    };
    render(<TextareaInput {...defaultProps} />);
    return defaultProps;
  };

  test('placeholder, rows props가 정상적으로 적용된다', () => {
    setup({ placeholder: '내용 입력', rows: 4 });
    const textarea = screen.getByPlaceholderText(
      '내용 입력'
    ) as HTMLTextAreaElement;
    expect(textarea).toBeInTheDocument();
    expect(textarea.rows).toBe(4);
  });

  test('onChange()가 정상적으로 호출된다', () => {
    const onChangeMock = jest.fn();
    setup({ onChange: onChangeMock });
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(onChangeMock).toHaveBeenCalledWith('hello');
  });

  test('지정한 maxLength props가 정상적으로 적용된다', () => {
    const onChangeMock = jest.fn();
    setup({ onChange: onChangeMock, maxLength: 5 });
    const textarea = screen.getByRole('textbox');
    fireEvent.change(textarea, { target: { value: '123456' } });
    expect(onChangeMock).toHaveBeenCalledWith('12345');
  });

  test('입력한 글자 수가 정상적으로 표시된다', () => {
    setup({ value: '안녕', maxLength: 10 });
    const counter = screen.getByText('2 / 10자');
    expect(counter).toBeInTheDocument();
  });

  test('hideScrollbar = true일 때 scrollbar-hide 클래스가 적용된다', () => {
    render(
      <TextareaInput
        value='스크롤바 테스트'
        onChange={() => {}}
        hideScrollbar={true}
      />
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea.className).toMatch(/scrollbar-hide/);
  });

  test('hideScrollbar = false일 때 scrollbar-hide 클래스가 적용되지 않는다', () => {
    render(
      <TextareaInput
        value='스크롤바 테스트'
        onChange={() => {}}
        hideScrollbar={false}
      />
    );
    const textarea = screen.getByRole('textbox');
    expect(textarea.className).not.toMatch(/scrollbar-hide/);
  });

  test('욕설 입력 시 isValidText는 false가 되고 경고 메시지가 나타난다', () => {
    render(<Wrapper />);
    const textarea = screen.getByRole('textbox');

    fireEvent.change(textarea, { target: { value: '씨발' } });

    expect(
      screen.getByText('부적절한 단어가 포함되어 있습니다')
    ).toBeInTheDocument();

    expect(screen.getByTestId('valid-state').textContent).toBe('invalid');
  });
});
