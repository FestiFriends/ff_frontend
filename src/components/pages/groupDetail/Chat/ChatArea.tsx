'use client';

import { useChatWebSocket } from '@/hooks/chatHooks/chatHooks';
// import { CHAT_SAMPLE_DATA } from '@/mocks/handlers/chatHandlers';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageList from './ChatMessageList';

interface ChatAreaProps {
  userId: number | undefined;
  chatRoomId: number | undefined;
}

const ChatArea = ({ userId, chatRoomId }: ChatAreaProps) => {
  const { messages, sendMessage, statusMessage, isConnected } =
    useChatWebSocket(userId, chatRoomId);

  if (!isConnected) {
    return (
      <div className='relative flex h-[60dvh] flex-col items-center justify-center gap-2'>
        <p className='font-semibold text-gray-500'>{statusMessage}</p>
        <ChatMessageInput
          disabled={true}
          sendMessage={() => {}}
        />
      </div>
    );
  }

  return (
    <div className='relative flex h-[60dvh] flex-col gap-2'>
      {isConnected && (
        <>
          <ChatMessageList
            userId={userId}
            messages={messages}
            // messages={CHAT_SAMPLE_DATA}
          />
          <ChatMessageInput
            disabled={!isConnected}
            sendMessage={sendMessage}
          />
        </>
      )}
    </div>
  );
};
export default ChatArea;
