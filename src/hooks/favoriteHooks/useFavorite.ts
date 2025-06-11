import { useQuery } from '@tanstack/react-query';
import { performancesApi } from '@/services/performancesService';
import { usersApi } from '@/services/usersService';
import { FavoriteUsersResponse } from '@/services/usersService';
import { PerformancesResponse } from '@/types/performance';

export const useFavorite = () => {
  const {
    data: favoritePerformancesResponse,
    isLoading: isPerformancesLoading,
  } = useQuery<PerformancesResponse>({
    queryKey: ['favoritePerformances'],
    queryFn: performancesApi.getFavoritePerformances,
  });

  const { data: favoriteUsersResponse, isLoading: isUsersLoading } =
    useQuery<FavoriteUsersResponse>({
      queryKey: ['favoriteUsers'],
      queryFn: () => usersApi.getFavoriteUsers().then((res) => res.data),
    });

  const favoriteUsers = favoriteUsersResponse?.data || [];

  return {
    favoritePerformances: favoritePerformancesResponse?.data || [],
    favoriteUsers,
    isLoading: isPerformancesLoading || isUsersLoading,
  };
};
