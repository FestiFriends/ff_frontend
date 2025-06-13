import ProfileIcon from '@/components/icons/ProfileIcon';

interface ChatMessageProps {
  senderName: string;
  content: string;
  isMine: boolean;
}

const ChatMessage = ({ senderName, content, isMine }: ChatMessageProps) => {
  if (isMine)
    return (
      <div className='flex justify-end gap-3.5'>
        <div className='rounded-l-[20px] rounded-tr-[2px] rounded-br-[20px] bg-[#ececec] p-3.5'>
          <span className='text-16_M leading-normal tracking-[-0.4px] text-gray-950'>
            {content}
          </span>
        </div>
      </div>
    );

  return (
    <div className='flex justify-start gap-3.5'>
      <ProfileIcon className='aspect-square h-10 w-10 shrink-0' />
      <div className='flex flex-col gap-2'>
        <span className='text-14_M leading-normal tracking-[-0.35px] text-gray-950'>
          {senderName}
        </span>
        <div className='rounded-tl-[2px] rounded-r-[20px] rounded-bl-[20px] bg-[#ececec] p-3.5'>
          <span className='text-16_M leading-normal tracking-[-0.4px] text-gray-950'>
            {content}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
