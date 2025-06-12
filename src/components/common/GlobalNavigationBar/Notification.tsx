'use client';
import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { BellDotIcon, BellIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import NotificationList from '@/components/pages/notifications/NotificationList';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useGetNewNotificationsCheck } from '@/hooks/notificationHooks/notificationHooks';

const Notification = () => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  const router = useRouter();
  const { data: hasNewNotificationData, refetch } =
    useGetNewNotificationsCheck();
  const pathname = usePathname();

  const Icon = hasNewNotificationData?.data?.hasUnread ? BellDotIcon : BellIcon;

  useEffect(() => {
    refetch();
  }, [pathname, refetch]);

  return (
    <>
      {isDesktop ? (
        <Popover>
          <PopoverTrigger>
            <Icon />
          </PopoverTrigger>
          <PopoverContent>
            <ScrollArea className='h-80'>
              <NotificationList />
            </ScrollArea>
          </PopoverContent>
        </Popover>
      ) : (
        <Icon onClick={() => router.push('/notifications')} />
      )}
    </>
  );
};

export default Notification;
