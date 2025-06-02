import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Filter from '@/components/Filter/Filter';
import type { MultiLevelData } from '@/hooks/useMultiLevelFilter/useMultiLevelFilter';

const mockData: MultiLevelData[] = [
  {
    label: 'A',
    value: 'a',
    children: [
      {
        label: 'A-1',
        value: 'a1',
        children: [
          { label: 'A-1-i', value: 'a1i' },
          { label: 'A-1-ii', value: 'a1ii' },
        ],
      },
    ],
  },
  { label: 'B', value: 'b' },
];

const noChildrenData: MultiLevelData[] = [{ label: 'X', value: 'x' }];

const emptyOptionsData: MultiLevelData[] = [
  {
    label: 'Z',
    value: 'z',
    children: [
      {
        label: 'Z-1',
        value: 'z1',
        children: [],
      },
    ],
  },
];

describe('Filter 컴포넌트', () => {
  test('단계별 UI를 렌더링한다', () => {
    render(<Filter data={mockData} />);
    expect(screen.getByText('단계 1 선택')).toBeInTheDocument();
  });

  test('1단계 선택 전에는 2단계 필터가 렌더링되지 않는다', () => {
    render(<Filter data={mockData} />);
    expect(screen.queryByText('단계 2 선택')).not.toBeInTheDocument();
  });

  test('자식이 없는 경우 2단계는 렌더링되지 않는다', () => {
    render(<Filter data={noChildrenData} />);
    expect(screen.getByText('단계 1 선택')).toBeInTheDocument();
    expect(screen.queryByText('단계 2 선택')).not.toBeInTheDocument();
  });

  test('옵션이 빈 배열이면 해당 단계는 렌더링되지 않는다', async () => {
    const user = userEvent.setup();
    render(<Filter data={emptyOptionsData} />);

    await user.click(screen.getByRole('button', { name: /단계 1 선택/i }));
    await user.click(screen.getByText('Z'));
    await user.click(screen.getByRole('button', { name: /단계 2 선택/i }));
    await user.click(screen.getByText('Z-1'));

    expect(screen.queryByText('단계 3 선택')).not.toBeInTheDocument();
  });

  test('placeholder가 전달되지 않으면 기본값이 적용된다', () => {
    render(<Filter data={mockData} />);
    expect(screen.getByText('단계 1 선택')).toBeInTheDocument();
  });

  test('placeholder가 프롭스로 전달되면 해당 값이 표시된다', () => {
    render(
      <Filter
        data={mockData}
        levelPlaceholders={['1단계 선택해주세요']}
      />
    );
    expect(screen.getByText('1단계 선택해주세요')).toBeInTheDocument();
  });

  describe('사용자 상호작용', () => {
    test('옵션을 선택하면 onChange가 호출된다', async () => {
      const user = userEvent.setup();
      const mockChange = jest.fn();

      render(
        <Filter
          data={mockData}
          onChange={mockChange}
        />
      );

      await user.click(screen.getByRole('button', { name: /단계 1 선택/i }));
      await user.click(screen.getByText('A'));

      expect(mockChange).toHaveBeenCalledWith(['a']);
    });

    test('전체 선택 흐름이 동작한다', async () => {
      const user = userEvent.setup();
      const mockChange = jest.fn();

      render(
        <Filter
          data={mockData}
          onChange={mockChange}
        />
      );

      await user.click(screen.getByRole('button', { name: /단계 1 선택/i }));
      await user.click(screen.getByText('A'));
      await user.click(screen.getByRole('button', { name: /단계 2 선택/i }));
      await user.click(screen.getByText('A-1'));

      expect(mockChange).toHaveBeenLastCalledWith(['a', 'a1']);
    });
  });
});
