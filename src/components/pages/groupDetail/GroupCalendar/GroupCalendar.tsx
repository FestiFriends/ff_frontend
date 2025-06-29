'use client';

import { useMemo, useState } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import CalendarBase from '@/components/common/EventCalendar/CalendarBase/CalendarBase';
import GroupCalendarCell from '@/components/pages/groupDetail/GroupCalendar/GroupCalendarCell';
import ScheduleDetailModal from '@/components/pages/groupDetail/GroupCalendar/ScheduleDetailModal';
import ScheduleFormModal from '@/components/pages/groupDetail/GroupCalendar/ScheduleFormModal';
import { useSchedules } from '@/hooks/useSchedules/useSchedules';
import { GroupSchedule } from '@/types/group';

interface GroupCalendarProps {
  groupId: string;
}

const GroupCalendar = ({ groupId }: GroupCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedSchedule, setSelectedSchedule] =
    useState<GroupSchedule | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { start, end } = useMemo(() => {
    const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 0 });
    const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 0 });
    return { start, end };
  }, [currentMonth]);

  const { data: schedules = [] } = useSchedules(groupId, start, end);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsCreating(true);
  };

  return (
    <div className='pt-7.5 pb-6'>
      <CalendarBase<GroupSchedule>
        month={currentMonth}
        events={schedules}
        getDate={(s) => new Date(s.startAt)}
        getDates={(s) => {
          const start = new Date(s.startAt);
          const end = new Date(s.endAt ?? s.startAt);
          const days = eachDayOfInterval({
            start: new Date(
              start.getFullYear(),
              start.getMonth(),
              start.getDate()
            ),
            end: new Date(end.getFullYear(), end.getMonth(), end.getDate()),
          });
          return days;
        }}
        renderCell={(date, events) => (
          <GroupCalendarCell
            date={date}
            schedules={events}
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            onDateClick={handleDateClick}
            onScheduleClick={(s) => setSelectedSchedule(s)}
          />
        )}
        onMonthChange={setCurrentMonth}
      />
      {selectedSchedule && (
        <ScheduleDetailModal
          groupId={groupId}
          schedule={selectedSchedule}
          onClose={() => setSelectedSchedule(null)}
        />
      )}
      {isCreating && selectedDate && (
        <ScheduleFormModal
          key={selectedDate?.toISOString()}
          groupId={groupId}
          defaultDate={selectedDate}
          onClose={() => {
            setIsCreating(false);
            setSelectedDate(null);
          }}
        />
      )}
    </div>
  );
};

export default GroupCalendar;
