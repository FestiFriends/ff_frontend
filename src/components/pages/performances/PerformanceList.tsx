import { PerformanceCard } from '@/components/pages/performances';
import { Performance } from '@/types/performance';

interface Props {
  performances: Performance[];
}

const PerformanceList = ({ performances }: Props) => {
  const foo = 'bar';
  console.log('foo', foo);

  return (
    <>
      <div className='mx-auto grid w-fit grid-cols-2 gap-6'>
        {performances.map((performance) => (
          <PerformanceCard
            performance={performance}
            key={performance.id}
          />
        ))}
      </div>
    </>
  );
};

export default PerformanceList;
