'use client';

import React from 'react';
import { useLogin, useLogout } from '@/hooks/useAuth/useAuth';
import { useAuthStore } from '@/providers/AuthStoreProvider';
import NavLink from '../NavLink/NavLink';
import SearchInput from '../SearchInput/SearchInput';
import Notification from './Notification';

const NAV_ITEM = [
  { herf: '/calendar', name: '캘린더' },
  { herf: '/performances', name: '공연' },
  { herf: '/groups/managements', name: '모임' },
];

const GlobalNavigationBar = () => {
  const isLoggedin = useAuthStore((state) => state.isLoggedin);
  const { onLogin } = useLogin();
  const { mutate: logoutMutate } = useLogout();

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
        {!isLoggedin ? (
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
