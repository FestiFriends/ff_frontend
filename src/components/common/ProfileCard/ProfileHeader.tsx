'use client';

import { useMutation } from '@tanstack/react-query';
import { useQueryClient } from '@tanstack/react-query';
import InstagramIcon from '@/components/icons/InstagramIcon';
import { usersApi } from '@/services/usersService';
import { FullProfile } from '@/types/profiles';
import StateNotice from '../StateNotice/StateNotice';
import ProfileHeaderTagList from './ProfileHeaderTagList';
import ProfileInfoBox from './ProfileInfoBox';
import ProfileNotFoundInfoBox from './ProfileNotFoundInfoBox';

interface ProfileHeaderProps {
  profile: FullProfile;
  onEditClick?: () => void;
}

const ProfileHeader = ({ profile, onEditClick }: ProfileHeaderProps) => {
  const { description, sns, hashtag, id: userId } = profile;

  const queryClient = useQueryClient();

  const { mutate: toggleLike, isPending } = useMutation({
    mutationFn: ({ isLiked, userId }: { isLiked: boolean; userId: string }) =>
      usersApi.updateLikeUser(userId, isLiked),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile', userId] });
    },
  });

  const handleLikeClick = () => {
    if (!isPending) {
      toggleLike({ isLiked: !profile.isLiked, userId });
    }
  };

  const filteredTags = hashtag?.filter((tag) => tag.trim().length > 0) ?? [];

  const isNotFound = profile.id === 'not-found';

  return (
    <section className='flex flex-col items-center'>
      <div className='mb-[10px] w-full max-w-xl'>
        {isNotFound ? (
          <ProfileNotFoundInfoBox />
        ) : (
          <ProfileInfoBox
            profile={profile}
            onEditClick={onEditClick}
            onLikeClick={handleLikeClick}
          />
        )}
      </div>
      {isNotFound ? (
        <StateNotice
          preset='notfound'
          message='탈퇴했거나 존재하지 않는 사용자입니다.'
        />
      ) : (
        <div className='w-full max-w-xl text-14_body_M whitespace-pre-wrap text-gray-950'>
          {description?.trim() || (
            <div className='text-gray-300'>
              이 사용자는 아직 자기소개를 작성하지 않았어요.
            </div>
          )}
        </div>
      )}

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
      <ProfileHeaderTagList tags={filteredTags} />
    </section>
  );
};

export default ProfileHeader;
