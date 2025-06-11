'use client';

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
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
  selectedValue,
  onChange,
  placeholder = '정렬',
}: SortDropdownUiProps) => {
  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <Dropdown>
      <DropdownTrigger placeholder={displayText} />
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
};

export default SortDropdownUi;
