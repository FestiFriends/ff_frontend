import { Header } from '@/components/common';
import EditProfile from '@/components/pages/editProfile/EditProfile';
import { ScrollArea } from '@/components/ui/scroll-area';

const EditProfilePage = () => (
  <>
    <Header title='프로필 수정' />
    <ScrollArea className='h-[calc(100dvh-44px)]'>
      <div className='w-screen max-w-lg'>
        <EditProfile />
      </div>
    </ScrollArea>
  </>
);

export default EditProfilePage;
