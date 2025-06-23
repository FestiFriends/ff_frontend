import NotificationHeader from '@/components/pages/notifications/NotificationHeader';
import NotificationList from '@/components/pages/notifications/NotificationList';
import { ScrollArea } from '@/components/ui/scroll-area';

const NotificationsPage = () => (
  <>
    <NotificationHeader />
    <ScrollArea className='h-[calc(100dvh-124px)]'>
      <div className='w-screen max-w-lg'>
        <NotificationList />
      </div>
    </ScrollArea>
  </>
);

export default NotificationsPage;
