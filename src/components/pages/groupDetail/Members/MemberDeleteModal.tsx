import { useParams } from 'next/navigation';
import { Button } from '@/components/common';
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalTrigger,
} from '@/components/common/Modal';
import { useDeleteGroupMember } from '@/hooks/groupHooks/groupHooks';
import { Member } from '@/types/group';

interface MemberDeleteModalProps {
  member: Member;
}

const MemberDeleteModal = ({ member }: MemberDeleteModalProps) => {
  const { groupId } = useParams();
  const { mutate: deleteGroupMember } = useDeleteGroupMember();

  const handleDeleteGroupMember = () => {
    deleteGroupMember({
      groupId: groupId as string,
      memberId: member.memberId,
    });
  };

  return (
    <Modal>
      <ModalTrigger>
        <Button
          variant='secondary'
          className='max-w-13 px-2 py-1.5 whitespace-nowrap'
        >
          <span className='text-center text-14_M leading-4.5 tracking-[-0.35px]'>
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
            <ModalAction
              onClick={handleDeleteGroupMember}
              className='inline-flex w-full cursor-pointer items-center justify-center rounded-12 bg-primary-red py-2.5 text-center text-14_M text-white'
            >
              퇴출하기
            </ModalAction>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default MemberDeleteModal;
