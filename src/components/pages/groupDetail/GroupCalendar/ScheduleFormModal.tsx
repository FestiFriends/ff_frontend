'use client';

import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { XIcon } from 'lucide-react';
import Calendar from '@/components/common/Calendar/Calendar';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import TimePicker from '@/components/common/TimePicker/TimePicker';
import AllDayToggle from '@/components/pages/groupDetail/GroupCalendar/AllDayToggle';
import ScheduleLocationInput from '@/components/pages/groupDetail/GroupCalendar/ScheduleLocationInput';
import ScheduleTitleInput from '@/components/pages/groupDetail/GroupCalendar/ScheduleTitleInput';
import TimeInput from '@/components/pages/groupDetail/GroupCalendar/TimeInput';
import { cn } from '@/lib/utils';
import { groupsApi } from '@/services/groupsService';
import { EventColorName } from '@/types/enums';
import { GroupSchedule, ScheduleRequest } from '@/types/group';
import { formatScheduleDate } from '@/utils/date';

//TODO: 모달위로 달력 구현해야함, timepicker로 교체해야 함

interface ScheduleFormModalProps {
  groupId: string;
  defaultDate: Date;
  onClose: () => void;
  initialData?: GroupSchedule;
  isEdit?: boolean;
}

const ScheduleFormModal = ({
  groupId,
  defaultDate,
  onClose,
  initialData,
  isEdit,
}: ScheduleFormModalProps) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState<Date>(defaultDate);
  const [endDate, setEndDate] = useState<Date | null>(defaultDate);
  const [activeDateField, setActiveDateField] = useState<
    'start' | 'end' | null
  >(null);
  const [, setIsSelecting] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  const [startTime, setStartTime] = useState<Date>(defaultDate);
  const [endTime, setEndTime] = useState<Date>(defaultDate);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [startTimeInput, setStartTimeInput] = useState(
    format(startTime, 'aa hh:mm', { locale: ko })
  );
  const [endTimeInput, setEndTimeInput] = useState(
    format(endTime, 'aa hh:mm', { locale: ko })
  );

  const [eventColor, setEventColor] = useState<EventColorName>('red');
  const [isAllDay, setIsAllDay] = useState(false);
  const [location, setLocation] = useState<string>();

  const queryClient = useQueryClient();

  const handleDateClick = (clickedDate: Date) => {
    if (activeDateField === 'start') {
      if (endDate && clickedDate < startDate) {
        setStartDate(clickedDate);
        setShowCalendar(false);
        setActiveDateField(null);
      } else {
        setStartDate(clickedDate);
        setEndDate(null);
        setActiveDateField('end');
        setIsSelecting(true);
      }
      return;
    }

    if (activeDateField === 'end') {
      if (clickedDate < startDate) {
        setStartDate(clickedDate);
        setEndDate(null);
        setActiveDateField('end');
      } else {
        setEndDate(clickedDate);
        setShowCalendar(false);
        setActiveDateField(null);
      }
      return;
    }
  };

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.description);
      setStartDate(new Date(initialData.startAt));
      setEndDate(new Date(initialData.endAt));
      setStartTime(new Date(initialData.startAt));
      setEndTime(new Date(initialData.endAt));
      setStartTimeInput(
        format(new Date(initialData.startAt), 'aa hh:mm', { locale: ko })
      );
      setEndTimeInput(
        format(new Date(initialData.endAt), 'aa hh:mm', { locale: ko })
      );
      setLocation(initialData.location || '');
      setEventColor(initialData.eventColor ?? 'red');
    }
  }, [initialData]);

  useEffect(() => {
    if (isAllDay) {
      const newStart = new Date(startDate.setHours(0, 0));
      const newEnd = new Date(startDate.setHours(23, 59));
      setStartTime(newStart);
      setEndTime(newEnd);

      setStartTimeInput(format(newStart, 'aa hh:mm', { locale: ko }));
      setEndTimeInput(format(newEnd, 'aa hh:mm', { locale: ko }));

      setEndDate(new Date(startDate));
    }
  }, [isAllDay, startDate]);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ScheduleRequest) =>
      isEdit && initialData
        ? groupsApi.updateSchedule(groupId, initialData.id, data)
        : groupsApi.postSchedule(groupId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['schedules', groupId],
      });
      onClose();
    },
    onError: (error) => {
      console.error(isEdit ? '수정 실패' : '등록 실패', error);
      alert(`일정 ${isEdit ? '수정' : '등록'}에 실패했습니다.`);
    },
  });

  const onSubmit = async () => {
    if (!title.trim()) {
      alert('일정 제목을 입력해주세요.');
      return false;
    }

    try {
      const scheduleRequest: ScheduleRequest = {
        description: title,
        startAt: formatScheduleDate(startDate, startTime),
        endAt: formatScheduleDate(endDate || startDate, endTime),
        location: location ?? '',
        eventColor: eventColor,
      };

      await mutateAsync(scheduleRequest);
      return true;
    } catch (err) {
      console.error('일정 등록 실패', err);
      return false;
    }
  };

  return (
    <Modal
      defaultOpen
      onClose={onClose}
    >
      <ModalContent className='w-[90vw] max-w-md rounded-[20px] bg-white p-[30px] shadow-lg'>
        <div className='mb-[20px] flex items-center justify-between'>
          <button
            onClick={onClose}
            aria-label='모달 닫기'
          >
            <XIcon className='h-[24px] w-[24px]' />
          </button>
          <h2 className='text-16_B font-bold text-gray-900'>
            {isEdit ? '수정' : '등록'}
          </h2>
        </div>

        <section>
          <ScheduleTitleInput
            value={title}
            onChange={setTitle}
            color={eventColor}
            onColorChange={setEventColor}
          />
          <div className='flex flex-col gap-[10px]'>
            <div className='flex items-center gap-[12px]'>
              <input
                type='text'
                readOnly
                value={format(startDate, 'yyyy.MM.dd (E)', { locale: ko })}
                placeholder='시작일'
                onClick={() => {
                  if (!isAllDay) {
                    setActiveDateField('start');
                    setShowCalendar(true);
                  }
                }}
                className={cn(
                  'h-[54px] w-full rounded-[16px] border border-gray-100 px-[20px] py-[16px] text-14_M text-gray-950 placeholder:text-gray-500',
                  isAllDay
                    && 'pointer-events-none cursor-not-allowed bg-gray-50 text-gray-400'
                )}
              />
              <TimeInput
                value={startTimeInput}
                onInputChange={setStartTimeInput}
                onChange={setStartTime}
                readOnly={isAllDay}
              />
            </div>
            <div className='flex items-center gap-[12px]'>
              <input
                type='text'
                placeholder='종료일'
                value={
                  endDate
                    ? format(endDate, 'yyyy.MM.dd (E)', { locale: ko })
                    : ''
                }
                className={cn(
                  'h-[54px] w-full flex-1 rounded-[16px] border border-gray-100 px-[20px] py-[16px] text-14_M text-gray-950 placeholder:text-gray-500',
                  isAllDay
                    && 'pointer-events-none cursor-not-allowed bg-gray-50 text-gray-400'
                )}
                onClick={() => {
                  if (!isAllDay) {
                    setActiveDateField('end');
                    setShowCalendar(true);
                  }
                }}
                readOnly
              />
              <TimeInput
                value={endTimeInput}
                onInputChange={setEndTimeInput}
                onChange={setEndTime}
                readOnly={isAllDay}
              />
            </div>
          </div>
          {showCalendar && (
            <div id='portal'>
              <button
                onClick={() => setShowCalendar(false)}
                aria-label='달력 닫기'
              >
                <XIcon className='h-[24px] w-[24px]' />
              </button>
              <Calendar
                isControllable
                month={new Date('2025-06-01')}
                startDate={startDate}
                endDate={endDate}
                onDateClick={handleDateClick}
              />
            </div>
          )}
          {showStartTimePicker && (
            <TimePicker
              onChange={(date) => {
                setStartTime(date);
                setShowStartTimePicker(false);
              }}
            />
          )}

          {showEndTimePicker && (
            <TimePicker
              onChange={(date) => {
                setEndTime(date);
                setShowEndTimePicker(false);
              }}
            />
          )}
          <AllDayToggle
            value={isAllDay}
            onChange={setIsAllDay}
          />
          <ScheduleLocationInput
            value={location}
            onChange={setLocation}
          />
        </section>
        <div className='mt-[30px] flex justify-between gap-[10px]'>
          <ModalCancel className='w-full rounded-[12px] border border-primary-red px-4 py-2 text-14_M text-primary-red'>
            취소
          </ModalCancel>
          <ModalAction
            onClick={onSubmit}
            disabled={isPending}
            className='w-full rounded-[12px] bg-primary-red px-4 py-2 text-14_M text-white'
          >
            {isPending
              ? isEdit
                ? '수정 중...'
                : '등록 중...'
              : isEdit
                ? '수정'
                : '등록'}
          </ModalAction>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleFormModal;
