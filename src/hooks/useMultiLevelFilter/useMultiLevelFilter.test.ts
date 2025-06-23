import { renderHook, act } from '@testing-library/react';
import { useMultiLevelFilter, MultiLevelData } from './useMultiLevelFilter';

describe('useMultiLevelFilter', () => {
  const mockData: MultiLevelData[] = [
    {
      label: '서울',
      value: 'seoul',
      children: [
        {
          label: '강남구',
          value: 'gangnam',
          children: [
            { label: '역삼동', value: 'yeoksam' },
            { label: '논현동', value: 'nonhyeon' },
          ],
        },
        {
          label: '종로구',
          value: 'jongno',
          children: [
            { label: '명동', value: 'myeongdong' },
            { label: '인사동', value: 'insadong' },
          ],
        },
      ],
    },
    {
      label: '부산',
      value: 'busan',
      children: [
        {
          label: '해운대구',
          value: 'haeundae',
          children: [
            { label: '우동', value: 'udong' },
            { label: '중동', value: 'jungdong' },
          ],
        },
      ],
    },
    {
      label: '대구',
      value: 'daegu',
      // children 없음
    },
  ];

  describe('기본 기능', () => {
    it('초기 상태가 올바르게 설정된다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      expect(result.current.selectedValues).toEqual([]);
      expect(result.current.optionsByLevel).toHaveLength(1);
      expect(result.current.optionsByLevel[0]).toBe(mockData);
    });

    it('첫 번째 레벨에서 값을 선택할 수 있다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });

      expect(result.current.selectedValues).toEqual(['seoul']);
      expect(result.current.optionsByLevel).toHaveLength(2);
      expect(result.current.optionsByLevel[1]).toEqual(mockData[0].children);
    });

    it('두 번째 레벨에서 값을 선택할 수 있다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });

      act(() => {
        result.current.setValueAtLevel(1, 'gangnam');
      });

      expect(result.current.selectedValues).toEqual(['seoul', 'gangnam']);
      expect(result.current.optionsByLevel).toHaveLength(3);
      expect(result.current.optionsByLevel[2]).toEqual(
        mockData[0].children![0].children
      );
    });

    it('세 번째 레벨에서 값을 선택할 수 있다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });

      act(() => {
        result.current.setValueAtLevel(1, 'gangnam');
      });

      act(() => {
        result.current.setValueAtLevel(2, 'yeoksam');
      });

      expect(result.current.selectedValues).toEqual([
        'seoul',
        'gangnam',
        'yeoksam',
      ]);
      expect(result.current.optionsByLevel).toHaveLength(3);
    });
  });

  describe('setValueAtLevel 기능', () => {
    it('중간 레벨의 값을 변경하면 하위 레벨이 제거된다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      // 3단계까지 선택
      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });
      act(() => {
        result.current.setValueAtLevel(1, 'gangnam');
      });
      act(() => {
        result.current.setValueAtLevel(2, 'yeoksam');
      });

      // 2번째 레벨 변경
      act(() => {
        result.current.setValueAtLevel(1, 'jongno');
      });

      expect(result.current.selectedValues).toEqual(['seoul', 'jongno']);
      expect(result.current.optionsByLevel[2]).toEqual(
        mockData[0].children![1].children
      );
    });

    it('첫 번째 레벨의 값을 변경하면 모든 하위 레벨이 제거된다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      // 3단계까지 선택
      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });
      act(() => {
        result.current.setValueAtLevel(1, 'gangnam');
      });
      act(() => {
        result.current.setValueAtLevel(2, 'yeoksam');
      });

      // 1번째 레벨 변경
      act(() => {
        result.current.setValueAtLevel(0, 'busan');
      });

      expect(result.current.selectedValues).toEqual(['busan']);
      expect(result.current.optionsByLevel).toHaveLength(2);
      expect(result.current.optionsByLevel[1]).toEqual(mockData[1].children);
    });

    it('존재하지 않는 값을 선택해도 에러가 발생하지 않는다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      act(() => {
        result.current.setValueAtLevel(0, 'nonexistent');
      });

      expect(result.current.selectedValues).toEqual(['nonexistent']);
      expect(result.current.optionsByLevel).toHaveLength(1);
    });
  });

  describe('children이 없는 항목 처리', () => {
    it('children이 없는 항목을 선택하면 더 이상 확장되지 않는다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      act(() => {
        result.current.setValueAtLevel(0, 'daegu');
      });

      expect(result.current.selectedValues).toEqual(['daegu']);
      expect(result.current.optionsByLevel).toHaveLength(1);
    });

    it('마지막 레벨에서 children이 없는 항목을 선택할 수 있다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });
      act(() => {
        result.current.setValueAtLevel(1, 'gangnam');
      });
      act(() => {
        result.current.setValueAtLevel(2, 'yeoksam');
      });

      expect(result.current.selectedValues).toEqual([
        'seoul',
        'gangnam',
        'yeoksam',
      ]);
    });
  });

  describe('reset 기능', () => {
    it('선택된 모든 값을 초기화한다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      // 값들 선택
      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });
      act(() => {
        result.current.setValueAtLevel(1, 'gangnam');
      });

      // 리셋
      act(() => {
        result.current.reset();
      });

      expect(result.current.selectedValues).toEqual([]);
      expect(result.current.optionsByLevel).toHaveLength(1);
      expect(result.current.optionsByLevel[0]).toBe(mockData);
    });
  });

  describe('removeAtLevel 기능', () => {
    it('특정 레벨 이후의 모든 값을 제거한다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      // 3단계까지 선택
      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });
      act(() => {
        result.current.setValueAtLevel(1, 'gangnam');
      });
      act(() => {
        result.current.setValueAtLevel(2, 'yeoksam');
      });

      // 레벨 1 이후 제거
      act(() => {
        result.current.removeAtLevel(1);
      });

      expect(result.current.selectedValues).toEqual(['seoul']);
      expect(result.current.optionsByLevel).toHaveLength(2);
    });

    it('레벨 0에서 제거하면 모든 값이 제거된다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });
      act(() => {
        result.current.setValueAtLevel(1, 'gangnam');
      });

      act(() => {
        result.current.removeAtLevel(0);
      });

      expect(result.current.selectedValues).toEqual([]);
      expect(result.current.optionsByLevel).toHaveLength(1);
    });
  });

  describe('stopAtLevel 옵션', () => {
    it('stopAtLevel이 설정되면 해당 레벨까지만 확장된다', () => {
      const { result } = renderHook(() =>
        useMultiLevelFilter(mockData, { stopAtLevel: 1 })
      );

      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });

      expect(result.current.optionsByLevel).toHaveLength(2);

      act(() => {
        result.current.setValueAtLevel(1, 'gangnam');
      });

      // stopAtLevel이 1이므로 3번째 레벨로 확장되지 않음
      expect(result.current.optionsByLevel).toHaveLength(2);
      expect(result.current.selectedValues).toEqual(['seoul', 'gangnam']);
    });

    it('stopAtLevel이 0이면 첫 번째 레벨만 표시된다', () => {
      const { result } = renderHook(() =>
        useMultiLevelFilter(mockData, { stopAtLevel: 0 })
      );

      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });

      expect(result.current.optionsByLevel).toHaveLength(1);
      expect(result.current.selectedValues).toEqual(['seoul']);
    });
  });

  describe('빈 데이터 처리', () => {
    it('빈 배열로 초기화해도 에러가 발생하지 않는다', () => {
      const { result } = renderHook(() => useMultiLevelFilter([]));

      expect(result.current.selectedValues).toEqual([]);
      expect(result.current.optionsByLevel).toHaveLength(1);
      expect(result.current.optionsByLevel[0]).toEqual([]);
    });
  });

  describe('optionsByLevel 동작', () => {
    it('선택된 값에 따라 올바른 옵션들이 각 레벨에 표시된다', () => {
      const { result } = renderHook(() => useMultiLevelFilter(mockData));

      // 초기 상태
      expect(result.current.optionsByLevel[0]).toBe(mockData);

      // 서울 선택
      act(() => {
        result.current.setValueAtLevel(0, 'seoul');
      });

      expect(result.current.optionsByLevel[0]).toBe(mockData);
      expect(result.current.optionsByLevel[1]).toEqual([
        { label: '강남구', value: 'gangnam', children: expect.any(Array) },
        { label: '종로구', value: 'jongno', children: expect.any(Array) },
      ]);

      // 강남구 선택
      act(() => {
        result.current.setValueAtLevel(1, 'gangnam');
      });

      expect(result.current.optionsByLevel[2]).toEqual([
        { label: '역삼동', value: 'yeoksam' },
        { label: '논현동', value: 'nonhyeon' },
      ]);
    });
  });
});
