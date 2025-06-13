'use client';

import { ReactNode } from 'react';
import InfiniteReviewList from '@/components/common/InfiniteReviewList';
import {
  infiniteNotificationsOptions,
  useDeleteAllNotifications,
  usePatchReadAllNotifications,
} from '@/hooks/notificationHooks/notificationHooks';
import { GetNotificationsResponse } from '@/types/notification';
import NotificationCard from './NotificationCard';
import NotificationCardSkeleton from './NotificationCardSkeleton';

const NotificationList = () => {
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
    <>
      <div className='mb-4 flex flex-col gap-2'>
        <button
          onClick={handleDeleteAll}
          disabled={deleteAllIsPending}
        >
          삭제
        </button>
        <button
          onClick={handleReadAll}
          disabled={readAllIsPending}
        >
          전체 읽음
        </button>
      </div>

      <InfiniteReviewList<
        GetNotificationsResponse,
        GetNotificationsResponse['data'][number]
      >
        options={infiniteNotificationsOptions(4)}
        getDataId={(notification) => notification.id}
        renderData={(notification): ReactNode => (
          <NotificationCard notification={notification} />
        )}
        fallback={<NotificationCardSkeleton />}
        isFetchingFallback={<p>로딩 중...</p>}
        className='flex flex-col gap-2'
      />
    </>
  );
};

export default NotificationList;
