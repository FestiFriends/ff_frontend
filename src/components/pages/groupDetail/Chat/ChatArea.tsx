'use client';

import { useChatWebSocket } from '@/hooks/chatHooks/chatHooks';
import { useGetUserId } from '@/hooks/userHooks/userHooks';
// import { CHAT_SAMPLE_DATA } from '@/mocks/handlers/chatHandlers';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageList from './ChatMessageList';

const chatRoomId = '1';

const ChatArea = () => {
  const { data: userId, isPending } = useGetUserId();
  const { messages, sendMessage } = useChatWebSocket(
    userId?.data?.userId || '',
    chatRoomId
  );

  if (isPending) return <div>loading...</div>;
  if (!isPending && !userId) return <div>접근 권한이 없습니다.</div>;

  return (
    <div className='relative flex h-[60dvh] flex-col gap-2'>
      <ChatMessageList
        userId={userId?.data?.userId}
        messages={messages}
        // messages={CHAT_SAMPLE_DATA}
      />
      <ChatMessageInput sendMessage={sendMessage} />
    </div>
  );
};
export default ChatArea;
