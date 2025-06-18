import MembersHeader from './Members/MembersHeader';
import MembersList from './Members/MembersList';

interface GroupMembersProps {
  groupId: string;
}

const GroupMembers = ({ groupId }: GroupMembersProps) => (
  <div className='flex flex-col gap-5 px-4'>
    <MembersHeader groupId={groupId} />
    <MembersList groupId={groupId} />
  </div>
);

export default GroupMembers;
