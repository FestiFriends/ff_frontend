'use client';
import { useState } from 'react';
import EventCalendar from '@/components/common/EventCalendar/EventCalendar';

const mockPerformances = [
  {
    id: '1',
    title: '뮤지컬 라이온킹',
    startDate: '2025-06-11',
    endDate: '2025-06-11',
    location: '서울 예술의전당',
    cast: ['배우 A'],
    price: ['50000원'],
    state: '공연중',
    visit: '내한',
    time: ['19:00'],
    groupCount: 3,
    favoriteCount: 123,
    isLiked: false,
  },
];

const CalendarPage = () => {
  const [month] = useState(new Date('2025-06-01'));

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-lg font-bold'>📅 Event Calendar 테스트</h1>
      <EventCalendar
        month={month}
        performances={mockPerformances}
        onDateClick={(date, events) => {
          console.log('날짜 클릭:', date, events);
        }}
        onPerformanceClick={(perf) => {
          console.log('공연 클릭:', perf.title);
        }}
      />
    </div>
  );
};
export default CalendarPage;
