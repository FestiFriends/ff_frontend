import { useQuery } from '@tanstack/react-query';
import { performancesApi } from '@/services/performancesService';

const FavoritePerformanceList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['favoritePerformances'],
    queryFn: () => performancesApi.getFavoritePerformances({ size: 20 }),
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <ul className='space-y-4'>
      {data?.data.map((performance) => (
        <li key={performance.id}>{performance.title}</li>
      ))}
    </ul>
  );
};

export default FavoritePerformanceList;
