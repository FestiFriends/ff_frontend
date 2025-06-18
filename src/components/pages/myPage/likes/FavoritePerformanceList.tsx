import { useQuery } from '@tanstack/react-query';
import PerformanceCard from '@/components/common/PerformanceCard';
import { performancesApi } from '@/services/performancesService';

const FavoritePerformanceList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['favoritePerformances'],
    queryFn: () => performancesApi.getFavoritePerformances({ size: 20 }),
  });

  if (isLoading) return <div>로딩 중...</div>;

  return (
    <ul className='grid grid-cols-2 gap-4'>
      {data?.data.map((performance, i) => (
        <li key={performance.id}>
          <PerformanceCard
            performance={performance}
            ranking={i + 1}
          />
        </li>
      ))}
    </ul>
  );
};

export default FavoritePerformanceList;
