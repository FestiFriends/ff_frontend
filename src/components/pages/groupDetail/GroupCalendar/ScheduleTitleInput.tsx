'use client';

import { EventColorName } from '@/types/enums';
import EventColorDropdown from './EventColorDropdown';

interface ScheduleTitleInputProps {
  value: string;
  onChange: (value: string) => void;

  color: EventColorName;
  onColorChange: (value: EventColorName) => void;
}

const ScheduleTitleInput = ({
  value,
  onChange,
  color,
  onColorChange,
}: ScheduleTitleInputProps) => (
  <div className='mb-[20px] flex items-center gap-[12px]'>
    <EventColorDropdown
      value={color}
      onChange={onColorChange}
    />

    <input
      type='text'
      placeholder='일정 제목'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className='h-[54px] w-full border-b border-gray-100 pl-[10px] text-16_M text-gray-950 placeholder:text-gray-500 focus:outline-none'
    />
  </div>
);

export default ScheduleTitleInput;
