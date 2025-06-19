'use client';

import React from 'react';
import { useIsMobile } from '@/hooks';
import { useLogin, useLogout } from '@/hooks/useAuth/useAuth';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import NavLink from '../NavLink/NavLink';
import Notification from '../Notification/Notification';
import SearchInput from '../SearchInput/SearchInput';

const NAV_ITEM = [
  { herf: '/calendar', name: '캘린더' },
  { herf: '/performances', name: '공연' },
  { herf: '/groups/managements', name: '모임' },
];

const GlobalNavigationBar = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const { onLogin } = useLogin();
  const { mutate: logoutMutate } = useLogout();
  const isMobile = useIsMobile();

  if (isMobile) {
    return null;
  }

  return (
    <nav className='grid grid-cols-3'>
      <div className='justify-self-start'>
        <NavLink
          href='/'
          activeClassName='underline'
          end
        >
          로고
        </NavLink>
        {NAV_ITEM.map((item) => (
          <NavLink
            key={item.name}
            href={item.herf}
            activeClassName='underline'
            end
          >
            {item.name}
          </NavLink>
        ))}
      </div>
      <div className='justify-self-center'>
        <SearchInput onSubmit={() => {}}>검색</SearchInput>
      </div>
      <div className='justify-self-end'>
        {!isLoggedIn ? (
          <button onClick={onLogin}>로그인</button>
        ) : (
          <>
            <Notification />
            <button onClick={() => logoutMutate()}>로그아웃</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default GlobalNavigationBar;
