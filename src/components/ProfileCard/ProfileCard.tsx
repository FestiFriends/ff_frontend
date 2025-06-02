import { ProfileData } from '@/types/profile';
import ProfileCardSkeleton from './ProfileCardSkeleton';
import ProfileCardUi from './ProfileCardUi';

interface ProfileCardProps {
  profile?: ProfileData;
  isLoading?: boolean;
  error?: string;
  onEditClick?: () => void;
}

const ProfileCard = ({
  profile,
  isLoading,
  error,
  onEditClick,
}: ProfileCardProps) => {
  if (isLoading) return <ProfileCardSkeleton />;
  if (error || !profile)
    return <ProfileCardSkeleton error={error ?? '존재하지 않는 유저입니다.'} />;
  return (
    <ProfileCardUi
      {...profile}
      onEditClick={onEditClick}
    />
  );
};

export default ProfileCard;
