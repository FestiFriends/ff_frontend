import { ChatMessage as ChatMessageType } from '@/types/chat';
import ChatMessage from './ChatMessage';

interface ChatMessageListProps {
  userId?: string;
  messages: ChatMessageType[];
}

const ChatMessageList = ({ userId, messages }: ChatMessageListProps) => (
  <div className='scrollbar-hide flex h-full flex-col gap-7.5 overflow-y-scroll pt-15 pb-17.5'>
    {messages.map(
      ({ chatId, senderName, content, senderId }: ChatMessageType) => (
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
