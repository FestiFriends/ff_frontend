import CalendarBase from '@/components/common/EventCalendar/CalendarBase/CalendarBase';
import { Performance } from '@/types/performance';
import PerformanceCell from './PerformanceCell';

interface EventCalendarProps {
  month: Date;
  performances: Performance[];
  selectedDate?: Date;
  onPerformanceClick?: (performance: Performance) => void;
  onDateClick?: (
    date: Date,
    performances: Performance[],
    openMore?: boolean
  ) => void;
  onMonthChange?: (month: Date) => void;
}

const EventCalendar = ({
  month,
  performances,
  selectedDate,
  onPerformanceClick,
  onDateClick,
  onMonthChange,
}: EventCalendarProps) => (
  <CalendarBase
    month={month}
    events={performances}
    getDate={(p) => new Date(p.startDate)}
    renderCell={(date, events) => (
      <PerformanceCell
        date={date}
        performances={events}
        currentMonth={month}
        selectedDate={selectedDate}
        onPerformanceClick={onPerformanceClick}
        onDateClick={onDateClick}
      />
    )}
    onMonthChange={onMonthChange}
  />
);

export default EventCalendar;
