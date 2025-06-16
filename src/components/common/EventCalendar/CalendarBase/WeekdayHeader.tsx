interface WeekdayHeaderProps {
  labels?: string[];
}

const DEFAULT_LABELS_KR = ['일', '월', '화', '수', '목', '금', '토'];

const WeekdayHeader = ({ labels = DEFAULT_LABELS_KR }: WeekdayHeaderProps) => (
  <div className='mb-1 grid grid-cols-7 border-b border-gray-200 text-center text-sm font-medium text-gray-600'>
    {labels.map((day, idx) => (
      <div key={`${day}-${idx}`}>{day}</div>
    ))}
  </div>
);

export default WeekdayHeader;
