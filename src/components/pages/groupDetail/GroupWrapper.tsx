'use client';

import StateNotice from '@/components/common/StateNotice/StateNotice';
import { useGetGroupInfo } from '@/hooks/groupHooks/groupHooks';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import GroupBlurredContainer from './GroupBlurredContainer';
import GroupInfo from './GroupInfo';
import GroupMembers from './GroupMembers';
import GroupTabs from './GroupTabs';

interface GroupWrapperProps {
  groupId: string;
}

const GroupWrapper = ({ groupId }: GroupWrapperProps) => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { data: groupInfo, isPending, isError } = useGetGroupInfo(groupId);
  const isMember = groupInfo?.data?.isMember;

  const isExpired =
    groupInfo?.data?.endDate && new Date(groupInfo.data.endDate) < new Date();

  // TODO: 종료된 모임 표시 컴포넌트 추가
  if (!isPending && isExpired) {
    return (
      <div className='flex flex-col items-center justify-center px-4 py-5'>
        <p className='font-semibold text-gray-500'>종료된 모임입니다.</p>
      </div>
    );
  }

  if (isError) {
    return (
      <StateNotice
        preset='notfound'
        message='존재하지 않는 모임입니다.'
      />
    );
  }

  return (
    <div className='flex flex-col gap-7.5 bg-white pt-1'>
      <GroupInfo
        isPending={isPending}
        groupInfo={groupInfo?.data}
      />

      {isLoggedIn && isMember ? (
        <>
          <GroupMembers groupId={groupId} />
          <GroupTabs groupInfo={groupInfo?.data} />
        </>
      ) : (
        <GroupBlurredContainer
          isPending={isPending}
          groupInfo={groupInfo?.data}
        />
      )}
    </div>
  );
};

export default GroupWrapper;
