'use client';

import { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
import { useJoinedGroups } from '@/hooks/useJoinedGroups/useJoinedGroups';
import { FullProfile } from '@/types/profiles';
import ProfileJoinedGroups from './ProfileJoinedGroups';
import ProfileWrapper from './ProfileWrapper';
import ReceivedReviews from './ReceivedReviews';

interface ProfileBodyProps {
  profile: FullProfile;
}

const TABS = ['참여 모임', '리뷰 목록'];

const ProfileBody = ({ profile }: ProfileBodyProps) => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  const {
    data: joinedGroupsData,
    isLoading: isGroupsLoading,
    isError: isGroupsError,
  } = useJoinedGroups(profile.id);

  return (
    <section className='mt-[24px] flex flex-col items-center rounded-xl bg-white'>
      <div className='w-full max-w-xl'>
        <div>
          <Tabs
            tabs={TABS}
            activeTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        </div>
        <ProfileWrapper className='py-0'>
          <div className='mb-4'>
            {selectedTab === '참여 모임' && (
              <div>
                {isGroupsLoading && (
                  <p className='text-center text-gray-400'>로딩 중...</p>
                )}
                {isGroupsError && (
                  <p className='text-center text-red-500'>
                    참여 모임 불러오기에 실패했어요.
                  </p>
                )}
                {!isGroupsLoading && joinedGroupsData && (
                  <ProfileJoinedGroups groups={joinedGroupsData.data} />
                )}
              </div>
            )}

            {selectedTab === '리뷰 목록' && (
              <ReceivedReviews profile={profile} />
            )}
          </div>
        </ProfileWrapper>
      </div>
    </section>
  );
};

export default ProfileBody;
