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
      <div className='p-4'>
        <EditProfileForm profile={profile} />
      </div>
    </section>
  );
};

export default EditProfile;
