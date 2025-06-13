import { Star } from 'lucide-react';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';

const ProfileNotFoundHeader = () => (
  <section className='flex flex-col items-center rounded-xl bg-white p-2 shadow'>
    <div className='relative w-full max-w-xl'>
      <div className='flex flex-row items-end gap-4'>
        <ProfileImage size='lg' />

        <div>
          <div className='flex items-end gap-1'>
            <h2 className='text-2xl font-bold text-gray-400'>알 수 없음</h2>
            <span className='mb-1 text-sm text-gray-400'>?</span>
          </div>

          <div className='mt-1 flex min-h-[1.5rem] items-center gap-2 text-gray-400'>
            <Star
              className='h-4 w-4'
              fill='currentColor'
            />
            <span className='font-bold'>4.04</span>
          </div>
        </div>
      </div>
    </div>

    <p className='mt-3 w-full max-w-xl rounded-md border border-gray-200 bg-gray-50 p-4 text-sm whitespace-pre-wrap text-gray-500'>
      주소가 잘못되었거나, 탈퇴한 사용자일 수 있어요.
    </p>

    <div className='mt-4 mb-2 flex w-full max-w-xl flex-wrap gap-2'>
      <span className='rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500'>
        NOT FOUND
      </span>
    </div>
  </section>
);

export default ProfileNotFoundHeader;
