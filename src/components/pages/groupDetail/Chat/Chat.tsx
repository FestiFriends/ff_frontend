import ChatArea from './ChatArea';
import ChatInfo from './ChatInfo';
import ChatNotice from './ChatNotice';

const Chat = () => (
  <div>
    <div className='flex flex-col gap-5 px-4 pb-4'>
      <div>
        <ChatInfo />
        <ChatNotice />
      </div>
      <ChatArea />
    </div>
  </div>
);

export default Chat;
