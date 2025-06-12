'use client';

import React, { useState } from 'react';
import Tabs from '@/components/common/Tabs/Tabs';
import Applications from './Applications';
import AppliedGroups from './AppliedGroups';
import JoinedGroups from './JoinedGroups';

const tabs = ['신청한 모임', '참가 중인 모임', '받은 신청서'];

const GroupsManagementsTabs = () => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  return (
    <>
      <div className='mb-5'>
        <Tabs
          tabs={tabs}
          activeTab={selectedTab}
          onTabChange={setSelectedTab}
        />
      </div>
      <div className='mb-9'>
        {selectedTab === '신청한 모임' && <AppliedGroups />}
        {selectedTab === '참가 중인 모임' && <JoinedGroups />}
        {selectedTab === '받은 신청서' && <Applications />}
      </div>
    </>
  );
};

export default GroupsManagementsTabs;
