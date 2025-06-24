import { Header } from '@/components/common';
import MyPageMain from '@/components/pages/myPage/myPageMain';
import { ScrollArea } from '@/components/ui/scroll-area';

const MyProfilePage = () => (
  <>
    <Header title='마이페이지' />
    <ScrollArea className='h-[calc(100dvh-124px)]'>
      <div className='w-screen max-w-lg'>
        <MyPageMain />
      </div>
    </ScrollArea>
  </>
);

export default MyProfilePage;
