import { act, render, renderHook, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import useSort from '@/hooks/useSort/useSort';
import SortDropdown from './SortDropdown';

const sortOptions = [
  { label: '이름순', value: 'name' },
  { label: '모임 많은순', value: 'group-desc' },
  { label: '모임 적은순', value: 'group-asc' },
];

describe('SortDropdown 컴포넌트', () => {
  test('placeholder가 화면에 표시되어야 한다', () => {
    render(
      <SortDropdown
        options={sortOptions}
        placeholder='정렬 기준 선택'
      />
    );

    expect(screen.getByText('정렬 기준 선택')).toBeInTheDocument();
  });

  test('옵션을 클릭하면 onChange가 호출되어야 한다', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <SortDropdown
        options={sortOptions}
        placeholder='정렬 기준 선택'
        onChange={handleChange}
      />
    );

    await user.click(screen.getByText('정렬 기준 선택'));
    await user.click(screen.getByText('이름순'));

    expect(handleChange).toHaveBeenCalledWith('name');
  });

  test('label이 비어있으면 value가 표시되어야 한다', async () => {
    const user = userEvent.setup();

    render(
      <SortDropdown
        options={[{ label: '', value: 'group-desc' }]}
        placeholder='정렬'
      />
    );

    await user.click(screen.getByText('정렬'));
    await user.click(screen.getByText('group-desc'));

    expect(screen.getByText('group-desc')).toBeInTheDocument();
  });

  test('label이 공백 문자열이면 value가 표시되어야 한다', async () => {
    const user = userEvent.setup();

    const options = [{ label: ' ', value: 'group-asc' }];

    render(
      <SortDropdown
        options={options}
        placeholder='정렬'
      />
    );

    await user.click(screen.getByText('정렬'));
    await user.click(await screen.findByText('group-asc'));

    expect(await screen.findByText('group-asc')).toBeInTheDocument();
  });
});

describe('useSort 훅', () => {
  const data = [
    { name: 'C', date: '2023-01-01', groupCount: 1 },
    { name: 'A', date: '2023-02-01', groupCount: 3 },
    { name: 'B', date: '2023-03-01', groupCount: 2 },
  ];

  test('기본 정렬 키가 name이면 이름 기준 오름차순으로 정렬되어야 한다', () => {
    const { result } = renderHook(() => useSort(data, { defaultKey: 'name' }));

    expect(result.current.sortedData.map((d) => d.name)).toEqual([
      'A',
      'B',
      'C',
    ]);
  });

  test('정렬 기준을 바꾸면 sortedData가 변경되어야 한다', () => {
    const { result } = renderHook(() =>
      useSort(data, { defaultKey: 'group-desc' })
    );

    act(() => {
      result.current.setSortKey('group-asc');
    });

    expect(result.current.sortedData.map((d) => d.groupCount)).toEqual([
      1, 2, 3,
    ]);
  });

  test('존재하지 않는 정렬 키를 사용할 경우 원본 데이터를 반환해야 한다', () => {
    const { result } = renderHook(() =>
      useSort(data, { defaultKey: 'invalid-key' })
    );

    expect(result.current.sortedData.map((d) => d.name)).toEqual([
      'C',
      'A',
      'B',
    ]);
  });
});
