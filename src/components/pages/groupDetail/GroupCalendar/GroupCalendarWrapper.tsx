'use client';

import GroupCalendar from '@/components/pages/groupDetail/GroupCalendar/GroupCalendar';

interface GroupCalendarWrapperProps {
  groupId: string;
}

const GroupCalendarWrapper = ({ groupId }: GroupCalendarWrapperProps) => (
  <GroupCalendar groupId={groupId} />
);

export default GroupCalendarWrapper;
