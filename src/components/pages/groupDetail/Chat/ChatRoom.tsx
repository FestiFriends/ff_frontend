'use client';

import { useState } from 'react';
import Button from '@/components/common/Button/Button';
import TextInput from '@/components/common/TextInput/TextInput';
import { useChatWebSocket } from '@/hooks/chatHooks/chatHooks';

const chatRoomId = '1';

const ChatRoom = () => {
  const { messages, sendMessage, isConnected } = useChatWebSocket(chatRoomId);
  const [message, setMessage] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    sendMessage(message);
    setMessage('');
  };

  // console.log(messages);
  // console.log(isConnected);

  return (
    <div className='bg-gray-100 p-2'>
      <div>
        <p className='mb-4 text-sm text-gray-600'>
          Status:{' '}
          <span className={isConnected ? 'text-green-500' : 'text-red-500'}>
            {isConnected ? '🟢 연결됨' : '🔴 연결 안됨'}
          </span>
        </p>
      </div>

      <div className='mb-4 h-52 space-y-2 overflow-y-auto rounded-lg border border-gray-300 bg-white p-4 shadow-inner'>
        {messages.map((message, index) => (
          <div
            key={index}
            className='text-sm text-gray-800'
          >
            👤 {message}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className='flex gap-1'
      >
        <TextInput
          type='text'
          placeholder='메세지를 입력하세요'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='bg-white'
        />
        <Button
          type='submit'
          variant='primary'
          size='sm'
        >
          전송
        </Button>
      </form>
    </div>
  );
};

export default ChatRoom;
