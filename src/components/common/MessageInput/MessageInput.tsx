'use client';

import { useState } from 'react';
import Button from '@/components/common/Button/Button';
import SendIcon from '@/components/icons/SendIcon';
import { cn } from '@/lib/utils';
import { hasProfanity } from '@/lib/utils';
import Toast from '../Toast/Toast';

interface MessageInputProps {
  disabled?: boolean;
  sendMessage: (message: string) => void;
  type: 'comment' | 'chat';
  maxLength?: number;
  minLength?: number;
  className?: string;
}

const MessageInput = ({
  disabled = false,
  sendMessage,
  type = 'chat',
  maxLength = 300,
  minLength = 1,
  className,
}: MessageInputProps) => {
  const [message, setMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const validateMessage = (message: string): boolean => {
    if (message.length > maxLength) {
      setError(`최대 ${maxLength}자까지 입력 가능합니다.`);
      return false;
    }
    if (hasProfanity(message)) {
      setError('부적절한 표현이 포함되어 있습니다.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateMessage(message)) {
      return;
    }

    sendMessage(message.trim());
    setMessage('');
    setError('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMessage = e.target.value;

    if (newMessage.length <= maxLength) {
      setMessage(newMessage);
      validateMessage(newMessage);
    } else {
      setMessage(newMessage.slice(0, maxLength));
      setError(`최대 ${maxLength}자까지 입력 가능합니다.`);
    }
  };

  const isSubmitDisabled =
    disabled
    || message.trim().length < minLength
    || message.length > maxLength
    || hasProfanity(message)
    || !!error;

  return (
    <div
      className={cn(
        'fixed bottom-0 z-1 flex w-full flex-col gap-1',
        type === 'comment' && 'border-t border-gray-100 bg-white p-4',
        className
      )}
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          'flex h-11 w-full flex-1 gap-2.5 rounded-[100px] border-1 border-gray-100 bg-white py-1.5 pr-2 pl-3.5',
          type === 'comment' && 'bg-gray-25',
          error && 'ring-1 ring-red-500'
        )}
      >
        <input
          type='text'
          placeholder={
            type === 'comment' ? '댓글을 입력하세요' : '메세지를 입력하세요'
          }
          disabled={disabled}
          value={message}
          onChange={handleInputChange}
          className='flex w-full items-center text-16_M text-gray-950 placeholder:text-16_M placeholder:leading-normal placeholder:tracking-[-0.35px] placeholder:text-gray-400 focus:outline-none'
        />
        <Button
          type='submit'
          variant='primary'
          disabled={isSubmitDisabled}
          className='flex w-11 shrink-0 items-center justify-center self-stretch rounded-[100px] px-3 py-1.5'
        >
          <SendIcon className='aspect-square h-4 w-4 shrink-0' />
        </Button>
      </form>

      {error && (
        <Toast
          message={error}
          type='error'
          onClose={() => {}}
          className='bottom-5/6 left-1/2'
        />
      )}
    </div>
  );
};

export default MessageInput;
