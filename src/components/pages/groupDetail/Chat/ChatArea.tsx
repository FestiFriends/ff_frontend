'use client';

import {
  useChatWebSocket,
  useGetChatHistory,
} from '@/hooks/chatHooks/chatHooks';
// import { CHAT_SAMPLE_DATA } from '@/mocks/handlers/chatHandlers';
import { ChatMessage } from '@/types/chat';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageList from './ChatMessageList';

interface ChatAreaProps {
  userId: number | undefined;
  chatRoomId: number;
}

const ChatArea = ({ userId, chatRoomId }: ChatAreaProps) => {
  const {
    messages: liveMessages,
    sendMessage,
    statusMessage,
    isConnected,
  } = useChatWebSocket(userId, chatRoomId);

  const {
    data: chatHistory,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetChatHistory(chatRoomId, 20);

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

  const historyMessages: ChatMessage[] = (chatHistory?.pages ?? [])
    .flatMap((page) => page.data ?? [])
    .reverse();
  // const historyMessages = CHAT_SAMPLE_DATA;

  const allMessages = [...historyMessages, ...liveMessages];

  return (
    <div className='relative flex h-[60dvh] flex-col gap-2'>
      {isConnected && (
        <>
          <ChatMessageList
            userId={userId}
            messages={allMessages}
            fetchPrev={fetchNextPage}
            hasPrev={!!hasNextPage && !isFetchingNextPage}
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
