import { Star } from 'lucide-react';
import Button from '@/components/Button/Button';
import ProfileImage from '@/components/ProfileImage/ProfileImage';
import { Gender } from '@/types/enums';
import { FullProfile } from '@/types/profiles';

interface ProfileHeaderProps {
  profile: FullProfile;
  onEditClick?: () => void;
}

const ProfileHeader = ({ profile, onEditClick }: ProfileHeaderProps) => {
  console.log('[ProfileHeader] 렌더링됨! 받은 profile:', profile);
  const {
    name,
    gender,
    profileImage,
    rating,
    description,
    sns,
    hashtag,
    isMine,
  } = profile;
  const filteredTags = hashtag?.filter((tag) => tag.trim().length > 0) ?? [];

  return (
    <section className='flex flex-col items-center bg-white p-6 shadow'>
      <div className='relative w-full max-w-xl'>
        {isMine && (
          <Button
            size='sm'
            className='absolute top-0 right-0 rounded-md bg-blue-500 px-4 py-2 text-sm text-white'
            onClick={onEditClick}
          >
            프로필 수정
          </Button>
        )}

        <div className='flex flex-row items-end gap-4'>
          <ProfileImage
            src={profileImage?.src}
            size='lg'
          />
          <div>
            <div className='flex items-end gap-1'>
              <h2 className='text-2xl font-bold'>{name}</h2>
              {gender === Gender.MALE && (
                <span className='mb-1 text-sm text-blue-500'>♂</span>
              )}
              {gender === Gender.FEMALE && (
                <span className='mb-1 text-sm text-pink-500'>♀</span>
              )}
            </div>

            <div className='mt-1 flex items-center gap-2 text-gray-700'>
              <Star
                className='h-4 w-4 text-yellow-500'
                fill='currentColor'
              />
              <span className='font-bold text-yellow-500'>
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <p className='mt-3 w-full max-w-xl rounded-md border border-gray-200 bg-gray-50 p-4 text-sm whitespace-pre-wrap text-gray-700'>
        {description?.trim()
          || '이 사용자는 아직 자기소개를 작성하지 않았어요.'}
      </p>

      {sns?.trim() && (
        <div className='mt-2 w-full max-w-xl text-sm text-gray-800'>
          🔗{' '}
          <a
            href={sns}
            target='_blank'
            rel='noopener noreferrer'
          >
            {sns}
          </a>
        </div>
      )}

      <div className='mt-4 flex w-full max-w-xl flex-wrap gap-2'>
        {filteredTags.map((tag, i) => (
          <span
            key={i}
            className='rounded-full bg-gray-100 px-3 py-1 text-sm'
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};
export default ProfileHeader;
