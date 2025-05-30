'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '@/components/Dropdown';

interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownUiProps {
  options: SortOption[];
  selectedValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const SortDropdownUi = ({
  options,
  selectedValue,
  onChange,
  placeholder = '정렬',
}: SortDropdownUiProps) => {
  const isEmptyValue = !selectedValue || selectedValue.trim() === '';
  const selectedLabel = !isEmptyValue
    ? options.find((o) => o.value === selectedValue)?.label
    : undefined;
  return (
    <Dropdown>
      <DropdownTrigger
        value={selectedLabel}
        placeholder={placeholder}
      />
      <DropdownContent>
        {options.map((option) => (
          <DropdownItem
            key={option.value}
            label={option.label}
            value={option.value}
            onClick={() => onChange?.(option.value)}
          >
            {option.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};

export default SortDropdownUi;
