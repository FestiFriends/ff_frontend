'use client';

import {
  deduplicateMessages,
  useChatWebSocket,
  useGetChatHistory,
} from '@/hooks/chatHooks/chatHooks';
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
    isPending,
    isError,
    isFetchingNextPage,
  } = useGetChatHistory(chatRoomId, 20);

  if (!isConnected) {
    return (
      <div className='relative flex h-[60dvh] flex-col items-center justify-center gap-2'>
        <p className='font-semibold text-gray-500'>{statusMessage}</p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className='relative flex h-[60dvh] flex-col items-center justify-center gap-2'>
        <p className='font-semibold text-gray-500'>메세지 불러오는 중...</p>
        <ChatMessageInput
          disabled={true}
          sendMessage={() => {}}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <div className='relative flex h-[60dvh] flex-col items-center justify-center gap-2'>
        <p className='font-semibold text-gray-500'>
          예상치 못한 오류가 발생하였습니다.
        </p>
      </div>
    );
  }

  const historyMessages: ChatMessage[] = (chatHistory?.pages ?? [])
    .flatMap((page) => page.data ?? [])
    .reverse();

  const allMessages = deduplicateMessages([
    ...historyMessages,
    ...liveMessages,
  ]);

  return (
    <div className='relative flex h-[60dvh] flex-col gap-2'>
      {isConnected && (
        <>
          <ChatMessageList
            userId={userId}
            messages={allMessages}
            fetchPrev={fetchNextPage}
            hasPrev={!!hasNextPage && !isFetchingNextPage}
            isFetchingNextPage={isFetchingNextPage}
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
