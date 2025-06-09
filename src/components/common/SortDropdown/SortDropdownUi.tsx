'use client';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTriggerWithIcon,
} from '../Dropdown';

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
  onChange,
  placeholder = '정렬',
}: SortDropdownUiProps) => (
  <Dropdown>
    <DropdownTriggerWithIcon placeholder={placeholder} />
    <DropdownContent>
      {options.map((option) => (
        <DropdownItem
          key={option.value}
          label={option.label}
          onClick={() => onChange?.(option.value)}
        >
          {option.label}
        </DropdownItem>
      ))}
    </DropdownContent>
  </Dropdown>
);
export default SortDropdownUi;
