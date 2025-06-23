import { Header } from '@/components/common';
import ProfilePage from '@/components/pages/profiles/ProfilePage';
import { ScrollArea } from '@/components/ui/scroll-area';

const MyProfilePage = () => (
  <>
    <Header title='내 프로필' />
    <ScrollArea className='h-[calc(100dvh-124px)]'>
      <div className='w-screen max-w-lg'>
        <ProfilePage userId='me' />
      </div>
    </ScrollArea>
  </>
);
export default MyProfilePage;
