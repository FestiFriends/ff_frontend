import { render, screen } from '@testing-library/react';
import ReportItem from './ReportItem';
import { ReportReason } from '@/types/enums';

const mockReportItem = {
  reportedAt: '2025-01-09T07:05:00',
  reason: ReportReason.PROFANITY,
  onClick: jest.fn(),
};

describe('ReportItem 컴포넌트', () => {
  test('reportedAt props가 올바르게 포맷되어 렌더링된다', () => {
    render(<ReportItem {...mockReportItem} />);
    expect(screen.getByText('25.01.09 07:05')).toBeInTheDocument();
  });

  test('reason props가 올바르게 렌더링된다', () => {
    render(<ReportItem {...mockReportItem} />);
    expect(screen.getByText('욕설, 비방, 차별, 혐오')).toBeInTheDocument();
  });

  test('className props를 추가로 입력하면 정상적으로 렌더링된다', () => {
    render(
      <ReportItem
        {...mockReportItem}
        className='text-2xl'
      />
    );
    const container = screen.getByRole('button');
    expect(container.className).toContain('text-2xl');
  });

  test('onClick props가 정상적으로 호출된다', () => {
    const handleClick = jest.fn();
    render(
      <ReportItem
        {...mockReportItem}
        onClick={handleClick}
      />
    );

    screen.getByRole('button').click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
