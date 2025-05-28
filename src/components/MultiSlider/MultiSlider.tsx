'use client';

import { useState } from 'react';

interface MultiSliderProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  defaultValue?: [number, number];
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  marks?: Record<number, string>;
}

const rangeClasses =
  'pointer-events-none absolute z-2 h-3.5 w-full appearance-none bg-transparent opacity-0 [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-5 [&::-webkit-slider-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-webkit-slider-thumb]:w-5 [&::-moz-range-thumb]:cursor-pointer [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:border-0 [&::-webkit-slider-thumb]:border-0 [&::-moz-range-thumb]:bg-red-400 [&::-webkit-slider-thumb]:bg-red-400';

const MultiSlider = ({
  min = 0,
  max = 100,
  step = 1,
  disabled,
  defaultValue = [min, max],
  value,
  onChange,
  marks,
}: MultiSliderProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] =
    useState<[number, number]>(defaultValue);
  const currentValue = isControlled ? value : internalValue;

  const handleChange = (
    index: 0 | 1,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(e.target.value);

    const newValue: [number, number] =
      index === 0 ? [value, currentValue[1]] : [currentValue[0], value];

    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  return (
    <div className='relative'>
      <input
        type='range'
        id='range-left'
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        value={currentValue[0]}
        onChange={(e) => handleChange(0, e)}
        className={rangeClasses}
      />
      <input
        type='range'
        id='range-right'
        disabled={disabled}
        min={min}
        max={max}
        step={step}
        value={currentValue[1]}
        onChange={(e) => handleChange(1, e)}
        className={rangeClasses}
      />

      <div
        id='slider'
        className='relative z-1 h-3.5'
      >
        <span
          id='track'
          className='absolute top-0 right-0 bottom-0 left-0 z-1 rounded-full bg-gray-400'
        ></span>
        <span
          id='range'
          className='absolute top-0 right-0 bottom-0 left-0 z-2 rounded-full bg-blue-400'
          style={{
            left: `${getPercent(Math.min(currentValue[0], currentValue[1]))}%`,
            right: `${100 - getPercent(Math.max(currentValue[0], currentValue[1]))}%`,
          }}
        ></span>
        <span
          id='thumb-left'
          className='absolute top-1/2 z-3 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400 bg-white'
          style={{ left: `${getPercent(currentValue[0])}%` }}
        >
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-sm text-gray-600'>
            {currentValue[0]}
          </span>
        </span>
        <span
          id='thumb-right'
          className='absolute top-1/2 z-3 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400 bg-white'
          style={{ left: `${getPercent(currentValue[1])}%` }}
        >
          <span className='absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 text-sm text-gray-600'>
            {currentValue[1]}
          </span>
        </span>
      </div>
    </div>
  );
};

export default MultiSlider;
