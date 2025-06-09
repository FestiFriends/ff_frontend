import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination 컴포넌트 테스트', () => {
  const setup = (
    currentPage = 1,
    totalPages = 10,
    onPageChange = jest.fn(),
    maxVisiblePages?: number
  ) => {
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        maxVisiblePages={maxVisiblePages}
      />
    );
    return { onPageChange };
  };

  test('페이지 버튼들이 렌더링된다', () => {
    setup(1, 10);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument(); // 기본 maxVisiblePages = 5
    expect(screen.queryByText('6')).not.toBeInTheDocument();
  });

  test('페이지 버튼 클릭 시 onPageChange가 호출된다', () => {
    const { onPageChange } = setup(1, 10);
    fireEvent.click(screen.getByText('3'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('다음 버튼 클릭 시 다음 페이지로 이동된다', () => {
    const { onPageChange } = setup(2, 10);
    const nextButton = screen.getByLabelText('next page button');
    fireEvent.click(nextButton);
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  test('이전 버튼 클릭 시 이전 페이지로 이동된다', () => {
    const { onPageChange } = setup(2, 10);
    const prevButton = screen.getByLabelText('prev page button');
    fireEvent.click(prevButton);
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  test('1페이지일 경우 이전 버튼은 비활성화된다', () => {
    setup(1, 10);
    const prevButton = screen.getByLabelText('prev page button');
    expect(prevButton).toHaveClass('text-gray-300');
    fireEvent.click(prevButton); // 클릭해도 아무 일도 없어야 함
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('마지막 페이지일 경우 다음 버튼은 비활성화된다', () => {
    setup(10, 10);
    const nextButton = screen.getByLabelText('next page button');
    expect(nextButton).toHaveClass('text-gray-300');
    fireEvent.click(nextButton); // 클릭해도 아무 일도 없어야 함
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  test('maxVisiblePages 변경 시 보여주는 페이지 수가 바뀐다', () => {
    setup(1, 10, jest.fn(), 3);
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.queryByText('4')).not.toBeInTheDocument();
  });
});
