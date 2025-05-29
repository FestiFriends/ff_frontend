'use client';

import { cn } from '@/lib/utils';
import {
  Dropdown,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
} from '@/components/Dropdown';

interface FilterProps {
  options: filterOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface filterOption {
  label: string;
  value: string;
}

const FilterUi = ({
  options,
  value,
  onChange,
  placeholder = '선택',
  className,
}: FilterProps) => {
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption?.label;

  const handleClick = (value: string) => () => {
    onChange?.(value);
  };

  return (
    <div className={cn('inline-block', className)}>
      <Dropdown>
        <DropdownTrigger
          value={displayLabel}
          placeholder={placeholder}
        ></DropdownTrigger>

        <DropdownContent>
          {options.map((option) => (
            <DropdownItem
              value={option.value}
              key={option.value}
              label={option.label}
              onClick={handleClick(option.value)}
            >
              {option.label}
            </DropdownItem>
          ))}
        </DropdownContent>
      </Dropdown>
    </div>
  );
};

export default FilterUi;
