import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar';

jest.mock('react-intersection-observer', () => ({
  useInView: () => ({
    ref: () => {},
    inView: true,
  }),
}));

describe('ProgressBar 컴포넌트', () => {
  test('shouldAnimate = true이면 애니메이션이 정상적으로 작동된다', () => {
    render(
      <ProgressBar
        current={5}
        total={10}
        shouldAnimate
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress?.className).toMatch(/transition-all/);
  });

  test('shouldAnimate = false이면 애니메이션이 작동하지 않는다', () => {
    render(
      <ProgressBar
        current={5}
        total={10}
        shouldAnimate={false}
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress?.className).not.toMatch(/transition-all/);
  });

  test('percent가 정확하게 그래프에 반영된다', () => {
    render(
      <ProgressBar
        current={3}
        total={10}
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '30');
  });

  test('current <= 0일 때 최소 0%로 제한되어 보인다', () => {
    render(
      <ProgressBar
        current={0}
        total={10}
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '0');
  });

  test('current >= total일 때 최대 100%로 제한되어 보인다', () => {
    render(
      <ProgressBar
        current={15}
        total={10}
      />
    );
    const progress = screen.getByRole('progressbar');
    expect(progress).toHaveAttribute('aria-valuenow', '100');
  });
});
