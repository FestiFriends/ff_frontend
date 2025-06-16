import { ChatMessage as ChatMessageType } from '@/types/chat';
import ChatMessage from './ChatMessage';

interface ChatMessageListProps {
  userId?: number;
  messages: ChatMessageType[];
}

const ChatMessageList = ({ userId, messages }: ChatMessageListProps) => (
  <div className='scrollbar-hide flex h-full flex-col gap-5 overflow-y-scroll pt-5 pb-17.5'>
    {messages.map((message: ChatMessageType) => (
      <ChatMessage
        key={message.chatId}
        message={message}
        isMine={message.senderId === userId}
      />
    ))}
  </div>
);

export default ChatMessageList;
