'use client';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { usePathname, useRouter } from 'next/navigation';
import BellIcon from '@/components/icons/BellIcon';
import NotificationList from '@/components/pages/notifications/NotificationList';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetNewNotificationsCheck } from '@/hooks/notificationHooks/notificationHooks';

const MobileNotification = () => {
  const router = useRouter();
  const { data: hasNewNotificationData } = useGetNewNotificationsCheck();

  return (
    <BellIcon
      isActive={hasNewNotificationData?.data?.hasUnread}
      onClick={() => router.push('/notifications')}
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
          <BellIcon isActive={hasNewNotificationData?.data?.hasUnread} />
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
  const isDesktop = useMediaQuery({ minWidth: 768 });

  if (isDesktop) {
    return <DesktopNotification />;
  }

  return <MobileNotification />;
};

export default Notification;
