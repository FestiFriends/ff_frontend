'use client';
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import BellIcon from '@/components/icons/BellIcon';
import NotificationList from '@/components/pages/notifications/NotificationList';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useIsDesktop } from '@/hooks';
import { useGetNewNotificationsCheck } from '@/hooks/notificationHooks/notificationHooks';

const MobileNotification = () => {
  const router = useRouter();
  const { data: hasNewNotificationData } = useGetNewNotificationsCheck();

  return (
    <BellIcon
      isActive={hasNewNotificationData?.data?.hasUnread}
      onClick={() => router.push('/notifications')}
      className='cursor-pointer'
    />
  );
};

const DesktopNotification = () => {
  const { data: hasNewNotificationData, refetch } =
    useGetNewNotificationsCheck();
  const pathname = usePathname();

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <BellIcon
            isActive={hasNewNotificationData?.data?.hasUnread}
            className='cursor-pointer'
          />
        </PopoverTrigger>
        <PopoverContent>
          <ScrollArea className='h-80'>
            <NotificationList />
          </ScrollArea>
        </PopoverContent>
      </Popover>
    </>
  );
};

const Notification = () => {
  const isDesktop = useIsDesktop();

  if (isDesktop) {
    return <DesktopNotification />;
  }

  return <MobileNotification />;
};

export default Notification;
