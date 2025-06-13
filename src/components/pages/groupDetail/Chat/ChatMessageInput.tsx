'use client';

import { useState } from 'react';
import Button from '@/components/common/Button/Button';
import TextInput from '@/components/common/TextInput/TextInput';
import SendIcon from '@/components/icons/SendIcon';

interface ChatMessageInputProps {
  sendMessage: (message: string) => void;
}

const ChatMessageInput = ({ sendMessage }: ChatMessageInputProps) => {
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(message);
    setMessage('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='absolute bottom-0 z-1 flex w-full gap-2.5 rounded-[100px] border-1 border-gray-100 bg-white py-1.25 pr-3.5 pl-2'
    >
      <TextInput
        type='text'
        placeholder='메세지를 입력하세요'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className='flex items-center bg-gray-25 placeholder:text-14_B placeholder:leading-normal placeholder:tracking-[-0.35px] placeholder:text-gray-400'
      />
      <Button
        type='submit'
        variant='primary'
        className='flex w-8 items-center justify-center self-stretch px-3 py-1.5'
      >
        <SendIcon className='aspect-square h-4 w-4 shrink-0' />
      </Button>
    </form>
  );
};

export default ChatMessageInput;
