import React, { useState } from 'react';
import {
  useController,
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TagInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues, TName>;
  className?: string;
}

const TagInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  rules,
  className,
}: TagInputProps<TFieldValues, TName>) => {
  const [inputValue, setInputValue] = useState('');

  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  const tags: string[] = field.value || [];

  const addTag = (tagToAdd: string) => {
    const trimmedValue = tagToAdd.trim();
    if (trimmedValue && !tags.includes(trimmedValue)) {
      field.onChange([...tags, trimmedValue]);
      return true;
    }
    return false;
  };

  const removeTag = (tagToRemove: string) => {
    field.onChange(tags.filter((tag: string) => tag !== tagToRemove));
  };

  const handleInputAdd = () => {
    if (addTag(inputValue)) {
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleInputAdd();
    }
  };

  return (
    <div className={className}>
      <div className='mb-4 flex gap-2'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='태그를 추가해 주세요.'
          className='min-w-0 flex-1 rounded-2xl border border-gray-400 px-5 py-4 text-gray-400 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />
        <button
          type='button'
          onClick={handleInputAdd}
          className={cn(
            'flex w-[62px] items-center justify-center rounded-2xl px-10 py-3.5 text-center text-16_M text-sm transition-colors',
            inputValue.trim()
              ? 'bg-red-500 text-white hover:bg-red-600'
              : 'bg-gray-200 text-gray-50 hover:bg-gray-300'
          )}
        >
          <span className='whitespace-nowrap'>추가</span>
        </button>
      </div>

      {tags.length > 0 && (
        <div className='mb-3 flex flex-wrap gap-2'>
          {tags.map((tag: string, index: number) => (
            <div
              key={index}
              className={cn(
                'text-md flex items-center rounded-full border border-gray-100 px-5 py-3 text-black transition-colors'
              )}
              onClick={() => removeTag(tag)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') removeTag(tag);
              }}
              role='button'
              tabIndex={0}
            >
              <span>{tag}</span>
              <X className='ml-2 h-4 w-4 text-black hover:text-gray-700' />
            </div>
          ))}
        </div>
      )}

      {error && (
        <p
          className='mt-1 text-sm text-red-500'
          role='alert'
        >
          {error.message}
        </p>
      )}
    </div>
  );
};

export default TagInput;
