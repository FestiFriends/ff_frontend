'use client';

import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import {
  useDeleteAllNotifications,
  useInfiniteNotifications,
  usePatchReadNotifications,
} from '@/hooks/notificationHooks/notificationHooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';

const NotificationList = () => {
  const { mutate: readMutate } = usePatchReadNotifications();
  const { mutate: deleteAllMutate, isPending: deleteAllIsPending } =
    useDeleteAllNotifications();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteNotifications(10);

  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage
  );

  const handleDeleteAll = () => {
    if (deleteAllIsPending) return;

    deleteAllMutate();
  };

  useEffect(() => {
    readMutate();
  }, [readMutate]);

  if (isPending) {
    return (
      <div className='flex flex-col gap-1'>
        <Skeleton className='h-5 w-full bg-gray-50' />
        <Skeleton className='h-5 w-full bg-gray-50' />
      </div>
    );
  }

  return (
    <>
      <div className='flex flex-col gap-2'>
        <button onClick={handleDeleteAll}>삭제</button>
        {!deleteAllIsPending && (
          <>
            {data?.pages.map((page) =>
              page.data.data?.map((notification) => (
                <div
                  key={notification.id}
                  className='h-10 bg-gray-100'
                >
                  {notification.message}
                </div>
              ))
            )}
          </>
        )}
      </div>
      {!deleteAllIsPending && (
        <>
          <div ref={bottomRef} />
          {isFetchingNextPage && <p>로딩 중...</p>}
        </>
      )}
    </>
  );
};

export default NotificationList;
