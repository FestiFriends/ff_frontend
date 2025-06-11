const ProfileHeaderSkeleton = () => (
  <section className='flex animate-pulse flex-col items-center space-y-6 rounded-xl bg-white p-2 shadow'>
    <div className='flex w-full max-w-xl items-end gap-4'>
      <div className='h-20 w-20 rounded-full bg-gray-200' />

      <div className='flex flex-1 flex-col gap-2'>
        <div className='flex items-end gap-2'>
          <div className='h-8 w-40 rounded bg-gray-200' />
        </div>
        <div className='h-6 w-10 rounded bg-gray-200' />
      </div>
    </div>

    <div className='h-24 w-full max-w-xl rounded-md bg-gray-100' />

    <div className='mb-2 flex w-full max-w-xl flex-wrap gap-2'>
      <div className='h-7 w-24 rounded-full bg-gray-200' />
      <div className='h-7 w-36 rounded-full bg-gray-200' />
      <div className='h-7 w-28 rounded-full bg-gray-200' />
    </div>
  </section>
);

export default ProfileHeaderSkeleton;
