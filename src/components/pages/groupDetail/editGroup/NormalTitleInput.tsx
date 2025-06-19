'use client';
import React from 'react';

interface TitleInputProps {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  className?: string;
}

const NormalTitleInput: React.FC<TitleInputProps> = ({
  value,
  onChange,
  className,
}) => (
  <div className={className}>
    <div className='mb-2.5 text-14_B text-black'>제목</div>
    <input
      type='text'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='w-full rounded-2xl border border-gray-100 px-5 py-4 text-16_M text-gray-950'
    />
  </div>
);

export default NormalTitleInput;
