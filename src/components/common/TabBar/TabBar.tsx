'use client';

import React, { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';
import { CalendarIcon } from 'lucide-react';
import GroupIcon from '@/components/icons/GroupIcon';
import HomeIcon from '@/components/icons/HomeIcon';
import LikeIcon from '@/components/icons/LikeIcon';
import UserIcon from '@/components/icons/UserIcon';
import { cn } from '@/lib/utils';
import NavLink from '../NavLink/NavLink';

const NAV_ITEM = [
  { herf: '/', name: '홈', Icon: HomeIcon },
  { herf: '/calendar', name: '캘린더', Icon: CalendarIcon },
  { herf: '/groups/managements', name: '나의모임', Icon: GroupIcon },
  { herf: '/favorite', name: '찜', Icon: LikeIcon },
  { herf: '/profiles/me', name: '마이', Icon: UserIcon },
];

interface TabBarProps {
  children: ReactNode;
}

const TabBar = ({ children }: TabBarProps) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      <div className={cn('overflow-auto', isMobile && 'h-[calc(100dvh-80px)]')}>
        {children}
      </div>
      {isMobile && (
        <div className='sticky right-0 bottom-0 left-0 flex h-20 justify-between border-t border-gray-50 bg-white p-4'>
          {NAV_ITEM.map((item) => (
            <NavLink
              key={item.name}
              href={item.herf}
              className='flex h-11 w-11 flex-col items-center gap-1.5 text-gray-400'
              activeClassName='text-primary-red'
              end
            >
              {
                <item.Icon
                  type='active'
                  className='h-6 w-6 text-center text-inherit'
                />
              }
              <span className='flex h-[14px] w-full items-center justify-center text-12_M'>
                {item.name}
              </span>
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
};

export default TabBar;
