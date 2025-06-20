import React, { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  useDeleteNotifications,
  usePatchReadNotifications,
} from '@/hooks/notificationHooks/notificationHooks';
import { cn } from '@/lib/utils';
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
    <div
      className={cn(
        'flex h-[120px] w-full flex-col justify-between border-b border-gray-100 bg-white p-4',
        !notification.isRead && 'bg-gray-25'
      )}
    >
      <button
        className='relative flex h-[58px] w-full justify-start'
        onClick={() => {
          handleRead();
          router.push(href);
        }}
      >
        <span className='line-clamp-2 text-left text-16_body_M text-gray-950'>
          {notification.message}
        </span>
        {!notification.isRead && (
          <span className='absolute top-0 right-0 h-1.5 w-1.5 rounded-full bg-primary-red' />
        )}
      </button>
      <div className='flex h-6 justify-end gap-2'>
        {!notification.isRead && (
          <button
            onClick={(e) => {
              e.preventDefault();
              handleRead();
            }}
            disabled={notification.isRead}
            className='flex items-center justify-center rounded-[4px] bg-gray-900 px-2.5 py-1'
          >
            <span className='text-13_M text-white'>읽음</span>
          </button>
        )}
        <button
          onClick={(e) => handleDelete(e)}
          className='flex items-center justify-center rounded-[4px] bg-[#FFCCCF] px-2.5 py-1'
        >
          <span className='text-13_M text-gray-950'>삭제</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationCard;
