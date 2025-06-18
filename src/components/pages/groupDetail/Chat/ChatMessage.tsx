import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { ChatMessage as ChatMessageType } from '@/types/chat';
import { formatToKST } from '@/utils/date';

interface ChatMessageProps {
  message: ChatMessageType;
  isMine: boolean;
}

const ChatMessage = ({ message, isMine }: ChatMessageProps) => {
  if (isMine || message.isMine)
    return (
      <div className='flex items-end justify-end gap-1.5'>
        <span className='text-right text-12_M leading-normal tracking-[-0.3px] text-gray-500'>
          {formatToKST(message.createdAt)}
        </span>
        <div className='rounded-l-[20px] rounded-tr-[2px] rounded-br-[20px] bg-[#ececec] p-3.5'>
          <span className='text-16_M leading-normal tracking-[-0.4px] text-gray-950'>
            {message.chatId}: {message.content}
          </span>
        </div>
      </div>
    );

  return (
    <div className='flex justify-start gap-2'>
      <ProfileImage
        size='sm'
        src={message.senderImage?.src}
        alt={message.senderImage?.alt}
        border={false}
        className='aspect-square shrink-0'
      />
      <div className='flex flex-col gap-2'>
        <span className='text-14_M leading-normal tracking-[-0.35px] text-gray-950'>
          {message.senderName}
        </span>
        <div className='flex items-end gap-1.5'>
          <div className='rounded-tl-[2px] rounded-r-[20px] rounded-bl-[20px] bg-[#ececec] p-3.5'>
            <span className='text-16_M leading-normal tracking-[-0.4px] text-gray-950'>
              {message.chatId}: {message.content}
            </span>
          </div>
          <span className='text-left text-12_M leading-normal tracking-[-0.3px] text-gray-500'>
            {formatToKST(message.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
