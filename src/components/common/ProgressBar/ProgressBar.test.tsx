import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

jest.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: jest.fn(),
    inView: true,
  }),
}));

describe('ProgressBar 컴포넌트', () => {
  test('shouldAnimate = true이면 애니메이션 클래스가 적용된다', () => {
    render(
      <ProgressBar
        current={5}
        total={10}
        shouldAnimate
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveClass('transition-all');
  });

  test('shouldAnimate = false이면 애니메이션 클래스가 없다', () => {
    render(
      <ProgressBar
        current={5}
        total={10}
        shouldAnimate={false}
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress).not.toHaveClass('transition-all');
  });

  test('current/total 비율에 맞는 aria-valuenow가 적용된다', () => {
    render(
      <ProgressBar
        current={3}
        total={10}
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '30');
  });

  test('current가 0일 경우 aria-valuenow는 0이다', () => {
    render(
      <ProgressBar
        current={0}
        total={10}
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '0');
  });

  test('current가 total보다 클 경우 aria-valuenow는 100이다', () => {
    render(
      <ProgressBar
        current={15}
        total={10}
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '100');
  });

  test('current가 음수일 경우에도 aria-valuenow는 0 이상이다', () => {
    render(
      <ProgressBar
        current={-5}
        total={10}
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(
      Number(progress.getAttribute('aria-valuenow'))
    ).toBeGreaterThanOrEqual(0);
  });

  test('total이 0이면 0으로 나누지 않고 percent 100으로 간주한다', () => {
    render(
      <ProgressBar
        current={5}
        total={0}
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '100');
  });

  test('모집 인원 텍스트가 current와 total 값으로 정확히 렌더링된다', () => {
    render(
      <ProgressBar
        current={7}
        total={20}
      />
    );
    expect(screen.getByText('(7/20명)')).toBeInTheDocument();
  });
});
