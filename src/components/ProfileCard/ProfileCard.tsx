import ProfileCardUi from './ProfileCardUi';
import ProfileCardSkeleton from './ProfileCardSkeleton';
import { ProfileData } from '@/types/profile';

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
