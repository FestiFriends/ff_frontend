'use client';

import { XIcon } from 'lucide-react';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';

interface ScheduleCreateModalProps {
  groupId: string;
  defaultDate: Date;
  onClose: () => void;
}

const ScheduleCreateModal = ({
  groupId,
  defaultDate,
  onClose,
}: ScheduleCreateModalProps) => (
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

        <h2 className='text-16_B font-bold text-gray-900'>등록</h2>
      </div>

      <div className='mt-[30px] flex justify-between gap-[10px]'>
        <ModalCancel className='w-full rounded-[12px] border border-primary-red px-4 py-2 text-14_M text-primary-red'>
          취소
        </ModalCancel>
        <ModalAction className='w-full rounded-[12px] bg-primary-red px-4 py-2 text-14_M text-white'>
          등록
        </ModalAction>
      </div>
    </ModalContent>
  </Modal>
);

export default ScheduleCreateModal;
