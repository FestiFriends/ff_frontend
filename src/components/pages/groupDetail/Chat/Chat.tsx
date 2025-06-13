import ChatArea from './ChatArea';
import ChatInfo from './ChatInfo';
import ChatNotice from './ChatNotice';

const Chat = () => (
  <div className='px-4'>
    <div className='flex flex-col rounded-[16px] bg-[#fffcfc] px-4 py-4 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.16)]'>
      <ChatInfo />
      <ChatNotice />
      <ChatArea />
      {/* <div>
        <ChatInfo />
        <ChatNotice />
      </div>
      <div className='mt-9'>
        <ChatArea />
      </div> */}
    </div>
  </div>
);

export default Chat;
