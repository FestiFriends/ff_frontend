import { cn } from '@/lib/utils';
import { GenderType } from '@/types/enums';

interface GenderSelectProps {
  value: GenderType | '';
  onChange: (value: GenderType) => void;
}

const GenderSelect = ({ value, onChange }: GenderSelectProps) => {
  const options: { label: string; value: GenderType }[] = [
    { label: '여성', value: 'FEMALE' },
    { label: '남성', value: 'MALE' },
  ];

  return (
    <div className='flex gap-2'>
      {options.map((option) => (
        <button
          key={option.value}
          type='button'
          onClick={() => onChange(option.value)}
          className={cn(
            'h-[43px] w-[68px] rounded-full border text-14_M',
            value === option.value
              ? 'border-transparent bg-gray-950 text-white'
              : 'border-gray-100 bg-white text-gray-700'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default GenderSelect;
