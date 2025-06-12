'use client';

import React, { useEffect, useState } from 'react';
import { useGetNewNotificationsCheck } from '@/hooks/notificationHooks/notificationHooks';
import { useSseStore } from '@/providers/SseStoreProvider';
import Toast from '../common/Toast/Toast';

const NotificationToast = () => {
  const [showToast, setShowToast] = useState(false);
  const notification = useSseStore((state) => state.notification);
  const { refetch } = useGetNewNotificationsCheck();

  useEffect(() => {
    setShowToast(true);
    refetch();
  }, [notification, refetch]);

  return (
    <>
      {showToast && notification && (
        <Toast
          message={notification.message}
          type='info'
          onClose={() => setShowToast(false)}
          className='bottom-4 left-1/2 w-fit -translate-x-1/2'
        />
      )}
    </>
  );
};

export default NotificationToast;
