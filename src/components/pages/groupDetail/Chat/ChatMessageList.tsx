import { useEffect, useRef } from 'react';
import { isSameDay, parseISO } from 'date-fns';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import ChatDateDivider from './ChatDateDivider';
import ChatMessage from './ChatMessage';

interface ChatMessageListProps {
  userId?: number;
  messages: ChatMessageType[];
  fetchPrev: () => void;
  hasPrev: boolean;
}

const ChatMessageList = ({
  userId,
  messages,
  fetchPrev,
  hasPrev,
}: ChatMessageListProps) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  // const topRef = useRef<HTMLDivElement | null>(null);
  const prevLastMessageIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!messages.length || userId === undefined) return;

    const lastMessage = messages[messages.length - 1];

    if (lastMessage.chatId === prevLastMessageIdRef.current) return;

    prevLastMessageIdRef.current = lastMessage.chatId;

    if (lastMessage.senderId === userId) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, userId]);

  useEffect(() => {
    if (hasPrev) {
      fetchPrev();
    }
  }, [hasPrev, fetchPrev]);

  console.log('messages', messages);

  return (
    <div className='scrollbar-hide flex h-full flex-col gap-5 overflow-y-scroll pt-1 pb-12'>
      {/* <div ref={bottomRef} /> */}
      {messages.map((message: ChatMessageType, index) => {
        const prevMessage = messages[index - 1];
        const showDateDivider =
          !prevMessage
          || !isSameDay(
            parseISO(message.createdAt),
            parseISO(prevMessage.createdAt)
          );

        return (
          <div key={message.chatId}>
            {showDateDivider && <ChatDateDivider date={message.createdAt} />}
            <ChatMessage
              message={message}
              isMine={message.senderId === userId}
            />
          </div>
        );
      })}
      <div ref={bottomRef} />
      {/* {hasPrev && <div ref={topRef} />} */}
    </div>
  );
};

export default ChatMessageList;
