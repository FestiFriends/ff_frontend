'use client';

import { useState } from 'react';
import { Tabs } from '@/components/common';
import GroupPosts from './GroupPosts';

const groupTabs = ['게시글', '채팅', '캘린더'];

const GroupTabs = () => {
  const [selectedTab, setSelectedTab] = useState(groupTabs[0]);

  return (
    <div>
      <Tabs
        tabs={groupTabs}
        activeTab={selectedTab}
        onTabChange={setSelectedTab}
      />
      <>
        {selectedTab === '게시글' && <GroupPosts />}
        {/* {selectedTab === '채팅' && <Chat />} */}
        {/* {selectedTab === '캘린더' && <캘린더 />} */}
      </>
    </div>
  );
};

export default GroupTabs;
