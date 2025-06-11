import { useQuery } from '@tanstack/react-query';
import { performancesApi } from '@/services/performancesService';
import { usersApi } from '@/services/usersService';

export const useFavoritePerformances = (cursorId?: string) =>
  useQuery({
    queryKey: ['favoritePerformances', cursorId],
    queryFn: () => performancesApi.getFavoritePerformances(cursorId),
  });

export const useFavoriteUsers = (cursorId?: string) =>
  useQuery({
    queryKey: ['favoriteUsers', cursorId],
    queryFn: () => usersApi.getFavoriteUsers(cursorId),
  });
