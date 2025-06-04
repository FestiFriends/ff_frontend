import MainBanner from '@/components/pages/main/MainBanner';
import MainRecentReviews from '@/components/pages/main/MainRecentReviews';
import MainTopFavoritesPerformances from '@/components/pages/main/MainTopFavoritesPerformances';
import MainTopGroupsPerformances from '@/components/pages/main/MainTopGroupsPerformances';

const Home = async () => (
  <div className='flex flex-col gap-2.5 bg-[#edeef2]'>
    <MainBanner />
    <MainTopFavoritesPerformances />
    <MainTopGroupsPerformances />
    <MainRecentReviews />
  </div>
);

export default Home;
