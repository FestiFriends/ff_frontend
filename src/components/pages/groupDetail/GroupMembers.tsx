import { useRef } from 'react';
import { useGetGroupMembers } from '@/hooks/groupHooks/groupHooks';
import MembersHeader from './Members/MembersHeader';
import MembersList from './Members/MembersList';

interface GroupMembersProps {
  groupId: string;
}

const GroupMembers = ({ groupId }: GroupMembersProps) => {
  const modalTriggerRef = useRef<HTMLButtonElement>(null);
  const {
    data: groupMembers,
    isPending,
    isError,
  } = useGetGroupMembers(groupId, 5);

  return (
    <div className='flex flex-col gap-5 px-4'>
      <MembersHeader
        groupId={groupId}
        memberCount={groupMembers?.data.memberCount}
        isHost={groupMembers?.data.isHost}
        modalTriggerRef={modalTriggerRef}
      />
      <MembersList
        members={groupMembers?.data.members}
        memberCount={groupMembers?.data.memberCount}
        isPending={isPending}
        isError={isError}
        modalTriggerRef={modalTriggerRef}
      />
    </div>
  );
};

export default GroupMembers;
