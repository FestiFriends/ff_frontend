import { useState } from 'react';
import { parse, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';

interface TimeInputProps {
  value: string;
  onInputChange: (value: string) => void;
  onChange: (date: Date) => void;
  readOnly?: boolean;
}

const TimeInput = ({
  value,
  onInputChange,
  onChange,
  readOnly,
}: TimeInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '').slice(0, 4);
    onInputChange(raw);

    if (raw.length === 4) {
      const formatted = `${raw.slice(0, 2)}:${raw.slice(2)}`;
      const parsed = parse(formatted, 'HH:mm', new Date(), { locale: ko });

      if (!isNaN(parsed.getTime())) {
        onChange(parsed);
      }
    }
  };

  const handleBlur = () => setIsFocused(false);
  const handleFocus = () => setIsFocused(true);

  let displayValue = value;
  if (!isFocused && value.length === 4) {
    const formatted = `${value.slice(0, 2)}:${value.slice(2)}`;
    const parsed = parse(formatted, 'HH:mm', new Date(), { locale: ko });
    if (!isNaN(parsed.getTime())) {
      displayValue = format(parsed, 'aa h:mm', { locale: ko });
    }
  } else if (isFocused && value.length === 4) {
    displayValue = `${value.slice(0, 2)}:${value.slice(2)}`;
  }

  return (
    <input
      type='text'
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onFocus={handleFocus}
      inputMode='numeric'
      placeholder='시간'
      maxLength={5}
      readOnly={readOnly}
      className={cn(
        'h-[54px] w-[100px] rounded-[16px] border border-gray-100 px-[12px] py-[16px] text-[14px] leading-[22px] font-medium placeholder:text-gray-500',
        readOnly
          ? 'pointer-events-none bg-gray-50 text-gray-400'
          : 'text-gray-950'
      )}
    />
  );
};

export default TimeInput;
