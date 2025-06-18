'use client';

import { useMemo, useState } from 'react';
import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
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
    <>
      <CalendarBase<GroupSchedule>
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
    </>
  );
};

export default GroupCalendar;
