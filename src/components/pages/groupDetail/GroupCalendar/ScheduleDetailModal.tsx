'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { LoadingOverlay } from '@/components/common';
import Modal from '@/components/common/Modal/Modal';
import ModalContent from '@/components/common/Modal/ModalContent';
import MoreDropdown from '@/components/common/MoreDropdown/MoreDropdown';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import BackIcon from '@/components/icons/BackIcon';
import MapPinIcon from '@/components/icons/MapPinIcon';
import ScheduleFormModal from '@/components/pages/groupDetail/GroupCalendar/ScheduleFormModal';
import { groupsApi } from '@/services/groupsService';
import { GroupSchedule } from '@/types/group';

interface ScheduleDetailModalProps {
  groupId: string;
  schedule: GroupSchedule;
  onClose: () => void;
}

const ScheduleDetailModal = ({
  groupId,
  schedule,
  onClose,
}: ScheduleDetailModalProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const queryClient = useQueryClient();

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const { mutate: deleteSchedule, isPending: isDeleting } = useMutation({
    mutationFn: () => groupsApi.deleteSchedule(groupId, schedule.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules', groupId] });
      onClose();
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert('일정 삭제에 실패했습니다.');
    },
  });

  return (
    <>
      <Modal
        defaultOpen
        onClose={onClose}
      >
        <ModalContent className='relative w-[90vw] max-w-md rounded-[20px] bg-white p-[30px] shadow-lg'>
          {isDeleting && <LoadingOverlay />}
          <div className='mb-[20px] flex items-center justify-between'>
            <button
              onClick={onClose}
              aria-label='뒤로가기'
            >
              <BackIcon className='h-6 w-6' />
            </button>
            <MoreDropdown
              items={[
                { label: '수정하기', onClick: handleEditClick },
                {
                  label: '삭제하기',
                  onClick: () => {
                    if (confirm('정말 삭제하시겠습니까?')) {
                      deleteSchedule();
                    }
                  },
                },
              ]}
              className='h-6 w-6 text-black'
            />
          </div>
          <div className='mb-[20px] flex flex-col'>
            <h2 className='mb-[20px] text-18_B'>{schedule.description}</h2>
            <div className='grid grid-cols-[5fr_8fr] gap-y-[10px] text-14_M text-gray-500'>
              <span>
                {format(new Date(schedule.startAt), 'yyyy년 M월 d일')}
              </span>
              <span className='text-left'>
                {format(new Date(schedule.startAt), 'a h시 mm분')}{' '}
                <span className='ml-[13px]'>~</span>
              </span>

              <span>{format(new Date(schedule.endAt), 'yyyy년 M월 d일')}</span>
              <span className='text-left'>
                {format(new Date(schedule.endAt), 'a h시 mm분')}
              </span>
            </div>

            <div className='mt-[20px] flex items-center border-t border-gray-100 pt-[20px]'>
              <MapPinIcon className='aspect-square h-4 w-4 shrink-0 text-gray-700' />
              <span className='text-14_M leading-normal tracking-[-0.35px] text-gray-700'>
                {schedule.location}
              </span>
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
      {isEditing && (
        <ScheduleFormModal
          groupId={groupId}
          defaultDate={new Date()}
          initialData={schedule}
          isEdit
          onClose={() => {
            setIsEditing(false);
            onClose();
          }}
        />
      )}
    </>
  );
};

export default ScheduleDetailModal;
