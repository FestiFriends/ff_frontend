'use client';

import { Skeleton } from '@/components/ui/skeleton';
import {
  useDeleteAllNotifications,
  useInfiniteNotifications,
  usePatchReadAllNotifications,
} from '@/hooks/notificationHooks/notificationHooks';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import NotificationCard from './NotificationCard';

const NotificationList = () => {
  const { mutate: readAllMutate, isPending: readAllIsPending } =
    usePatchReadAllNotifications();
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

  const handleReadAll = () => {
    if (readAllIsPending) return;

    readAllMutate();
  };

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
        <button onClick={handleReadAll}>전체 읽음</button>
        {!deleteAllIsPending && (
          <>
            {data?.pages.map((page) =>
              page.data?.map((notification) => (
                <NotificationCard
                  key={notification.id}
                  notification={notification}
                />
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
