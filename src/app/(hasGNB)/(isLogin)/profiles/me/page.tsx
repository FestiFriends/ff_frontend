import { Header } from '@/components/common';
import ProfilePage from '@/components/pages/profiles/ProfilePage';

const MyProfilePage = () => (
  <>
    <Header title='내 프로필' />
    <ProfilePage userId='me' />;
  </>
);
export default MyProfilePage;
