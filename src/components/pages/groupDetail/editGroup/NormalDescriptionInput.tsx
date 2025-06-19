'use client';
import React from 'react';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';

interface DescriptionInputProps {
  value: string;
  onChange: (v: string) => void;
  label?: string;
  className?: string;
}

const NormalDescriptionInput: React.FC<DescriptionInputProps> = ({
  value,
  onChange,
  className,
}) => (
  <div className={className}>
    <div className='mb-2.5 text-14_B text-black'>소개글</div>
    <TextareaInput
      rows={10}
      value={value}
      onChange={onChange}
      maxLength={200}
      className='h-48 w-full resize-none rounded-2xl border border-gray-100 px-5 py-4 text-16_M text-gray-950'
    />
  </div>
);

export default NormalDescriptionInput;
