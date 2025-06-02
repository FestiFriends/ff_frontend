import React from 'react';
import { useRadioGroup } from './RadioGroupContext';

export interface RadioGroupItemProps {
  value: string;
  label: string;
  disabled?: boolean;
  className?: string;
  labelClassName?: string;
  children?: React.ReactNode;
}

const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  value,
  label,
  disabled = false,
  className = '',
  labelClassName = '',
  children,
}) => {
  const { value: selectedValue, onChange, name } = useRadioGroup();
  const isSelected = selectedValue === value;

  const handleChange = () => {
    if (!disabled && onChange) {
      onChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleChange();
    }
  };

  const styleClass = {
    label: `flex items-center ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'} ${isSelected ? 'selected' : ''} ${className}`,
    input: 'mr-2 accent-blue-600',
    labelText: labelClassName,
  };

  return (
    <label className={styleClass.label}>
      <input
        type='radio'
        name={name}
        value={value}
        checked={isSelected}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={styleClass.input}
      />
      <span className={styleClass.labelText}>{children || label}</span>
    </label>
  );
};

export default RadioGroupItem;
