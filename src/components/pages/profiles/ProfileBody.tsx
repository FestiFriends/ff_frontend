'use client';

import { useState } from 'react';
import StateNotice from '@/components/common/StateNotice/StateNotice';
import Tabs from '@/components/common/Tabs/Tabs';
import { useJoinedGroups } from '@/hooks/useJoinedGroups/useJoinedGroups';
import { FullProfile } from '@/types/profiles';
import ProfileJoinedGroups from './ProfileJoinedGroups';
import ProfileWrapper from './ProfileWrapper';
import ReceivedReviews from './ReceivedReviews';

interface ProfileBodyProps {
  profile: FullProfile;
}

const TABS = ['참가 모임', '받은 리뷰'];

const ProfileBody = ({ profile }: ProfileBodyProps) => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  const {
    data: joinedGroupsData,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useJoinedGroups(profile.id);

  return (
    <section className='flex flex-col items-center rounded-xl bg-white'>
      <div className='w-full max-w-xl'>
        <div>
          <Tabs
            tabs={TABS}
            activeTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        </div>
        <ProfileWrapper className='mb-4 py-0'>
          {selectedTab === '참가 모임' && (
            <>
              {isGroupsError && (
                <StateNotice
                  preset='error'
                  message='참가한 모임 불러오기에 실패했어요.'
                />
              )}
              {(isGroupsLoading || joinedGroupsData) && (
                <ProfileJoinedGroups
                  groupSummary={profile.groupSummary}
                  groups={joinedGroupsData?.data ?? []}
                  isLoading={isGroupsLoading}
                />
              )}
            </>
          )}

          {selectedTab === '받은 리뷰' && <ReceivedReviews profile={profile} />}
        </ProfileWrapper>
      </div>
    </section>
  );
};

export default ProfileBody;
