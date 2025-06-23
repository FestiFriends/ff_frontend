'use client';

import React from 'react';
import {
  useDeleteAllNotifications,
  usePatchReadAllNotifications,
} from '@/hooks/notificationHooks/notificationHooks';

const NotificationHeader = () => {
  const { mutate: readAllMutate, isPending: readAllIsPending } =
    usePatchReadAllNotifications();
  const { mutate: deleteAllMutate, isPending: deleteAllIsPending } =
    useDeleteAllNotifications();
  const handleDeleteAll = () => {
    if (deleteAllIsPending) return;
    deleteAllMutate();
  };

  const handleReadAll = () => {
    if (readAllIsPending) return;
    readAllMutate();
  };
  return (
    <header className='sticky top-0 left-0 z-50 flex h-11 w-full items-center justify-between bg-white px-4 py-3'>
      <h1 className='text-16_B text-gray-950'>알림</h1>
      <div className='flex h-[14px] gap-3'>
        <button
          onClick={handleReadAll}
          disabled={readAllIsPending}
          className='flex items-center justify-center'
        >
          <span className='to-gray-700 text-12_M underline'>전체 읽음</span>
        </button>
        <button
          onClick={handleDeleteAll}
          disabled={deleteAllIsPending}
          className='flex items-center justify-center'
        >
          <span className='to-gray-700 text-12_M underline'>전체 삭제</span>
        </button>
      </div>
    </header>
  );
};

export default NotificationHeader;
