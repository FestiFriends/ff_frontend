'use client';

import { useState } from 'react';
import Tabs from '@/components/Tabs/Tabs';

const TABS = ['참여 모임', '리뷰 목록'];

const ProfileBody = () => {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <div className='w-full max-w-4xl px-4'>
      <div>모임이력</div>

      <Tabs
        tabs={TABS}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      {selectedTab === '참여 모임' && <div>참여 중인 모임 목록</div>}
      {selectedTab === '리뷰 목록' && <div>받은 리뷰 목록</div>}
    </div>
  );
};

export default ProfileBody;
