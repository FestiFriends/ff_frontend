import { format } from 'date-fns';
import { Performance } from '@/types/performance';
import { CalendarCell } from './';

interface CalendarGridProps {
  days: Date[];
  currentMonth: Date;
  eventsByDate: Record<string, Performance[]>;
  selectedDate?: Date;
  onDateClick?: (date: Date, performances: Performance[]) => void;
  onPerformanceClick?: (performance: Performance) => void;
}

const CalendarGrid = ({
  days,
  currentMonth,
  eventsByDate,
  selectedDate,
  onDateClick,
  onPerformanceClick,
}: CalendarGridProps) => (
  <div className='grid grid-cols-7'>
    {days.map((day) => {
      const key = format(day, 'yyyy-MM-dd');
      const events = eventsByDate[key] ?? [];

      return (
        <CalendarCell
          key={key}
          date={day}
          events={events}
          currentMonth={currentMonth}
          onDateClick={onDateClick}
          onPerformanceClick={onPerformanceClick}
          selectedDate={selectedDate}
        />
      );
    })}
  </div>
);

export default CalendarGrid;
