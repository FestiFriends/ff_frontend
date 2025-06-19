'use client';
import React, { useState } from 'react';
import { Button } from '@/components/common';
import XIcon from '@/components/icons/XIcon';

interface TagSelectorProps {
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  label?: string;
  className?: string;
}

const NormalTagInput: React.FC<TagSelectorProps> = ({
  tags,
  onAdd,
  onRemove,
  className,
}) => {
  const [input, setInput] = useState('');
  const handleAdd = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      onAdd(input.trim());
      setInput('');
    }
  };
  return (
    <div className={className}>
      <div className='mb-2.5 text-14_B text-black'>태그 추가</div>
      <div className='flex flex-col gap-4'>
        <div className='flex gap-2'>
          <input
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleAdd();
              }
            }}
            placeholder='태그를 추가해 주세요'
            className='flex-1 rounded-2xl border border-gray-100 px-5 py-4 placeholder-gray-400'
          />
          <Button
            onClick={handleAdd}
            disabled={!input.trim()}
            size='sm'
            color={!input.trim() ? 'disable' : 'normal'}
            className='rounded-2xl px-[17px] py-[17.5px]'
          >
            추가
          </Button>
        </div>

        <div className='mt-2 flex flex-wrap gap-2'>
          {tags.map((t) => (
            <span
              key={t}
              className='flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm'
            >
              {t}
              <button
                onClick={() => onRemove(t)}
                className='flex items-center justify-center text-gray-500'
              >
                {/* // TODO: 아이콘 변경 필요 */}
                <XIcon className='flex h-4 w-4 items-center justify-center' />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NormalTagInput;
