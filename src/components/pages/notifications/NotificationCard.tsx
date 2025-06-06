import React from 'react';
import { useDeleteNotifications } from '@/hooks/notificationHooks/notificationHooks';
import { NotificationData } from '@/types/notification';

interface NotificationCardProps {
  notification: NotificationData;
}

const NotificationCard = ({ notification }: NotificationCardProps) => {
  const { mutate, isPending } = useDeleteNotifications();

  const handleDelete = () => {
    if (isPending) return;

    mutate(notification.id);
  };

  if (isPending) return null;

  return (
    <div className='flex h-10 items-center justify-between bg-gray-100 px-4'>
      {notification.message}
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
};

export default NotificationCard;
