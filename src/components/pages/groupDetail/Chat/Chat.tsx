import PostNotice from '../PostNotice/PostNotice';
import ChatArea from './ChatArea';
import ChatInfo from './ChatInfo';

const hasNotice = true;

const Chat = () => (
  <div className='px-4'>
    <div className='flex flex-col rounded-[16px] bg-[#fffcfc] px-4 py-4 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)]'>
      <ChatInfo />
      {hasNotice && <PostNotice />}
      <ChatArea />
    </div>
  </div>
);

export default Chat;
