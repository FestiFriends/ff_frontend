import { ChatMessageResponse } from '@/types/chat';
import ChatMessage from './ChatMessage';

interface ChatMessageListProps {
  userId?: string;
  messages: ChatMessageResponse[];
}

const ChatMessageList = ({ userId, messages }: ChatMessageListProps) => (
  <div className='flex h-[50dvh] flex-col gap-7.5 overflow-y-scroll'>
    {messages.map(
      ({ chatId, senderName, content, senderId }: ChatMessageResponse) => (
        <ChatMessage
          key={chatId}
          senderName={senderName}
          content={content}
          isMine={senderId.toString() === userId}
        />
      )
    )}
  </div>
);

export default ChatMessageList;
