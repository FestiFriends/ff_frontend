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
}

const EventColorDropdown = ({ value, onChange }: EventColorDropdownProps) => (
  <Dropdown>
    <DropdownTrigger
      isStatic
      className='h-[54px] w-[34px] p-0 text-14_M hover:bg-transparent focus:bg-transparent focus:outline-none'
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
