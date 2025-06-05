import Filter from '@/components/common/Filter/Filter';
import { MultiLevelData } from '@/hooks/useMultiLevelFilter/useMultiLevelFilter';

interface CalendarFilterProps {
  data: MultiLevelData[];
  onChange?: (values: string[]) => void;
}

const CalendarFilter = ({ data, onChange }: CalendarFilterProps) => (
  <Filter
    data={data}
    levelPlaceholders={['지역 선택']}
    onChange={onChange}
  />
);

export default CalendarFilter;
