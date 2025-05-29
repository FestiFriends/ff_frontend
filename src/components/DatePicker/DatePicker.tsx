import { ChangeEvent } from 'react';
import { format } from 'date-fns';
import { Dropdown, DropdownContent, DropdownTrigger } from '../Dropdown';

interface DatePickerProps {
  date: string;
  setDate: (value: string) => void;
}

const DatePicker = ({ date, setDate }: DatePickerProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDate(format(value, 'yyyy-MM-dd'));
  };

  return (
    <Dropdown>
      <DropdownTrigger placeholder='날짜 선택' />
      <DropdownContent>
        <input
          type='date'
          value={date}
          onChange={handleChange}
        />
      </DropdownContent>
    </Dropdown>
  );
};

export default DatePicker;
