'use client';
import { useMyProfile } from '@/hooks/useMyProfile/useMyProfile';
import EditProfileForm from './EditProfileForm';

const EditProfile = () => {
  const { data: profile, isPending, isError } = useMyProfile();

  if (isPending) {
    return null;
  }

  if (isError) {
    return null;
  }

  return (
    <section className='mx-auto max-w-xl'>
      <h1 className='mb-6 text-center text-xl font-bold'>프로필 편집</h1>
      <div className='mb-6 px-[16px]'>
        <EditProfileForm profile={profile} />
      </div>
    </section>
  );
};

export default EditProfile;
