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
    <DropdownTriggerWithIcon
      placeholder={placeholder}
      className='whitespace-nowrap'
    />
    <DropdownContent className='mt-2 flex w-full flex-col rounded-[12px] border-1 border-gray-50 bg-white whitespace-nowrap'>
      {options.map((option, index) => (
        <DropdownItem
          key={option.value}
          label={option.label}
          onClick={() => onChange?.(option.value)}
          className={
            index === 0
              ? 'flex items-center justify-center gap-2 border-b-1 border-gray-50 px-4 pt-4.5 pb-3.5 text-16_M leading-normal tracking-[-0.4px]'
              : index === options.length - 1
                ? 'flex items-center justify-center gap-2 px-4 pt-3.5 pb-4.5 text-16_M leading-normal tracking-[-0.4px]'
                : 'flex items-center justify-center gap-2 border-b-1 border-gray-50 px-4 py-3.5 text-16_M leading-normal tracking-[-0.4px]'
          }
        >
          {option.label}
        </DropdownItem>
      ))}
    </DropdownContent>
  </Dropdown>
);

export default SortDropdownUi;