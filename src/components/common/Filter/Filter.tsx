'use client';

import { useCallback } from 'react';
import { MultiLevelData, useMultiLevelFilter } from '@/hooks';
import FilterUi from './FilterUi';

interface FilterProps {
  data: MultiLevelData[];
  value?: string[];
  levelPlaceholders?: string[];
  onChange?: (values: string[]) => void;
  stopAtLevel?: number;
}

const Filter = ({
  data,
  levelPlaceholders,
  onChange,
  stopAtLevel,
}: FilterProps) => {
  const { selectedValues, optionsByLevel, setValueAtLevel } =
    useMultiLevelFilter(data, { stopAtLevel });

  const levelHandleChange = useCallback(
    (level: number) => (val: string) => {
      setValueAtLevel(level, val);
      const updated = [...selectedValues.slice(0, level), val];
      onChange?.(updated);
    },
    [onChange, setValueAtLevel, selectedValues]
  );

  return (
    <>
      {optionsByLevel.map((options, i) => {
        const currentValue = selectedValues[i];
        const hasParentSelected =
          i === 0 || selectedValues[i - 1] !== undefined;

        if (!hasParentSelected || options.length === 0) return null;

        return (
          <FilterUi
            key={i}
            placeholder={levelPlaceholders?.[i] ?? `단계 ${i + 1} 선택`}
            value={currentValue}
            options={options.map((opt) => ({
              label: opt.label,
              value: opt.value,
            }))}
            onChange={levelHandleChange(i)}
          />
        );
      })}
    </>
  );
};

export default Filter;
