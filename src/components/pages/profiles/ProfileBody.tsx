'use client';

import { useState } from 'react';
import Tabs from '@/components/Tabs/Tabs';
import { FullProfile } from '@/types/profiles';
import ProfileSummaryBox from './ProfileSummaryBox';
import ReceivedReviews from './ReceivedReviews';

interface ProfileBodyProps {
  profile: FullProfile;
}

const TABS = ['참여 모임', '리뷰 목록'];

const ProfileBody = ({ profile }: ProfileBodyProps) => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <div className='mx-auto w-full max-w-xl'>
      <ProfileSummaryBox groupSummary={profile.groupSummary} />

      <Tabs
        tabs={TABS}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      {selectedTab === '참여 모임' && <div>참여 중인 모임 목록</div>}
      {selectedTab === '리뷰 목록' && (
        <div>
          <ReceivedReviews profile={profile} />
        </div>
      )}
    </div>
  );
};

export default ProfileBody;
