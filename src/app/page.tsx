import ProfileCard from '@/components/ProfileCard/ProfileCard';

const Home = () => {
  return (
    <main className='min-h-screen bg-gray-50 py-10'>
      <div className='mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-4'>
        <ProfileCard userId='me' />
        <ProfileCard userId='guest1' />
        <ProfileCard userId='loading' />
        <ProfileCard userId='1234' />
      </div>
    </main>
  );
};

export default Home;
