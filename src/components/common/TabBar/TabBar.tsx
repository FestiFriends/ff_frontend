'use client';

import React, { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { match } from 'path-to-regexp';
import { NavLink } from '@/components/common';
import {
  CalendarIcon,
  GroupIcon,
  HomeIcon,
  LikeIcon,
  UserIcon,
} from '@/components/icons';
import { useIsMobile } from '@/hooks';
import { cn } from '@/lib/utils';

const NAV_ITEM = [
  { href: '/', name: '홈', Icon: HomeIcon },
  { href: '/calendar', name: '캘린더', Icon: CalendarIcon },
  { href: '/groups/managements', name: '나의모임', Icon: GroupIcon },
  { href: '/favorite', name: '찜', Icon: LikeIcon },
  { href: '/mypage', name: '마이', Icon: UserIcon },
];

const INVISIBLE_ROUTE = [
  '/groups/create',
  '/profiles/me/edit',
  '/reviews/managements',
  '/groups/:groupId/edit',
  '/groups/:groupId/posts/:postId',
  '/groups/:groupId/posts/create',
];

const tabBarHide = (pathname: string) =>
  INVISIBLE_ROUTE.some((route) =>
    match(route, { decode: decodeURIComponent })(pathname)
  );

interface TabBarProps {
  children: ReactNode;
}

const TabBar = ({ children }: TabBarProps) => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  if (tabBarHide(pathname)) {
    return children;
  }

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
              href={item.href}
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
