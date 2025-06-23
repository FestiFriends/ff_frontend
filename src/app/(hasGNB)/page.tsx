import Header from '@/components/common/Header/Header';
import MainBanner from '@/components/pages/main/MainBanner';
import MainRecentReviews from '@/components/pages/main/MainRecentReviews';
import MainTopFavoritesPerformances from '@/components/pages/main/MainTopFavoritesPerformances';
import MainTopGroupsPerformances from '@/components/pages/main/MainTopGroupsPerformances';
import { ScrollArea } from '@/components/ui/scroll-area';

const Home = async () => (
  <div className='flex flex-col bg-[#edeef2]'>
    <Header />
    <ScrollArea className='h-[calc(100dvh-124px)]'>
      <div className='mt-2.5 flex w-screen max-w-lg flex-col gap-2.5 bg-[#edeef2]'>
        <MainBanner />
        <MainTopFavoritesPerformances />
        <MainTopGroupsPerformances />
        <MainRecentReviews />
      </div>
    </ScrollArea>
  </div>
);

export default Home;
