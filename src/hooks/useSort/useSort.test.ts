import { renderHook, act } from '@testing-library/react';
import useSort from './useSort';

interface Sample1 {
  name: string;
  count: number;
}

interface Sample2 {
  name: string;
}

describe('useSort 훅 테스트', () => {
  const sampleData: Sample1[] = [
    { name: 'Charlie', count: 3 },
    { name: 'Alice', count: 1 },
    { name: 'Bob', count: 2 },
  ];

  describe('정렬 함수 적용', () => {
    const customSortMap = {
      name: (a: Sample1, b: Sample1) => a.name.localeCompare(b.name),
      count: (a: Sample1, b: Sample1) => a.count - b.count,
    };

    it('기본 sortKey로 정렬되어야 한다', () => {
      const { result } = renderHook(() =>
        useSort(sampleData, {
          defaultKey: 'name',
          customSortMap,
        })
      );

      expect(result.current.sortKey).toBe('name');
      expect(result.current.sortedData.map((d) => d.name)).toEqual([
        'Alice',
        'Bob',
        'Charlie',
      ]);
    });

    it('sortKey 변경 시 정렬되어야 한다', () => {
      const { result } = renderHook(() =>
        useSort(sampleData, {
          defaultKey: 'name',
          customSortMap,
        })
      );

      act(() => {
        result.current.setSortKey('count');
      });

      expect(result.current.sortKey).toBe('count');
      expect(result.current.sortedData.map((d) => d.count)).toEqual([1, 2, 3]);
    });

    it('정렬 함수가 없으면 원본 데이터 순서를 유지해야 한다', () => {
      const { result } = renderHook(() =>
        useSort(sampleData, {
          defaultKey: 'invalidKey',
          customSortMap,
        })
      );

      expect(result.current.sortedData).toEqual(sampleData);
    });
  });

  describe('옵션 기본값 처리', () => {
    const sampleData: Sample2[] = [{ name: 'A' }, { name: 'B' }];

    it('옵션 없이 호출하면 기본값으로 설정되어야 한다', () => {
      const { result } = renderHook(() => useSort(sampleData));

      expect(result.current.sortKey).toBe('');
      expect(result.current.sortedData).toEqual(sampleData);
    });

    it('빈 옵션 객체를 넘기면 기본값으로 되어야 한다', () => {
      const { result } = renderHook(() => useSort(sampleData, {}));

      expect(result.current.sortKey).toBe('');
      expect(result.current.sortedData).toEqual(sampleData);
    });

    it('defaultKey만 주어지면 정렬되지 않는다', () => {
      const { result } = renderHook(() =>
        useSort(sampleData, { defaultKey: 'name' })
      );

      expect(result.current.sortKey).toBe('name');
      expect(result.current.sortedData).toEqual(sampleData);
    });

    it('customSortMap만 주어지면 defaultKey는 빈 문자열이어야 한다', () => {
      const sortMap = {
        name: (a: Sample2, b: Sample2) => a.name.localeCompare(b.name),
      };

      const { result } = renderHook(() =>
        useSort(sampleData, { customSortMap: sortMap })
      );

      expect(result.current.sortKey).toBe('');
      expect(result.current.sortedData).toEqual(sampleData);
    });
  });
});
