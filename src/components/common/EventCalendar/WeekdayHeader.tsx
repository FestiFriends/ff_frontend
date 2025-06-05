const WEEKDAYS_KR = ['일', '월', '화', '수', '목', '금', '토'];

const WeekdayHeader = () => (
  <div className='mb-1 grid grid-cols-7 border-b border-gray-200 text-center text-sm font-medium text-gray-600'>
    {WEEKDAYS_KR.map((day) => (
      <div key={day}>{day}</div>
    ))}
  </div>
);

export default WeekdayHeader;
