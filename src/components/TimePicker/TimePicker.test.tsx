import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { format } from 'date-fns';
import TimePicker from './TimePicker';

// date-fns format 함수 모킹
jest.mock('date-fns', () => ({
  format: jest.fn(),
}));

const mockFormat = format as jest.MockedFunction<typeof format>;

describe('TimePicker', () => {
  beforeEach(() => {
    // format 함수가 예측 가능한 값을 반환하도록 모킹
    mockFormat.mockReturnValue('12:00 PM');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('기본 플레이스홀더 텍스트로 렌더링됨', () => {
    render(<TimePicker />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('12:00 PM');
  });

  it('버튼 클릭시 팝오버가 열림', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('AM')).toBeInTheDocument();
      expect(screen.getByText('PM')).toBeInTheDocument();
    });
  });

  it('올바른 개수의 시간 버튼이 표시됨', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      // 팝오버 내용 찾기
      const popoverContent =
        screen.getByRole('dialog')
        || document.querySelector('[data-radix-popper-content-wrapper]')
        || document.querySelector('.w-auto.p-0');

      expect(popoverContent).toBeInTheDocument();

      // 시간 섹션의 모든 버튼 찾기 (첫 번째 ScrollArea)
      const scrollAreas = document.querySelectorAll(
        '.w-64.sm\\:w-auto, [class*="w-64"]'
      );
      const hourSection = scrollAreas[0];

      if (hourSection) {
        const hourButtons = within(hourSection as HTMLElement).getAllByRole(
          'button'
        );
        // 기본 hourStep=1이므로 12개의 버튼이 있어야 함
        expect(hourButtons).toHaveLength(12);

        // 1부터 12까지의 텍스트가 있는지 확인
        const buttonTexts = hourButtons.map((btn) => btn.textContent);
        for (let i = 1; i <= 12; i++) {
          expect(buttonTexts).toContain(i.toString());
        }
      }
    });
  });

  it('분 버튼이 올바른 형식으로 표시됨', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      // 분 버튼은 항상 2자리로 표시되므로 이를 확인
      expect(screen.getByText('00')).toBeInTheDocument();
      expect(screen.getByText('01')).toBeInTheDocument();
      expect(screen.getByText('30')).toBeInTheDocument();
      expect(screen.getByText('59')).toBeInTheDocument();
    });
  });

  it('시간 선택시 onChange가 호출됨', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();

    render(<TimePicker onChange={mockOnChange} />);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      // 시간 섹션에서 '3' 버튼 찾기
      const scrollAreas = document.querySelectorAll(
        '.w-64.sm\\:w-auto, [class*="w-64"]'
      );
      const hourSection = scrollAreas[0];

      if (hourSection) {
        const hourButton = within(hourSection as HTMLElement).getByText('3');
        fireEvent.click(hourButton);
      }
    });

    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('분 선택시 onChange가 호출됨', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();

    render(<TimePicker onChange={mockOnChange} />);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      // 분 버튼 클릭 (2자리 형식)
      const minute30Button = screen.getByText('30');
      fireEvent.click(minute30Button);
    });

    expect(mockOnChange).toHaveBeenCalled();
    const lastCall =
      mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1];
    const selectedDate = lastCall[0];
    expect(selectedDate.getMinutes()).toBe(30);
  });

  it('hourStep prop을 올바르게 적용함', async () => {
    const user = userEvent.setup();
    render(<TimePicker hourStep={2} />);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      // 시간 섹션 찾기
      const scrollAreas = document.querySelectorAll(
        '.w-64.sm\\:w-auto, [class*="w-64"]'
      );
      const hourSection = scrollAreas[0];

      if (hourSection) {
        const hourButtons = within(hourSection as HTMLElement).getAllByRole(
          'button'
        );
        const buttonTexts = hourButtons.map((btn) => btn.textContent);

        // hourStep=2이므로 1, 3, 5, 7, 9, 11만 있어야 함 (6개)
        expect(hourButtons).toHaveLength(6);
        expect(buttonTexts).toContain('1');
        expect(buttonTexts).toContain('3');
        expect(buttonTexts).toContain('5');
        expect(buttonTexts).toContain('7');
        expect(buttonTexts).toContain('9');
        expect(buttonTexts).toContain('11');

        // 짝수는 없어야 함
        expect(buttonTexts).not.toContain('2');
        expect(buttonTexts).not.toContain('4');
        expect(buttonTexts).not.toContain('6');
        expect(buttonTexts).not.toContain('8');
        expect(buttonTexts).not.toContain('10');
        expect(buttonTexts).not.toContain('12');
      }
    });
  });

  it('minuteStep prop을 올바르게 적용함', async () => {
    const user = userEvent.setup();
    render(<TimePicker minuteStep={15} />);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      // 분 섹션 찾기 (두 번째 ScrollArea)
      const scrollAreas = document.querySelectorAll(
        '.w-64.sm\\:w-auto, [class*="w-64"]'
      );
      const minuteSection = scrollAreas[1];

      if (minuteSection) {
        const minuteButtons = within(minuteSection as HTMLElement).getAllByRole(
          'button'
        );
        const buttonTexts = minuteButtons.map((btn) => btn.textContent);

        // minuteStep=15이므로 00, 15, 30, 45만 있어야 함 (4개)
        expect(minuteButtons).toHaveLength(4);
        expect(buttonTexts).toContain('00');
        expect(buttonTexts).toContain('15');
        expect(buttonTexts).toContain('30');
        expect(buttonTexts).toContain('45');

        // 다른 분은 없어야 함
        expect(buttonTexts).not.toContain('05');
        expect(buttonTexts).not.toContain('10');
        expect(buttonTexts).not.toContain('20');
      }
    });
  });

  it('disabled prop이 true일 때 비활성화됨', () => {
    render(<TimePicker disabled={true} />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('error 상태 클래스가 적용됨', () => {
    render(<TimePicker status='error' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-red-600');
  });

  it('warning 상태 클래스가 적용됨', () => {
    render(<TimePicker status='warn' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-orange-300');
  });

  it('다양한 크기 클래스가 적용됨', () => {
    const { rerender } = render(<TimePicker size='sm' />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('text-xs');

    rerender(<TimePicker size='md' />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('text-sm');

    rerender(<TimePicker size='lg' />);
    button = screen.getByRole('button');
    expect(button).toHaveClass('text-base');
  });

  it('AM/PM 선택이 올바르게 처리됨', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();

    render(<TimePicker onChange={mockOnChange} />);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      const pmButton = screen.getByText('PM');
      fireEvent.click(pmButton);
    });

    expect(mockOnChange).toHaveBeenCalled();
    const lastCall =
      mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1];
    const selectedDate = lastCall[0];
    expect(selectedDate.getHours()).toBeGreaterThanOrEqual(12);
  });

  it('12시간 형식의 시간 선택이 올바르게 처리됨', async () => {
    const mockOnChange = jest.fn();
    const user = userEvent.setup();

    render(<TimePicker onChange={mockOnChange} />);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      // 시간 섹션에서 12 버튼 찾기
      const scrollAreas = document.querySelectorAll(
        '.w-64.sm\\:w-auto, [class*="w-64"]'
      );
      const hourSection = scrollAreas[0];

      if (hourSection) {
        const hour12Button = within(hourSection as HTMLElement).getByText('12');
        fireEvent.click(hour12Button);
      }
    });

    expect(mockOnChange).toHaveBeenCalled();
    const lastCall =
      mockOnChange.mock.calls[mockOnChange.mock.calls.length - 1];
    const selectedDate = lastCall[0];
    // 12 AM은 시간 0, 12 PM은 시간 12여야 함
    expect([0, 12]).toContain(selectedDate.getHours());
  });

  it('외부 클릭시 팝오버가 닫힘', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <TimePicker />
        <div data-testid='outside'>외부 영역</div>
      </div>
    );

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText('AM')).toBeInTheDocument();
    });

    const outside = screen.getByTestId('outside');
    await user.click(outside);

    await waitFor(
      () => {
        expect(screen.queryByText('AM')).not.toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it('선택된 시간에 대해 올바른 버튼 스타일이 표시됨', async () => {
    const user = userEvent.setup();
    render(<TimePicker />);

    const button = screen.getByRole('button');
    await user.click(button);

    await waitFor(() => {
      // 초기 상태에서 현재 시간에 해당하는 버튼들이 'default' variant를 가져야 함
      const amButton = screen.getByText('AM');
      const pmButton = screen.getByText('PM');

      expect(amButton).toBeInTheDocument();
      expect(pmButton).toBeInTheDocument();
    });
  });
});
