import React, { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  useDeleteNotifications,
  usePatchReadNotifications,
} from '@/hooks/notificationHooks/notificationHooks';
import {
  NotificationData,
  NotificationTargetType,
  NotificationType,
} from '@/types/notification';

const getNotificationHref = (
  type: NotificationType,
  target: NotificationTargetType
): string => {
  switch (type) {
    case 'APPLICATION':
      return '/groups/managements';
    case 'APPLIED':
      return '/groups/managements';
    case 'REVIEW':
      return '/reviews/managements';
    case 'MY_PROFILE':
      return '/profiles/me';
    case 'REJECTED':
    case 'BANNED':
      return '';
    case 'GROUP':
    case 'SCHEDULE':
      if (target && 'groupId' in target) {
        return `/groups/${target.groupId}`;
      }
      return '';
    case 'POST':
      if (target && 'groupId' in target && 'postId' in target) {
        return `/groups/${target.groupId}/posts/${target.postId}`;
      }
      return '';
  }
};

interface NotificationCardProps {
  notification: NotificationData;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const router = useRouter();
  const { mutate: deleteMutate, isPending: deleteIsPending } =
    useDeleteNotifications();

  const { mutateAsync: readMutate, isPending: readIsPending } =
    usePatchReadNotifications();

  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (deleteIsPending) return;

    deleteMutate(notification.id);
  };

  const handleRead = async () => {
    if (readIsPending) return;

    await readMutate(notification.id);
  };

  if (deleteIsPending) return null;

  const href = getNotificationHref(notification.type, notification.target);

  return (
    <div className='flex h-10 items-center justify-between bg-gray-100 px-4'>
      <button
        className='h-full w-full'
        onClick={() => {
          handleRead();
          router.push(href);
        }}
      >
        {notification.message}
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          handleRead();
        }}
        disabled={notification.isRead}
        className='shrink-0 bg-blue-200 disabled:bg-gray-200'
      >
        읽음
      </button>
      <button
        onClick={(e) => handleDelete(e)}
        className='shrink-0 bg-red-200'
      >
        삭제
      </button>
    </div>
  );
};

export default NotificationCard;
