import { ChatMessage as ChatMessageType } from '@/types/chat';
import ChatMessage from './ChatMessage';

interface ChatMessageListProps {
  messages: ChatMessageType[];
}

const ChatMessageList = ({ messages }: ChatMessageListProps) => (
  <div className='flex h-[60dvh] flex-col gap-7.5 overflow-y-scroll'>
    {messages.map(
      ({ chatId, senderId, senderName, content }: ChatMessageType) => (
        <ChatMessage
          key={chatId}
          senderName={senderName}
          content={content}
          isMine={senderId === 'u2'}
        />
      )
    )}
  </div>
);

export default ChatMessageList;
