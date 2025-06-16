'use client';

import GroupCalendar from './GroupCalendar';

interface GroupCalendarWrapperProps {
  groupId: string;
}

const GroupCalendarWrapper = ({ groupId }: GroupCalendarWrapperProps) => {
  return <GroupCalendar groupId={groupId} />;
};

export default GroupCalendarWrapper;
