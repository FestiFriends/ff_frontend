'use client';

import { useState } from 'react';
import { Tabs } from '@/components/common';
import { GroupInfo } from '@/types/group';
import Chat from './Chat/Chat';
import GroupPosts from './GroupPosts';

const groupTabs = ['게시글', '채팅', '캘린더'];

interface GroupTabsProps {
  groupInfo?: GroupInfo;
}

const GroupTabs = ({ groupInfo }: GroupTabsProps) => {
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
        {selectedTab === '채팅' && <Chat groupInfo={groupInfo} />}
        {/* {selectedTab === '캘린더' && <캘린더 />} */}
      </>
    </div>
  );
};

export default GroupTabs;
