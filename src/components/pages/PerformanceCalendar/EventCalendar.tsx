import { eachDayOfInterval } from 'date-fns';
import CalendarBase from '@/components/common/EventCalendar/CalendarBase/CalendarBase';
import PerformanceCell from '@/components/pages/PerformanceCalendar/PerformanceCell';
import { Performance } from '@/types/performance';

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
    getDate={(p) => {
      const d = new Date(p.startDate);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }}
    getDates={(p) => {
      const start = new Date(p.startDate);
      const end = new Date(p.endDate);
      return eachDayOfInterval({
        start: new Date(start.getFullYear(), start.getMonth(), start.getDate()),
        end: new Date(end.getFullYear(), end.getMonth(), end.getDate()),
      });
    }}
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
