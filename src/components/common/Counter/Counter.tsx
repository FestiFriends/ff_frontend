import React from 'react';

interface CounterProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  className?: string;
}

const Counter: React.FC<CounterProps> = ({
  value,
  min = 0,
  max = 100,
  onChange,
  disabled = false,
  className = '',
}) => {
  const increment = () => {
    const newValue = Math.min(value + 1, max);
    onChange(newValue);
  };

  const decrement = () => {
    const newValue = Math.max(value - 1, min);
    onChange(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = parseInt(e.target.value) || min;
    const clampedValue = Math.min(Math.max(inputValue, min), max);
    onChange(clampedValue);
  };

  return (
    <div
      className={`flex items-center rounded-lg border border-gray-300 ${className}`}
    >
      <button
        type='button'
        onClick={decrement}
        disabled={disabled || value <= min}
        className='px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
      >
        -
      </button>
      {/* ! type='number' 일경우 webkit으로 기본 버튼이 제거가 가능했으나 firefox에서는 제거가 불가능해 text를 사용 */}
      <input
        type='text'
        value={value}
        min={min}
        max={max}
        onChange={handleInputChange}
        disabled={disabled}
        className='w-16 border-0 px-2 py-2 text-center focus:outline-none disabled:bg-gray-50'
      />
      <button
        type='button'
        onClick={increment}
        disabled={disabled || value >= max}
        className='px-3 py-2 text-gray-600 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
      >
        +
      </button>
    </div>
  );
};

export default Counter;
