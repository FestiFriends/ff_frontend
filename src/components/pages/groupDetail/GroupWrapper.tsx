'use client';

import { useAuthStore } from '@/providers/AuthStoreProvider';
import GroupInfo from './GroupInfo';
import GroupMembers from './GroupMembers';
import GroupTabs from './GroupTabs';

interface GroupWrapperProps {
  groupId: string;
}

const GroupWrapper = ({ groupId }: GroupWrapperProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedin);
  console.log(groupId); // TODO: 주석 제거 필요

  return (
    <div className='flex flex-col gap-7.5 bg-white'>
      <GroupInfo />

      {/* TODO: isLoggedIn && isMember일 경우에만 렌더링 */}
      {isLoggedIn && (
        <>
          <GroupMembers />
          <GroupTabs />
        </>
      )}
    </div>
  );
};

export default GroupWrapper;
