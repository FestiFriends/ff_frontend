import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { formatToKST } from '@/utils/date';

interface ChatDateDividerProps {
  date: string;
}

const ChatDateDivider = ({ date }: ChatDateDividerProps) => (
  <div className='flex items-center justify-center px-4 py-1.5'>
    <span className='text-13_M leading-normal tracking-[-0.325px] text-gray-800'>
      {format(formatToKST(date), 'yy년 MM월 dd일 (eee)', {
        locale: ko,
      })}
    </span>
  </div>
);

export default ChatDateDivider;
