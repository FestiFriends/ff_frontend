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
  const PREDEFINED_TAGS = ['재즈', '인디', '강아지', '백드', '소통', '친구'];

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

  const STYLES = {
    input:
      'flex-1 rounded-lg border border-gray-300 px-3 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none',
    button: 'rounded-lg px-4 py-3 text-sm transition-colors focus:outline-none',
    addButton: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    tagButton:
      'rounded-full border border-gray-300 px-3 py-1 text-sm transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400',
  };

  return (
    <div className={className}>
      {/* 입력 필드 */}
      <div className='mb-4 flex gap-2'>
        <input
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder='태그를 추가해 주세요.'
          className='flex-1 rounded-lg border border-gray-300 px-3 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none'
        />
        <button
          type='button'
          onClick={handleInputAdd}
          className={cn(STYLES.button, STYLES.addButton)}
        >
          <span className='whitespace-nowrap'>추가</span>
        </button>
      </div>

      {/* 현재 태그들 */}
      {tags.length > 0 && (
        <div className='mb-3 flex flex-wrap gap-2'>
          {tags.map((tag: string, index: number) => (
            <button
              key={index}
              type='button'
              onClick={() => removeTag(tag)}
              className='inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 hover:bg-gray-200'
            >
              {tag}
              <X className='ml-2 h-4 w-4 text-gray-500 hover:text-gray-700' />
            </button>
          ))}
        </div>
      )}

      {/* 미리 정의된 태그들 */}
      <div className='flex flex-wrap gap-2'>
        {PREDEFINED_TAGS.map((tag) => (
          <button
            key={tag}
            type='button'
            onClick={() => addTag(tag)}
            disabled={tags.includes(tag)}
            className={cn(STYLES.button, STYLES.tagButton)}
          >
            {tag}
          </button>
        ))}
      </div>

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
