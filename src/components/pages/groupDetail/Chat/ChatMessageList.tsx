import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const prevLastMessageIdRef = useRef<number | null>(null);
  const prevHeightRef = useRef<number>(0);
  const prevScrollTopRef = useRef<number>(0);

  const [initialScrolled, setInitialScrolled] = useState(false);

  // 채팅방 최초 입장 시 맨 아래로 스크롤
  useEffect(() => {
    if (
      !messages.length
      || userId === undefined
      || initialScrolled
      || !bottomRef.current
    )
      return;

    bottomRef.current?.scrollIntoView({ behavior: 'auto' });
    setInitialScrolled(true);
  }, [messages, userId, initialScrolled]);

  // 내가 채팅 보냈을 때 맨 아래로 스크롤
  useEffect(() => {
    if (!messages.length || userId === undefined) return;

    const lastMessage = messages[messages.length - 1];
    const prevLastId = prevLastMessageIdRef.current;

    if (lastMessage.chatId !== prevLastId && lastMessage.senderId === userId) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      prevLastMessageIdRef.current = lastMessage.chatId;
    }
  }, [messages, userId]);

  // 이전 메세지 요청 전 스크롤 상태 저장
  const handleFetchPrev = useCallback(async () => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    prevHeightRef.current = container.scrollHeight;
    prevScrollTopRef.current = container.scrollTop;

    await fetchPrev();
  }, [fetchPrev]);

  // fetch 후 스크롤 위치 복구
  useLayoutEffect(() => {
    if (!containerRef.current || !prevHeightRef.current) return;

    const container = containerRef.current;
    const newHeight = container.scrollHeight;
    const scrollDiff = newHeight - prevHeightRef.current;

    container.scrollTop = prevScrollTopRef.current + scrollDiff;

    prevHeightRef.current = 0;
    prevScrollTopRef.current = 0;
  }, [messages]);

  // IntersectionObserver로 현재 메세지 top에 도달하면 이전 메시지 요청
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          handleFetchPrev();
        }
      },
      { threshold: 1.0 }
    );

    if (topRef.current) {
      observer.observe(topRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasPrev, handleFetchPrev]);

  return (
    <div
      ref={containerRef}
      className='scrollbar-hide flex h-full flex-col gap-5 overflow-y-scroll pt-1 pb-12'
    >
      <div ref={topRef} />
      {messages.map((message: ChatMessageType, index) => {
        const prevMessage = messages[index - 1];
        const showDateDivider =
          !prevMessage
          || !isSameDay(
            parseISO(message.createdAt),
            parseISO(prevMessage.createdAt)
          );

        return (
          <div
            key={message.chatId}
            className='flex flex-col gap-5'
          >
            {showDateDivider && <ChatDateDivider date={message.createdAt} />}
            <ChatMessage
              message={message}
              isMine={message.senderId === userId}
            />
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessageList;
