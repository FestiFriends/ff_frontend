import { cn } from '@/lib/utils';
import { GenderType } from '@/types/enums';

interface GenderSelectProps {
  value: GenderType | '';
  onChange: (value: GenderType) => void;
}

const GenderSelect = ({ value, onChange }: GenderSelectProps) => (
  <div>
    <div className='flex gap-2'>
      <button
        type='button'
        onClick={() => onChange('FEMALE')}
        className={cn(
          'h-[43px] w-[68px] rounded-full border text-14_M',
          value === 'FEMALE'
            ? 'border-transparent bg-gray-950 text-white'
            : 'border-gray-100 bg-white text-gray-700'
        )}
      >
        여성
      </button>
      <button
        type='button'
        onClick={() => onChange('MALE')}
        className={cn(
          'h-[43px] w-[68px] rounded-full border text-14_M',
          value === 'MALE'
            ? 'border-transparent bg-gray-950 text-white'
            : 'border-gray-100 bg-white text-gray-700'
        )}
      >
        남성
      </button>
    </div>
  </div>
);

export default GenderSelect;
