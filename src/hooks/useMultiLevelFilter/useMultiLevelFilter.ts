'use client';
import { useMemo, useState } from 'react';

export interface MultiLevelData {
  label: string;
  value: string;
  children?: MultiLevelData[];
}

export const useMultiLevelFilter = (data: MultiLevelData[]) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const optionsByLevel = useMemo(() => {
    const result: MultiLevelData[][] = [];
    let currentData = data;

    for (let i = 0; i <= selectedValues.length; i++) {
      result.push(currentData);
      const selected = selectedValues[i];
      const next = currentData.find((item) => item.value === selected);
      if (!next || !next.children) break;
      currentData = next.children;
    }
    return result;
  }, [data, selectedValues]);

  const setValueAtLevel = (level: number, value: string) => {
    setSelectedValues((prev) => [...prev.slice(0, level), value]);
  };

  return {
    selectedValues,
    optionsByLevel,
    setValueAtLevel,
  };
};
