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
  hasBorder?: boolean;
  showLength?: boolean;
}

const TextareaInput = ({
  value,
  onChange,
  placeholder = '',
  rows,
  maxLength = 150,
  className,
  hideScrollbar = true,
  isValidText = true,
  hasBorder = true,
  showLength = true,
}: TextareaInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = e.target.value;
    onChange(maxLength ? inputValue.slice(0, maxLength) : inputValue);
  };

  const baseClass =
    'h-full w-full resize-none rounded-md px-5 py-4 text-16_M text-gray-950 bg-white placeholder:text-16_M placeholder:text-gray-500';
  let borderClass = '';
  if (hasBorder) {
    borderClass = isValidText
      ? 'border border-gray-100 shadow-sm focus:ring-1 focus:outline-none focus:ring-gray-800'
      : 'shadow-sm ring-1 ring-red-500 focus:ring-red-500 focus:outline-none';
  } else {
    borderClass = 'focus:outline-none';
  }
  const scrollbarClass = hideScrollbar ? 'scrollbar-hide' : '';
  const finalClass = cn(baseClass, borderClass, scrollbarClass, className);

  return (
    <div className='flex h-full w-full flex-col gap-1'>
      <textarea
        className={finalClass}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        aria-invalid={!isValidText}
      />
      <div
        className={cn(
          'flex items-center justify-end text-12_M',
          !isValidText && 'justify-between'
        )}
      >
        {!isValidText && (
          <p className='text-red-500'>부적절한 단어가 포함되어 있습니다</p>
        )}
        {showLength && (
          <div className='text-right text-gray-500'>
            {value.length} / {maxLength}자
          </div>
        )}
      </div>
    </div>
  );
};

export default TextareaInput;
