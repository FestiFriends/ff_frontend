import { formatToKSTDate } from '@/utils/date';

interface ChatDateDividerProps {
  date: string;
}

const ChatDateDivider = ({ date }: ChatDateDividerProps) => (
  <div className='flex items-center justify-center px-4 py-1.5'>
    <span className='text-13_M leading-normal tracking-[-0.325px] text-gray-800'>
      {formatToKSTDate(date)}
    </span>
  </div>
);

export default ChatDateDivider;
