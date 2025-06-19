'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface ParticipantsInputProps {
  value: number;
  onChange: (v: number) => void;
  label?: string;
  className?: string;
  min?: number;
  max?: number;
}

const NormalParticipantsInput: React.FC<ParticipantsInputProps> = ({
  value,
  onChange,
  className,
  min = 2,
  max = 50,
}) => (
  <div className={cn('flex items-center justify-between', className)}>
    <div className='text-14_B text-black'>참여 인원 수</div>
    <div className='flex items-center justify-center gap-0.5 rounded-2xl border border-gray-100 px-10 py-3.5 text-16_B'>
      <input
        type='number'
        min={min}
        max={max}
        value={value === 0 ? '' : value}
        onChange={(e) => {
          const newValue = e.target.value === '' ? 0 : Number(e.target.value);
          if (newValue <= max) {
            onChange(newValue);
          }
        }}
        className='border-none text-right focus:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
      />
      <span className='text-left'>명</span>
    </div>
  </div>
);

export default NormalParticipantsInput;
