'use client';

interface ScheduleLocationInputProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

const ScheduleLocationInput = ({
  value,
  onChange,
}: ScheduleLocationInputProps) => (
  <div className='mt-[20px] mb-[20px] flex items-center gap-[12px]'>
    <input
      type='text'
      placeholder='일정 장소 입력 (예: 강남역 카페)'
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className='h-[54px] w-full border-b border-gray-100 pl-[10px] text-16_M text-gray-950 placeholder:text-gray-500 focus:outline-none'
    />
  </div>
);

export default ScheduleLocationInput;
