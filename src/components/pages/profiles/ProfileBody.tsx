'use client';

import { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
import { FullProfile } from '@/types/profiles';
import ProfileJoinedGroups from './ProfileJoinedGroups';
import ProfileSummaryBox from './ProfileSummaryBox';
import ReceivedReviews from './ReceivedReviews';

interface ProfileBodyProps {
  profile: FullProfile;
}

const TABS = ['참여 모임', '리뷰 목록'];

const ProfileBody = ({ profile }: ProfileBodyProps) => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <section className='mt-4 flex flex-col items-center rounded-xl bg-white p-2 shadow'>
      <div className='w-full max-w-xl'>
        <ProfileSummaryBox groupSummary={profile.groupSummary} />
        <div className='mt-2 mb-4'>
          <Tabs
            tabs={TABS}
            activeTab={selectedTab}
            onTabChange={setSelectedTab}
          />
        </div>
        <div className='mb-4'>
          {selectedTab === '참여 모임' && (
            <div>
              <ProfileJoinedGroups groups={profile.joinedGroups ?? []} />
            </div>
          )}
          {selectedTab === '리뷰 목록' && <ReceivedReviews profile={profile} />}
        </div>
      </div>
    </section>
  );
};

export default ProfileBody;
