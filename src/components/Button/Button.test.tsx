import { fireEvent, render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button 컴포넌트 테스트', () => {
  test('children 텍스트가 화면에 정상적으로 렌더링된다', () => {
    render(<Button>버튼</Button>);
    const button = screen.getByRole('button', { name: '버튼' });
    expect(button).toBeInTheDocument();
  });

  // Todo: 스타일 변경에 따른 리팩토링 필요
  test('variant와 size props값에 따라 올바른 클래스가 적용된다', () => {
    render(
      <Button
        variant='danger'
        size='lg'
      >
        삭제
      </Button>
    );
    const button = screen.getByRole('button', { name: '삭제' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-red-500');
    expect(button).toHaveClass('px-8');
    expect(button).toHaveClass('py-2');
  });

  test('버튼 클릭 시 onClick 핸들러가 호출된다', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>클릭</Button>);
    const button = screen.getByRole('button', { name: '클릭' });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disabled 상태일 경우 버튼을 클릭해도 onClick 핸들러가 호출되지 않는다', () => {
    const handleClick = jest.fn();
    render(
      <Button
        disabled
        onClick={handleClick}
      >
        비활성화
      </Button>
    );
    const button = screen.getByRole('button', { name: '비활성화' });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  // Todo: 스타일 변경에 따른 리팩토링 필요
  test('disabled 상태일 때 적절한 스타일 클래스가 적용된다', () => {
    render(<Button disabled>비활성화</Button>);
    const button = screen.getByRole('button', { name: '비활성화' });
    expect(button).toHaveClass('cursor-not-allowed');
    expect(button).toHaveClass('bg-gray-200');
    expect(button).toHaveClass('text-gray-400');
  });
});
