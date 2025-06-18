import { useParams } from 'next/navigation';
import { Button } from '@/components/common';
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalTrigger,
} from '@/components/common/Modal';
import { usePatchGroupMemberRole } from '@/hooks/groupHooks/groupHooks';
import { Member } from '@/types/group';

interface MemberRoleModalProps {
  member: Member;
}

const MemberRoleModal = ({ member }: MemberRoleModalProps) => {
  const { groupId } = useParams();
  const { mutate: patchMemberRole } = usePatchGroupMemberRole();

  const handlePatchMemberRole = (role: string) => {
    patchMemberRole({
      groupId: groupId as string,
      memberId: member.memberId,
      role,
    });
  };

  return (
    <Modal>
      <ModalTrigger>
        <Button
          variant='primary'
          className='px-3 py-1.5'
        >
          <span className='text-center text-14_M leading-4.5 tracking-[-0.35px]'>
            권한 수정
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
            <ModalAction
              onClick={() => handlePatchMemberRole('HOST')}
              className='inline-flex w-full cursor-pointer items-center justify-center rounded-12 bg-primary-red py-2.5 text-center text-14_M text-white'
            >
              넘기기
            </ModalAction>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default MemberRoleModal;
