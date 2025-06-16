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
  const { messages, sendMessage } = useChatWebSocket(userId, chatRoomId);

  return (
    <div className='relative flex h-[60dvh] flex-col gap-2'>
      <ChatMessageList
        userId={userId}
        messages={messages}
        // messages={CHAT_SAMPLE_DATA}
      />
      <ChatMessageInput sendMessage={sendMessage} />
    </div>
  );
};
export default ChatArea;
