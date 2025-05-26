'use client';

const MESSAGE = {
  NOT_IN_BUTTON_GROUP: 'ButtonGroupItem은 ButtonGroup 안에서 사용해야 함',
};

import React, { createContext, useContext, useState, ReactNode } from 'react';

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

// 사용 예시
export const ButtonGroupExample: React.FC = () => {
  const [singleValue, setSingleValue] = useState<string>('');
  const [multipleValues, setMultipleValues] = useState<string[]>([]);

  return (
    <div className='space-y-8 p-6'>
      <div>
        <h3 className='mb-4 text-lg font-semibold'>단일 선택</h3>
        <ButtonGroup
          mode='single'
          value={singleValue}
          onChange={(value) => setSingleValue(value as string)}
        >
          <div className='flex gap-1'>
            <ButtonGroupItem
              value='option1'
              className='rounded border px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
            >
              옵션 1
            </ButtonGroupItem>
            <ButtonGroupItem
              value='option2'
              className='rounded border px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
            >
              옵션 2
            </ButtonGroupItem>
            <ButtonGroupItem
              value='option3'
              className='rounded border px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
            >
              옵션 3
            </ButtonGroupItem>
          </div>
        </ButtonGroup>
        <p className='mt-2 text-sm text-gray-600'>
          선택: {singleValue || '없음'}
        </p>
      </div>

      <div>
        <h3 className='mb-4 text-lg font-semibold'>다중 선택 (최대 2개)</h3>
        <ButtonGroup
          mode='multiple'
          maxSelections={2}
          value={multipleValues}
          onChange={(value) => setMultipleValues(value as string[])}
        >
          <div className='flex gap-1'>
            <ButtonGroupItem
              value='a'
              className='rounded border px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
            >
              A
            </ButtonGroupItem>
            <ButtonGroupItem
              value='b'
              className='rounded border px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
            >
              B
            </ButtonGroupItem>
            <ButtonGroupItem
              value='c'
              className='rounded border px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
            >
              C
            </ButtonGroupItem>
            <ButtonGroupItem
              value='d'
              className='rounded border px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
            >
              D
            </ButtonGroupItem>
          </div>
        </ButtonGroup>
        <p className='mt-2 text-sm text-gray-600'>
          선택: {multipleValues.length ? multipleValues.join(', ') : '없음'}
        </p>
      </div>

      <div>
        <h3 className='mb-4 text-lg font-semibold'>비제어 컴포넌트</h3>
        <ButtonGroup
          mode='multiple'
          defaultValue={['default1']}
          onChange={(value) => console.log('변경:', value)}
        >
          <div className='flex gap-1'>
            <ButtonGroupItem
              value='default1'
              className='rounded border px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
            >
              기본 선택
            </ButtonGroupItem>
            <ButtonGroupItem
              value='default2'
              className='rounded border px-4 py-2 hover:bg-gray-100 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
            >
              옵션 2
            </ButtonGroupItem>
            <ButtonGroupItem
              value='default3'
              disabled
              className='rounded border px-4 py-2 hover:bg-gray-100 disabled:opacity-50 data-[selected=true]:bg-blue-500 data-[selected=true]:text-white'
            >
              비활성화
            </ButtonGroupItem>
          </div>
        </ButtonGroup>
      </div>
    </div>
  );
};
