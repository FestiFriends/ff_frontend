'use client';

import Dropdown from '@/components/common/Dropdown/Dropdown';
import DropdownContent from '@/components/common/Dropdown/DropdownContent';
import DropdownItem from '@/components/common/Dropdown/DropdownItem';
import DropdownTrigger from '@/components/common/Dropdown/DropdownTrigger';
import AltArrowDownIcon from '@/components/icons/AltArrowDownIcon';
import { EVENT_COLOR_STYLE_MAP } from '@/constants/eventColors';
import { EventColorName } from '@/types/enums';

interface EventColorDropdownProps {
  value: EventColorName;
  onChange: (value: EventColorName) => void;
  placeholder?: string;
}

const EventColorDropdown = ({
  value,
  onChange,
  placeholder = '색상 선택',
}: EventColorDropdownProps) => (
  <Dropdown>
    <DropdownTrigger
      isStatic
      className='h-[24px] w-[34px] px-[20px] py-[16px] text-left text-14_M hover:bg-transparent focus:bg-transparent focus:outline-none'
    >
      <div className='flex items-center'>
        <span
          className={`inline-block h-[20px] w-[20px] rounded-full ${EVENT_COLOR_STYLE_MAP[value].label}`}
        />
        <AltArrowDownIcon className='h-4 w-4 text-gray-500' />
      </div>
    </DropdownTrigger>

    <DropdownContent className='absolute left-[4px] mt-1 min-w-[40px] rounded-[12px] border border-gray-100 bg-white p-2'>
      {Object.entries(EVENT_COLOR_STYLE_MAP).map(([name, style]) => (
        <DropdownItem
          key={name}
          label={name}
          onClick={() => onChange(name as EventColorName)}
          className='flex items-center justify-center p-2'
        >
          <span
            className={`inline-block h-[20px] w-[20px] rounded-full ${style.label}`}
            title={name}
          />
        </DropdownItem>
      ))}
    </DropdownContent>
  </Dropdown>
);

export default EventColorDropdown;
