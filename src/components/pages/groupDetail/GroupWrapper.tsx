import GroupInfo from './GroupInfo';
import GroupMembers from './GroupMembers';
import GroupTabs from './GroupTabs';

interface GroupWrapperProps {
  groupId: string;
}

const GroupWrapper = ({ groupId }: GroupWrapperProps) => {
  console.log(groupId); // TODO: 주석 제거 필요
  return (
    <div className='flex flex-col gap-7.5 bg-white'>
      <GroupInfo />
      <GroupMembers />
      <GroupTabs />
    </div>
  );
};

export default GroupWrapper;
