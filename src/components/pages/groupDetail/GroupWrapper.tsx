'use client';

import StateNotice from '@/components/common/StateNotice/StateNotice';
import { useGetGroupInfo } from '@/hooks/groupHooks/groupHooks';
import { renderErrorNotice } from '@/hooks/useErrorNoticePreset/useErrorNoticePreset';
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
  const {
    data: groupInfo,
    isPending,
    isError,
    error,
  } = useGetGroupInfo(groupId);
  const isMember = groupInfo?.data?.isMember;

  const isExpired =
    groupInfo?.data?.endDate && new Date(groupInfo.data.endDate) < new Date();

  if (!isPending && isExpired) {
    return (
      <div className='h-[80vh]'>
        <StateNotice
          preset='groupExpired'
          height='100%'
        />
      </div>
    );
  }

  if (isError) {
    return <div className='h-[80vh]'>{renderErrorNotice(error, '100%')}</div>;
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
