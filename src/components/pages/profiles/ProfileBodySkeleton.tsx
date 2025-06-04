const ProfileBodySkeleton = () => (
  <div className='w-full animate-pulse'>
    <div className='mt-4 grid w-full grid-cols-3 gap-4 rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm'>
      {[1, 2, 3].map((i) => (
        <div key={i}>
          <div className='mx-auto h-5 w-20 rounded bg-gray-200' />{' '}
          <div className='mx-auto mt-2 h-6 w-5 rounded bg-gray-300' />{' '}
        </div>
      ))}
    </div>

    <div className='mt-2 mb-4'>
      <div className='relative border-b border-gray-200'>
        <div className='flex justify-between'>
          {[1, 2].map((_, i) => (
            <div
              key={i}
              className='flex-1 py-2 text-center'
            >
              <div className='mx-auto mb-1 h-6 w-24 rounded bg-gray-300' />
            </div>
          ))}
        </div>

        <div className='absolute bottom-0 left-0 h-0.5 w-1/2 bg-gray-200' />
      </div>
    </div>

    <div className='mb-4 space-y-3'>
      <div className='h-40 w-full rounded-md bg-gray-100' />
    </div>
  </div>
);

export default ProfileBodySkeleton;
