import { useQuery } from '@tanstack/react-query';
import ProfileCard from '@/components/common/ProfileCard/ProfileCard';
import { usersApi } from '@/services/usersService';

const FavoriteUserList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['favoriteUsers'],
    queryFn: () => usersApi.getFavoriteUsers({ size: 20 }),
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <ul className='flex flex-col gap-4'>
      {data?.data.map((user) => (
        <li key={user.id}>
          <ProfileCard profile={{ ...user, isMyProfile: false }} />
        </li>
      ))}
    </ul>
  );
};

export default FavoriteUserList;
