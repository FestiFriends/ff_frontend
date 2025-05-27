import { Star } from 'lucide-react';

interface ProfileCardSkeletonProps {
  error?: string;
}

const ProfileCardSkeleton = ({ error }: ProfileCardSkeletonProps) => {
  const isError = !!error;

  return (
    <div className='w-full max-w-md rounded-lg bg-gray-200 p-4'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-4'>
          <div className='h-16 w-16 animate-pulse rounded-full bg-gray-300' />

          <div className='flex items-end gap-3'>
            <div className='flex items-center text-lg font-bold text-gray-500'>
              {isError ? (
                '알 수 없음'
              ) : (
                <div className='h-7 w-50 animate-pulse rounded bg-gray-300' />
              )}
              {isError && (
                <span className='ml-1 text-sm text-gray-400'>'?'</span>
              )}
            </div>
            {isError && (
              <div className='flex items-center gap-1'>
                <Star
                  className='h-4 w-4 text-yellow-500'
                  fill='currentColor'
                />
                <span className='text-black'>'4.04'</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className='mt-2 rounded bg-white p-3 text-sm text-black'>
        {isError ? (
          <span className='text-red-500'>{error}</span>
        ) : (
          <div className='h-12 animate-pulse rounded bg-gray-200' />
        )}
      </div>

      <div className='mt-3 flex flex-wrap gap-2'>
        {isError ? (
          <span className='rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-400'>
            NOT FOUND
          </span>
        ) : (
          <>
            <div className='h-7 w-32 animate-pulse rounded-full bg-gray-300' />
            <div className='h-7 w-24 animate-pulse rounded-full bg-gray-300' />
            <div className='h-7 w-36 animate-pulse rounded-full bg-gray-300' />
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileCardSkeleton;
