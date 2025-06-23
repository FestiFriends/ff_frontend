'use client';

import CalendarLocationSelector from './CalendarLocationSelector';
import CalendarVisitTypeDropdown from './CalendarVisitSelector';

const CalendarFilter = () => (
  <div className='flex flex-wrap gap-2'>
    <CalendarVisitTypeDropdown />
    <CalendarLocationSelector />
  </div>
);

export default CalendarFilter;
