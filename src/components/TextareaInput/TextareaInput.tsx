'use client';
import { cn } from '@/lib/utils';

interface TextareaInputProps {
  value: string;
  onChange: (_value: string) => void;
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  className?: string;
  hideScrollbar?: boolean;
  isValidText?: boolean;
}

const TextareaInput = ({
  value,
  onChange,
  placeholder = '',
  rows = 4,
  maxLength = 150,
  className,
  hideScrollbar = true,
  isValidText = true,
}: TextareaInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    onChange(maxLength ? inputValue.slice(0, maxLength) : inputValue);
  };

  const borderColor = !isValidText
    ? 'ring-1 ring-red-500 focus:ring-red-500'
    : 'focus:ring-blue-500';

  return (
    <div className='flex w-full flex-col gap-1'>
      <textarea
        className={cn(
          'w-full resize-none rounded-md px-3 py-2 text-sm text-gray-900 shadow-sm focus:ring-1 focus:outline-none',
          borderColor,
          hideScrollbar && 'scrollbar-hide',
          className
        )}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!isValidText}
      />
      <div
        className={cn(
          'flex items-center justify-end',
          !isValidText && 'justify-between'
        )}
      >
        {!isValidText && (
          <p className='text-xs text-red-500'>
            부적절한 단어가 포함되어 있습니다
          </p>
        )}
        <div className='text-right text-xs text-gray-500'>
          {value.length} / {maxLength}자
        </div>
      </div>
    </div>
  );
};

export default TextareaInput;
