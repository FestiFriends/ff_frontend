'use client';

interface AllDayToggleProps {
  value: boolean;
  onChange: (checked: boolean) => void;
}

const AllDayToggle = ({ value, onChange }: AllDayToggleProps) => (
  <div className='mt-[12px] flex items-center gap-[6px]'>
    <input
      id='allDay'
      type='checkbox'
      checked={value}
      onChange={(e) => onChange(e.target.checked)}
      className='accent-gray-500'
    />
    <label
      htmlFor='allDay'
      className='text-14_M text-gray-950'
    >
      하루 종일
    </label>
  </div>
);

export default AllDayToggle;
