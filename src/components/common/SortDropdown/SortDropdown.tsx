'use client';

import { useState } from 'react';
import SortDropdownUi from './SortDropdownUi';

export interface SortOption {
  label: string;
  value: string;
}

interface SortDropdownProps {
  options: SortOption[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
}

const SortDropdown = ({
  options,
  defaultValue = '',
  onChange,
  placeholder,
  initialValue = '',
}: SortDropdownProps) => {
  const [selectedValue, setSelectedValue] = useState(
    initialValue || defaultValue
  );

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <SortDropdownUi
      options={options}
      selectedValue={selectedValue}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default SortDropdown;
