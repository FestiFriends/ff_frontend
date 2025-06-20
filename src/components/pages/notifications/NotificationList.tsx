'use client';

import { ReactNode } from 'react';
import InfiniteList from '@/components/common/InfiniteList/InfiniteList';
import { infiniteNotificationsOptions } from '@/hooks/notificationHooks/notificationHooks';
import { GetNotificationsResponse } from '@/types/notification';
import NotificationCard from './NotificationCard';
import NotificationCardSkeleton from './NotificationCardSkeleton';

const NotificationList = () => (
  <InfiniteList<
    GetNotificationsResponse,
    GetNotificationsResponse['data'][number]
  >
    options={infiniteNotificationsOptions()}
    getDataId={(notification) => notification.id}
    renderData={(notification): ReactNode => (
      <NotificationCard notification={notification} />
    )}
    fallback={<NotificationCardSkeleton />}
    isFetchingFallback={<p>로딩 중...</p>}
    className='flex flex-col'
  />
);

export default NotificationList;
