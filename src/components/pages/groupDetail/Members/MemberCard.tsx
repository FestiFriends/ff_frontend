import { CrownIcon } from 'lucide-react';
import { Button } from '@/components/common';
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalTrigger,
} from '@/components/common/Modal';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { RoleLabels } from '@/constants/roleLabels';
import { RoleType } from '@/types/enums';
import { Member } from '@/types/group';

interface MemberCardProps {
  member: Member;
}

const MemberCard = ({ member }: MemberCardProps) => (
  <div
    key={member.memberId}
    className='flex items-center justify-between rounded-[16px] border-1 border-gray-100 bg-white p-3.5'
  >
    <div className='flex items-center justify-center gap-3'>
      <ProfileImage
        size='md'
        src={member.profileImage}
        alt={member.name}
        border={false}
        className='aspect-square shrink-0'
      />
      <div className='flex flex-col justify-center gap-0.5'>
        <span className='flex items-center text-center text-12_M tracking-[-0.35px] text-gray-500'>
          {member.role === 'HOST' && (
            <CrownIcon className='mr-[1px] aspect-square h-3 w-3' />
          )}
          {RoleLabels[member.role as RoleType]}
        </span>
        <span className='text-center text-16_B leading-normal tracking-[-0.4px] text-gray-950'>
          {member.name}
        </span>
      </div>
    </div>

    <div className='flex gap-3'>
      <Modal>
        <ModalTrigger>
          <Button
            variant='primary'
            className='px-3 py-1'
          >
            <span className='shrink-0 text-center text-12_M leading-normal tracking-[-0.35px] whitespace-pre-wrap'>
              {`모임장\n넘기기`}
            </span>
          </Button>
        </ModalTrigger>
        <ModalContent className='h-fit w-[calc(100%-32px)] max-w-[480px] rounded-[16px] p-5'>
          <div className='flex flex-col gap-7.5 pt-5.5'>
            <p className='flex w-full justify-center text-16_B text-black'>
              모임장을 {member.name}님에게 넘기시겠습니까?
            </p>
            <div className='flex gap-2'>
              <ModalCancel className='inline-flex w-full cursor-pointer items-center justify-center rounded-12 border border-primary-red py-2.5 text-center text-14_M text-primary-red'>
                취소
              </ModalCancel>
              <ModalAction className='inline-flex w-full cursor-pointer items-center justify-center rounded-12 bg-primary-red py-2.5 text-center text-14_M text-white'>
                넘기기
              </ModalAction>
            </div>
          </div>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalTrigger>
          <Button
            variant='secondary'
            className='px-3 py-1'
          >
            <span className='text-center text-14_M leading-normal tracking-[-0.35px]'>
              퇴출
            </span>
          </Button>
        </ModalTrigger>
        <ModalContent className='h-fit w-[calc(100%-32px)] max-w-[480px] rounded-[16px] p-5'>
          <div className='flex flex-col gap-7.5 pt-5.5'>
            <p className='flex w-full justify-center text-16_B text-black'>
              {member.name}님을 모임에서 퇴출시키시겠습니까?
            </p>
            <div className='flex gap-2'>
              <ModalCancel className='inline-flex w-full cursor-pointer items-center justify-center rounded-12 border border-primary-red py-2.5 text-center text-14_M text-primary-red'>
                취소
              </ModalCancel>
              <ModalAction className='inline-flex w-full cursor-pointer items-center justify-center rounded-12 bg-primary-red py-2.5 text-center text-14_M text-white'>
                퇴출하기
              </ModalAction>
            </div>
          </div>
        </ModalContent>
      </Modal>
    </div>
  </div>
);

export default MemberCard;
