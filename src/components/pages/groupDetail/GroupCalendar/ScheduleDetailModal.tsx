'use client';

import { format } from 'date-fns';
import Modal from '@/components/common/Modal/Modal';
import ModalContent from '@/components/common/Modal/ModalContent';
import MoreDropdown from '@/components/common/MoreDropdown/MoreDropdown';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import BackIcon from '@/components/icons/BackIcon';
import MapPinIcon from '@/components/icons/MapPinIcon';
import { Schedule } from '@/types/group';

interface ScheduleDetailModalProps {
  schedule: Schedule;
  onClose: () => void;
}

const ScheduleDetailModal = ({
  schedule,
  onClose,
}: ScheduleDetailModalProps) => (
  <Modal
    defaultOpen
    onClose={onClose}
  >
    <ModalContent className='w-[90vw] max-w-md rounded-2xl bg-white p-[30px] shadow-lg'>
      <div className='mb-[20px] flex items-center justify-between'>
        <button
          onClick={onClose}
          aria-label='뒤로가기'
        >
          <BackIcon className='h-6 w-6' />
        </button>
        <MoreDropdown
          items={[
            { label: '수정하기', onClick: () => console.log('수정') },
            { label: '삭제하기', onClick: () => console.log('삭제') },
          ]}
          className='h-6 w-6 text-black'
        />
      </div>
      <div className='mb-[20px] flex flex-col'>
        <h2 className='mb-[20px] text-18_B'>{schedule.description}</h2>
        <div className='grid grid-cols-[5fr_8fr] gap-y-[10px] text-14_M text-gray-500'>
          <span>{format(new Date(schedule.startAt), 'yyyy년 M월 d일')}</span>
          <span className='text-left'>
            {format(new Date(schedule.startAt), 'a h시')}{' '}
            <span className='ml-[13px]'>~</span>
          </span>

          <span>{format(new Date(schedule.endAt), 'yyyy년 M월 d일')}</span>
          <span className='text-left'>
            {format(new Date(schedule.endAt), 'a h시')}
          </span>
        </div>

        <div className='mt-[20px] flex items-center border-t border-gray-100 pt-[20px] text-14_M text-gray-700'>
          <MapPinIcon />
          {schedule.location}
        </div>

        <div className='mt-[10px] flex items-center gap-2'>
          <ProfileImage
            src={schedule.author.profileImage}
            alt={schedule.author.name}
            size='xs'
          />
          <span className='text-14_M text-gray-800'>
            {schedule.author.name}(작성자)
          </span>
        </div>
      </div>
    </ModalContent>
  </Modal>
);

export default ScheduleDetailModal;
