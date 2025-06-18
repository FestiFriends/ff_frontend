import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/services/usersService';

const FavoriteUserList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['favoriteUsers'],
    queryFn: () => usersApi.getFavoriteUsers({ size: 20 }),
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <ul className='space-y-4'>
      {data?.data.map((user) => <li key={user.id}>{user.name}</li>)}
    </ul>
  );
};

export default FavoriteUserList;
