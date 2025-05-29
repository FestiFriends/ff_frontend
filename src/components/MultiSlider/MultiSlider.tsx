'use client';

import { cn } from '@/lib/utils';
import { useState } from 'react';

interface MultiSliderProps {
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  defaultValue?: [number, number];
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  valuePosition?: 'top' | 'bottom' | 'none';
  marks?: Record<number, string>;
}

const thumbSize = 20;

// TODO: 디자인 시안 나오면 스타일 수정 필요
const inputRangeClasses = `pointer-events-none absolute z-2 h-3 w-full appearance-none bg-transparent opacity-0 [&::-moz-range-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-[20px] [&::-webkit-slider-thumb]:h-[20px] [&::-moz-range-thumb]:w-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-moz-range-thumb]:cursor-pointer [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-moz-range-thumb]:rounded-none [&::-webkit-slider-thumb]:rounded-none [&::-moz-range-thumb]:border-0 [&::-webkit-slider-thumb]:border-0 [&::-moz-range-thumb]:bg-red-400 [&::-webkit-slider-thumb]:bg-red-400`;

const MultiSlider = ({
  min = 0,
  max = 100,
  step,
  disabled,
  defaultValue = [min, max],
  value,
  onChange,
  marks,
  valuePosition = 'top',
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
      index === 0
        ? [value, value > currentValue[1] ? value : currentValue[1]]
        : [value < currentValue[0] ? value : currentValue[0], value];

    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue);
  };

  const getPercent = (value: number) => ((value - min) / (max - min)) * 100;

  const getThumbOffset = (index: 0 | 1) =>
    thumbSize / 2 - ((thumbSize / 2) * getPercent(currentValue[index])) / 50;

  // TODO: 디자인 시안 나오면 스타일 수정 필요
  const rangeClasses = cn(
    // default style
    'absolute top-0 right-0 bottom-0 left-0 z-2 rounded-full bg-blue-400',

    // disabled style
    disabled && 'bg-gray-400'
  );

  const thumbClasses = cn(
    // default style
    'absolute top-1/2 z-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-blue-400 bg-white',

    // disabled style
    disabled && 'border-gray-400'
  );

  const thumbValueClasses = cn(
    // default style
    'absolute left-1/2 -translate-x-1/2 rounded-sm bg-white px-1 py-0.5 text-xs text-gray-600 shadow-sm',

    // valuePosition style
    {
      '-top-full -translate-y-1/2': valuePosition === 'top',
      '-bottom-full translate-y-1/2': valuePosition === 'bottom',
      hidden: valuePosition === 'none',
    }
  );

  // TODO: 디자인 시안 나오면 스타일 수정 필요
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
        className={inputRangeClasses}
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
        className={inputRangeClasses}
      />

      <div
        id='slider'
        className='relative z-1 h-3'
      >
        <span
          id='track'
          className='absolute top-0 right-0 bottom-0 left-0 z-1 rounded-full bg-gray-300'
        ></span>
        <span
          id='range'
          className={rangeClasses}
          style={{
            left: `${getPercent(Math.min(currentValue[0], currentValue[1]))}%`,
            right: `${100 - getPercent(Math.max(currentValue[0], currentValue[1]))}%`,
          }}
        ></span>
        <span
          id='thumb-left'
          className={thumbClasses}
          style={{
            width: `${thumbSize}px`,
            height: `${thumbSize}px`,
            left: `calc(${getPercent(currentValue[0])}% + ${getThumbOffset(0)}px)`,
            boxShadow: `0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px`,
          }}
        >
          <span className={thumbValueClasses}>{currentValue[0]}</span>
        </span>
        <span
          id='thumb-right'
          className={thumbClasses}
          style={{
            width: `${thumbSize}px`,
            height: `${thumbSize}px`,
            left: `calc(${getPercent(currentValue[1])}% + ${getThumbOffset(1)}px)`,
            boxShadow: `0 4px 6px -1px var(--tw-shadow-color, rgb(0 0 0 / 0.1)), 0 2px 4px -2px`,
          }}
        >
          <span className={thumbValueClasses}>{currentValue[1]}</span>
        </span>
      </div>

      {marks && (
        <div className='relative'>
          <div
            className='absolute text-gray-600 select-none'
            style={{ left: `${thumbSize / 2}px`, right: `${thumbSize / 2}px` }}
          >
            {Object.entries(marks).map(([key, label]) => {
              return (
                <span
                  key={key}
                  className='absolute inline-flex -translate-x-1/2 flex-col items-center text-center text-xs text-gray-600'
                  style={{ left: `${getPercent(parseInt(key))}%` }}
                >
                  <span className='mb-0.5 h-0.75 w-px bg-gray-400' />
                  <span className='whitespace-nowrap'>{label}</span>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSlider;
