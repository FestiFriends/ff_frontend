'use client';
import { useMemo, useState, useCallback } from 'react';

export interface MultiLevelData {
  label: string;
  value: string;
  children?: MultiLevelData[];
}

interface MultiLevelFilterOptions {
  stopAtLevel?: number;
}

export const useMultiLevelFilter = (
  data: MultiLevelData[],
  options: MultiLevelFilterOptions = {}
) => {
  const { stopAtLevel } = options;
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const optionsByLevel = useMemo(() => {
    const result: MultiLevelData[][] = [];
    let currentData = data;

    for (let i = 0; i <= selectedValues.length; i++) {
      if (stopAtLevel !== undefined && i > stopAtLevel) break;

      result.push(currentData);
      const selected = selectedValues[i];
      const next = currentData.find((item) => item.value === selected);
      if (!next || !next.children) break;

      currentData = next.children;
    }

    return result;
  }, [data, selectedValues, stopAtLevel]);

  const setValueAtLevel = (level: number, value: string) => {
    setSelectedValues((prev) => [...prev.slice(0, level), value]);
  };

  //TODO: 필터 리셋기능 추가
  const reset = () => setSelectedValues([]);

  const removeAtLevel = (level: number) => {
    setSelectedValues((prev) => prev.slice(0, level));
  };

  return {
    selectedValues,
    optionsByLevel,
    setValueAtLevel,
  };
};
