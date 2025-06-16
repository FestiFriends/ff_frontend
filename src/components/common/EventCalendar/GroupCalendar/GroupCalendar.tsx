'use client';

import { GroupSchedule } from '@/types/group';
import CalendarBase from '../CalendarBase/CalendarBase';
import GroupCell from './GroupCell';

interface GroupCalendarProps {
  month: Date;
  schedules: GroupSchedule[];
  selectedDate?: Date;
  onDateClick?: (
    date: Date,
    schedules: GroupSchedule[],
    openCreator?: boolean
  ) => void;
  onScheduleClick?: (schedule: GroupSchedule) => void;
  onMonthChange?: (month: Date) => void;
}

const GroupCalendar = ({
  month,
  schedules,
  selectedDate,
  onDateClick,
  onScheduleClick,
  onMonthChange,
}: GroupCalendarProps) => (
  <CalendarBase
    month={month}
    events={schedules}
    weekdayLabels={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
    getDate={(s) => new Date(s.startAt)}
    renderCell={(date, items) => (
      <GroupCell
        date={date}
        schedules={items}
        currentMonth={month}
        selectedDate={selectedDate}
        onDateClick={onDateClick}
        onScheduleClick={onScheduleClick}
      />
    )}
    onMonthChange={onMonthChange}
  />
);

export default GroupCalendar;
