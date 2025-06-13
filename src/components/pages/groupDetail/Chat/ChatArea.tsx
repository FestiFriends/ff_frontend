'use client';

import { useChatWebSocket } from '@/hooks/chatHooks/chatHooks';
import { useGetUserId } from '@/hooks/userHooks/userHooks';
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
    <div className='flex flex-col gap-7.5'>
      <ChatMessageList
        userId={userId?.data?.userId}
        messages={messages}
      />
      <ChatMessageInput sendMessage={sendMessage} />
    </div>
  );
};
export default ChatArea;
