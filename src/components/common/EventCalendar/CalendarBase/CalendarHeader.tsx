import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarHeaderProps {
  currentMonth: Date;
  onPrev: () => void;
  onNext: () => void;
}

const CalendarHeader = ({
  currentMonth,
  onPrev,
  onNext,
}: CalendarHeaderProps) => (
  <div className='mb-2 flex items-center justify-center'>
    <button
      onClick={onPrev}
      aria-label='이전 달'
    >
      <ChevronLeft size={20} />
    </button>
    <div className='min-w-[120px] text-center font-semibold'>
      {format(currentMonth, 'yyyy년 M월')}
    </div>
    <button
      onClick={onNext}
      aria-label='다음 달'
    >
      <ChevronRight size={20} />
    </button>
  </div>
);

export default CalendarHeader;
