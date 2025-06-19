import { useGetGroupMembers } from '@/hooks/groupHooks/groupHooks';
import MembersHeader from './Members/MembersHeader';
import MembersList from './Members/MembersList';

interface GroupMembersProps {
  groupId: string;
}

const GroupMembers = ({ groupId }: GroupMembersProps) => {
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
      />
      <MembersList
        members={groupMembers?.data.members}
        isPending={isPending}
        isError={isError}
      />
    </div>
  );
};

export default GroupMembers;
