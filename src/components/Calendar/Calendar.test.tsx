import { render, screen, fireEvent } from '@testing-library/react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Calendar from './Calendar';

describe('Calendar', () => {
  const today = new Date('2025-06-02');

  test('요일이 올바르게 렌더링된다', () => {
    render(<Calendar month={today} />);
    ['일', '월', '화', '수', '목', '금', '토'].forEach((day) => {
      expect(screen.getByText(day)).toBeInTheDocument();
    });
  });

  test('날짜를 클릭할 수 있다', () => {
    const handleDateClick = jest.fn();
    render(
      <Calendar
        month={today}
        onDateClick={handleDateClick}
      />
    );

    const targetDate = screen.getByText('15'); // 15일 클릭
    fireEvent.click(targetDate);

    expect(handleDateClick).toHaveBeenCalled();
  });

  test('isControllable이 true면 현재 달이 출력된다', () => {
    render(
      <Calendar
        isControllable
        month={today}
      />
    );
    expect(
      screen.getByText(format(today, 'yyyy년 M월', { locale: ko }))
    ).toBeInTheDocument();
  });

  test('isControllable이 true면 이전, 다음 달 버튼이 나타나고 동작한다', () => {
    render(
      <Calendar
        month={today}
        isControllable
      />
    );

    const prevButton = screen.getByLabelText('이전 달');
    const nextButton = screen.getByLabelText('다음 달');

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    fireEvent.click(prevButton);
    expect(screen.getByText('2025년 5월')).toBeInTheDocument();

    fireEvent.click(nextButton); // 다시 5월
    fireEvent.click(nextButton); // 6월
    expect(screen.getByText('2025년 7월')).toBeInTheDocument();
  });

  test('isControllable이 false면 이전, 다음 달 버튼이 나타나지 않는다', () => {
    render(
      <Calendar
        month={today}
        isControllable={false}
      />
    );
    expect(screen.queryByLabelText('이전 달')).not.toBeInTheDocument();
    expect(screen.queryByLabelText('다음 달')).not.toBeInTheDocument();
  });
});
