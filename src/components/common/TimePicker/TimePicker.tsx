'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface TimePickerProps {
  onChange?: (date: Date) => void;
  size?: 'md' | 'sm' | 'lg';
  disabled?: boolean;
  hourStep?: number;
  minuteStep?: number;
  status?: 'error' | 'warn';
}

const TimePicker = ({
  onChange,
  size = 'md',
  disabled = false,
  hourStep = 1,
  minuteStep = 1,
  status,
}: TimePickerProps) => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [isOpen, setIsOpen] = React.useState(false);

  const hours = Array.from({ length: Math.ceil(12 / hourStep) }, (_, i) => {
    const hour = i * hourStep + 1;
    return hour > 12 ? hour - 12 : hour;
  }).filter((hour) => hour <= 12);

  const minutes = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, i) => i * minuteStep
  ).filter((minute) => minute < 60);

  const handleTimeChange = (
    type: 'hour' | 'minute' | 'ampm',
    value: string
  ) => {
    const newDate = new Date(date);

    if (type === 'hour') {
      const hour24 = parseInt(value) === 12 ? 0 : parseInt(value);
      newDate.setHours(hour24 + (newDate.getHours() >= 12 ? 12 : 0));
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value));
    } else if (type === 'ampm') {
      const currentHours = newDate.getHours();
      const hour12 = currentHours % 12;
      newDate.setHours(value === 'PM' ? hour12 + 12 : hour12);
    }
    setDate(newDate);
    if (typeof onChange === 'function') {
      onChange(newDate);
    }
  };

  const buttonClass = 'w-full justify-start text-left font-normal';

  const buttonSizeClass = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const buttonStatusClass = {
    error: 'border-red-600',
    warn: 'border-orange-300',
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant='outline'
          className={cn(
            buttonClass,
            buttonSizeClass[size],
            status && buttonStatusClass[status],
            !date && 'text-muted-foreground'
          )}
        >
          {date ? format(date, 'hh:mm aa') : <span>hh:mm aa</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className='w-auto p-0'>
        <div className='flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0'>
          {/* 시간 */}
          <ScrollArea className='w-64 sm:w-auto'>
            <div className='flex p-2 sm:flex-col'>
              {hours.map((hour) => (
                <Button
                  key={hour}
                  size='icon'
                  variant={
                    date && (date.getHours() % 12 || 12) === hour
                      ? 'default'
                      : 'ghost'
                  }
                  className='aspect-square shrink-0 sm:w-full'
                  onClick={() => handleTimeChange('hour', hour.toString())}
                >
                  {hour}
                </Button>
              ))}
            </div>
            <ScrollBar
              orientation='horizontal'
              className='sm:hidden'
            />
          </ScrollArea>

          {/* 분 */}
          <ScrollArea className='w-64 sm:w-auto'>
            <div className='flex p-2 sm:flex-col'>
              {minutes.map((minute) => (
                <Button
                  key={minute}
                  size='icon'
                  variant={
                    date && date.getMinutes() === minute ? 'default' : 'ghost'
                  }
                  className='aspect-square shrink-0 sm:w-full'
                  onClick={() => handleTimeChange('minute', minute.toString())}
                >
                  {String(minute).padStart(2, '0')}
                </Button>
              ))}
            </div>
            <ScrollBar
              orientation='horizontal'
              className='sm:hidden'
            />
          </ScrollArea>

          {/* am pm */}
          <ScrollArea className=''>
            <div className='flex p-2 sm:flex-col'>
              {['AM', 'PM'].map((ampm) => (
                <Button
                  key={ampm}
                  size='icon'
                  variant={
                    date
                    && ((ampm === 'AM' && date.getHours() < 12)
                      || (ampm === 'PM' && date.getHours() >= 12))
                      ? 'default'
                      : 'ghost'
                  }
                  className='aspect-square shrink-0 sm:w-full'
                  onClick={() => handleTimeChange('ampm', ampm)}
                >
                  {ampm}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TimePicker;
