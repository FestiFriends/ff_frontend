'use client';

import EditProfileForm from './EditProfileForm';

const EditProfile = () => (
  <section className='mx-auto max-w-xl'>
    <h1 className='mb-6 text-center text-xl font-bold'>프로필 편집</h1>
    <div className='mb-6 px-[16px]'>
      <EditProfileForm />
    </div>
  </section>
);

export default EditProfile;
