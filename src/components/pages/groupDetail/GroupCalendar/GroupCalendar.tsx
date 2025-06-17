'use client';

import { useMemo, useState } from 'react';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import CalendarBase from '@/components/common/EventCalendar/CalendarBase/CalendarBase';
import { useSchedules } from '@/hooks/useSchedules/useSchedules';
import { Schedule } from '@/types/group';
import GroupCalendarCell from './GroupCalendarCell';
import ScheduleDetailModal from './ScheduleDetailModal';

interface GroupCalendarProps {
  groupId: string;
}

const GroupCalendar = ({ groupId }: GroupCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(
    null
  );

  const { start, end } = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    return { start, end };
  }, [currentMonth]);

  const { data: schedules = [] } = useSchedules(groupId, start, end);

  return (
    <>
      <CalendarBase<Schedule>
        month={currentMonth}
        events={schedules}
        weekdayLabels={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
        getDate={(s) => new Date(s.startAt)}
        renderCell={(date, events) => (
          <GroupCalendarCell
            date={date}
            schedules={events}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={(d) => setSelectedDate(d)}
            onScheduleClick={(s) => setSelectedSchedule(s)}
          />
        )}
        onMonthChange={setCurrentMonth}
      />
      {selectedSchedule && (
        <ScheduleDetailModal
          schedule={selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
        />
      )}
    </>
  );
};

export default GroupCalendar;
