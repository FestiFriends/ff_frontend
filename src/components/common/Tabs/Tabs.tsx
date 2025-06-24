'use client';

import { cn } from '@/lib/utils';

interface TabsProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
}
const Tabs = ({ tabs, activeTab, onTabChange, className }: TabsProps) => (
  <div className={cn('relative', className)}>
    <div className='flex h-full justify-between border-b border-gray-100'>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`relative flex-[1_0_0] cursor-pointer items-center justify-center px-2 py-3.5 leading-normal tracking-[-0.35px] transition-all ${
            activeTab === tab
              ? 'text-14_B text-gray-950'
              : 'text-14_M text-gray-950'
          }`}
        >
          {tab}
          <span
            className={`absolute bottom-0 left-1/2 block h-[3px] -translate-x-1/2 transform ${
              activeTab === tab ? 'bg-gray-950' : 'bg-transparent'
            } w-20`}
          />
        </button>
      ))}
    </div>
  </div>
);

export default Tabs;
