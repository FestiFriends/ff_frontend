'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import MESSAGE from './ButtonGroupMessage';

// 타입 정의
interface ButtonGroupContextType {
  selectedValues: string[];
  toggleSelection: (value: string) => void;
  isSelected: (value: string) => boolean;
  canSelect: (value: string) => boolean;
  disabled?: boolean;
}

export interface ButtonGroupProps {
  children: ReactNode;
  mode?: 'single' | 'multiple';
  maxSelections?: number;
  defaultValue?: string | string[];
  value?: string | string[];
  onChange?: (value: string | string[]) => void;
  disabled?: boolean;
}

// ? : button을 extends할까?
export interface ButtonGroupItemProps {
  children: ReactNode;
  value: string;
  disabled?: boolean;
  className?: string;
  onClick?: (value: string) => void;
  'data-testid'?: string;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

// Context
const ButtonGroupContext = createContext<ButtonGroupContextType | null>(null);

// 메인 ButtonGroup 컴포넌트
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  mode = 'single',
  maxSelections,
  defaultValue,
  value,
  onChange,
  disabled = false,
}) => {
  // 내부 상태
  const [internalValue, setInternalValue] = useState<string[]>(() => {
    const initialValue = value ?? defaultValue;
    return initialValue
      ? Array.isArray(initialValue)
        ? initialValue
        : [initialValue]
      : [];
  });

  // 현재 선택된 값들
  const selectedValues = value
    ? Array.isArray(value)
      ? value
      : [value]
    : internalValue;

  const isSelected = (itemValue: string) => selectedValues.includes(itemValue);

  const canSelect = (itemValue: string) => {
    if (disabled || isSelected(itemValue)) return true;
    return (
      mode === 'single'
      || !maxSelections
      || selectedValues.length < maxSelections
    );
  };

  const toggleSelection = (itemValue: string) => {
    if (disabled) return;

    const newSelection =
      mode === 'single'
        ? isSelected(itemValue)
          ? []
          : [itemValue]
        : isSelected(itemValue)
          ? selectedValues.filter((v) => v !== itemValue)
          : maxSelections && selectedValues.length >= maxSelections
            ? selectedValues
            : [...selectedValues, itemValue];

    if (value === undefined) setInternalValue(newSelection);

    onChange?.(mode === 'single' ? (newSelection[0] ?? '') : newSelection);
  };

  return (
    <ButtonGroupContext.Provider
      value={{
        selectedValues,
        toggleSelection,
        isSelected,
        canSelect,
        disabled,
      }}
    >
      {children}
    </ButtonGroupContext.Provider>
  );
};

// ButtonGroupItem 컴포넌트
export const ButtonGroupItem: React.FC<ButtonGroupItemProps> = ({
  children,
  value,
  disabled: itemDisabled = false,
  className = '',
  onClick,
  ...restProps
}) => {
  const context = useContext(ButtonGroupContext);

  if (!context) {
    throw new Error(MESSAGE.NOT_IN_BUTTON_GROUP);
  }

  const {
    isSelected,
    toggleSelection,
    canSelect,
    disabled: groupDisabled,
  } = context;
  const selected = isSelected(value);
  const isDisabled =
    itemDisabled || groupDisabled || (!selected && !canSelect(value));

  const handleClick = () => {
    if (!isDisabled && canSelect(value)) {
      toggleSelection(value);
      onClick?.(value);
    }
  };

  return (
    <button
      {...restProps}
      type='button'
      className={className}
      onClick={handleClick}
      disabled={isDisabled}
      data-selected={selected}
      data-value={value}
      aria-pressed={selected}
    >
      {children}
    </button>
  );
};
