import { render, screen, fireEvent } from '@testing-library/react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import DatePicker from './DatePicker';

describe('DatePicker 컴포넌트 테스트', () => {
  const mockStart = new Date('2025-06-01');
  const mockEnd = new Date('2025-06-10');

  test('처음 렌더링되었을 때 startDate, endDate값이 없으면 "날짜" 문구가 나타난다', () => {
    render(
      <DatePicker
        startDate={null}
        endDate={null}
        onChange={jest.fn()}
      />
    );

    expect(screen.getByText('날짜')).toBeInTheDocument();
  });

  test('startDate, endDate값이 있을 경우 올바르게 표시된다', () => {
    render(
      <DatePicker
        startDate={mockStart}
        endDate={mockEnd}
        onChange={jest.fn()}
      />
    );

    const startDateText = format(mockStart, 'MM/dd', { locale: ko });
    const endDateText = format(mockEnd, 'MM/dd', { locale: ko });

    expect(screen.getByText(startDateText)).toBeInTheDocument();
    expect(screen.getByText(endDateText)).toBeInTheDocument();
  });

  test('처음 DatePicker를 열면 현재 연도와 달이 표시된다', () => {
    render(
      <DatePicker
        startDate={null}
        endDate={null}
        onChange={jest.fn()}
      />
    );

    fireEvent.click(screen.getByLabelText('datepicker open'));

    expect(
      screen.getByText(format(new Date(), 'yyyy년 M월', { locale: ko }))
    ).toBeInTheDocument();
  });

  test('DatePicker를 열고 날짜를 클릭하면 날짜 선택이 동작한다', () => {
    const handleChange = jest.fn();
    render(
      <DatePicker
        startDate={null}
        endDate={null}
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByLabelText('datepicker open'));

    const firstClick = screen.getByText('10');
    fireEvent.click(firstClick);

    const secondClick = screen.getByText('15');
    fireEvent.click(secondClick);

    expect(handleChange).toHaveBeenCalledWith({
      startDate: expect.any(Date),
      endDate: expect.any(Date),
    });
  });

  test('이전/다음 달 버튼을 누르면 월이 변경된다', () => {
    render(
      <DatePicker
        startDate={null}
        endDate={null}
        onChange={jest.fn()}
      />
    );

    fireEvent.click(screen.getByLabelText('datepicker open'));

    const monthLabel = screen.getByText(/2025년 6월/);
    expect(monthLabel).toBeInTheDocument();

    const prevButton = screen.getByLabelText('prev month');
    const nextButton = screen.getByLabelText('next month');

    fireEvent.click(prevButton);
    expect(screen.getByText(/2025년 5월/)).toBeInTheDocument();

    fireEvent.click(nextButton); // 다시 6월
    fireEvent.click(nextButton); // 7월
    expect(screen.getByText(/2025년 7월/)).toBeInTheDocument();
  });
});
