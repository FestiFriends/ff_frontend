import { Star } from 'lucide-react';
import Button from '@/components/common/Button/Button';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { Gender } from '@/types/enums';
import { FullProfile } from '@/types/profiles';
import ProfileInfoBox from './ProfileInfoBox';

interface ProfileHeaderProps {
  profile: FullProfile;
  onEditClick?: () => void;
}

const ProfileHeader = ({ profile, onEditClick }: ProfileHeaderProps) => {
  const { description, sns, hashtag } = profile;
  const filteredTags = hashtag?.filter((tag) => tag.trim().length > 0) ?? [];

  return (
    <section className='flex flex-col items-center rounded-xl bg-white p-2 shadow'>
      <ProfileInfoBox
        name={profile.name}
        gender={profile.gender}
        age={profile.age}
        rating={profile.rating}
        reviewCount={profile.reviewCount}
        profileImage={profile.profileImage?.src}
        isMine={profile.isMine}
        onEditClick={onEditClick}
      />
      <p className='mt-3 w-full max-w-xl rounded-md border border-gray-200 bg-gray-50 p-4 text-sm whitespace-pre-wrap text-gray-700'>
        {description?.trim()
          || '이 사용자는 아직 자기소개를 작성하지 않았어요.'}
      </p>

      {sns?.trim() && (
        <div className='mt-2 w-full max-w-xl text-sm text-gray-800'>
          🔗{' '}
          <a
            href={`https://instagram.com/${sns}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            @{sns}
          </a>
        </div>
      )}

      <div className='mt-4 mb-2 flex w-full max-w-xl flex-wrap gap-2'>
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
