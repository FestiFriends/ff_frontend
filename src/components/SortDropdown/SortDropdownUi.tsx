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
const getLabel = (option?: SortOption) =>
  option?.label?.trim() || option?.value;

const SortDropdownUi = ({
  options,
  selectedValue,
  onChange,
  placeholder = '정렬',
}: SortDropdownUiProps) => {
  const selectedOption = options.find((o) => o.value === selectedValue);
  const selectedLabel = getLabel(selectedOption);

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
            {getLabel(option)}
          </DropdownItem>
        ))}
      </DropdownContent>
    </Dropdown>
  );
};

export default SortDropdownUi;
