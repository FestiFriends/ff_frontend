'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

type TextInputType = 'text' | 'email' | 'password' | 'new-password';

interface TextInputProps {
  type?: TextInputType;
  id?: string;
  name?: string;
  label?: string;
  value: string;
  onChange: (_e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (_e: React.FocusEvent<HTMLInputElement>) => void;
  touched?: boolean;
  placeholder?: string;
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  error?: string;
  autoComplete?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  helperText?: string;
}

const SIZE_MAP = {
  sm: 'text-sm py-1.5 px-3',
  md: 'text-14_M h-[54px] px-[20px] py-[16px] ',
  lg: 'text-lg py-3 px-5',
  xl: 'text-xl py-4 px-6',
};

const ICON_SIZE = {
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
};

const TextInput = ({
  type = 'text',
  id,
  name,
  label,
  value,
  onChange,
  onBlur,
  touched,
  placeholder,
  required,
  readOnly,
  disabled,
  error,
  autoComplete,
  size = 'md',
  className,
  helperText,
}: TextInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordType = type === 'password' || type === 'new-password';
  const inputType = isPasswordType && showPassword ? 'text' : type;

  const showError = touched && !!error;
  const sizeKey = size in SIZE_MAP ? size : 'md';

  const autoCompleteMap: Record<string, string> = {
    password: 'current-password',
    'new-password': 'new-password',
    email: 'email',
  };

  const autoCompleteValue = autoComplete ?? autoCompleteMap[type] ?? 'off';

  const inputClass = cn(
    'w-full rounded-[16px] border border-gray-100 pr-10 text-gray-950 transition-colors placeholder:text-gray-500 focus:outline-none',
    SIZE_MAP[sizeKey],
    showError
      ? 'border-red-500 focus:ring-1 focus:ring-red-500'
      : 'border-gray-100 focus:ring-1 focus:ring-gray-800',
    disabled && 'cursor-not-allowed bg-gray-100 text-gray-400',
    readOnly && 'bg-gray-50 text-gray-500',
    className
  );

  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label
          htmlFor={id}
          className='text-14_B text-gray-950'
        >
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}
      <div className='relative'>
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
          required={required}
          autoComplete={autoCompleteValue}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className={inputClass}
        />
        {isPasswordType && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute top-1/2 right-3 -translate-y-1/2 text-gray-500'
            aria-label={showPassword ? '비밀번호 숨기기' : '비밀번호 보기'}
          >
            {showPassword ? (
              <EyeOff size={ICON_SIZE[sizeKey]} />
            ) : (
              <Eye size={ICON_SIZE[sizeKey]} />
            )}
          </button>
        )}
      </div>
      {showError && (
        <p
          id={`${id}-error`}
          className='mt-1 text-12_M text-red-500'
        >
          {error}
        </p>
      )}
      {!showError && helperText && (
        <p className='mt-[10px] ml-2 text-12_M text-gray-500'>{helperText}</p>
      )}
    </div>
  );
};

export default TextInput;
