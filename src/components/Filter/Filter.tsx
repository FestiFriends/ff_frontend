import {
  useMultiLevelFilter,
  MultiLevelData,
} from '@/hooks/useMultiLevelFilter/useMultiLevelFilter';
import FilterUi from '@/components/Filter/FilterUi';

interface FilterProps {
  data: MultiLevelData[];
  levelPlaceholders?: string[];
  onChange?: (values: string[]) => void;
}

const Filter = ({ data, levelPlaceholders, onChange }: FilterProps) => {
  const { selectedValues, optionsByLevel, setValueAtLevel } =
    useMultiLevelFilter(data);

  return (
    <div className='space-y-4'>
      {optionsByLevel.map((options, i) => {
        const value = selectedValues[i];
        const hasParentSelected =
          i === 0 || selectedValues[i - 1] !== undefined;

        if (!hasParentSelected || options.length === 0) return null;

        return (
          <FilterUi
            key={i}
            placeholder={levelPlaceholders?.[i] ?? `단계 ${i + 1} 선택`}
            value={value}
            options={options.map((opt) => ({
              label: opt.label,
              value: opt.value,
            }))}
            onChange={(val) => {
              setValueAtLevel(i, val);
              onChange?.([...selectedValues.slice(0, i), val]);
            }}
          />
        );
      })}
    </div>
  );
};

export default Filter;
