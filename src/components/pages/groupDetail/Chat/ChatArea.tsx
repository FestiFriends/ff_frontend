import { CHAT_SAMPLE_DATA } from '@/mocks/handlers/chatHandlers';
import ChatMessageInput from './ChatMessageInput';
import ChatMessageList from './ChatMessageList';

const ChatArea = () => (
  <div className='flex flex-col gap-7.5'>
    <ChatMessageList messages={CHAT_SAMPLE_DATA} />
    <ChatMessageInput />
  </div>
);

export default ChatArea;
