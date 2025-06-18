import InstagramIcon from '@/components/icons/InstagramIcon';
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
    <section className='flex flex-col items-center'>
      <div className='mb-[10px] w-full max-w-xl'>
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
      </div>
      <p className='w-full max-w-xl text-14_body_M whitespace-pre-wrap text-gray-950'>
        {description?.trim()
          || '이 사용자는 아직 자기소개를 작성하지 않았어요.'}
      </p>

      {sns?.trim() && (
        <div className='mt-2 w-full max-w-xl text-14_M text-gray-950'>
          <a
            href={`https://instagram.com/${sns}`}
            target='_blank'
            rel='noopener noreferrer'
          >
            <InstagramIcon className='inline-flex' /> <span>@{sns}</span>
          </a>
        </div>
      )}

      <div className='mt-[14px] flex w-full max-w-xl flex-wrap gap-[6px]'>
        {filteredTags.map((tag, i) => (
          <span
            key={i}
            className='rounded-full bg-gray-25 px-[10px] py-[9px] text-12_M text-gray-700'
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
};
export default ProfileHeader;
