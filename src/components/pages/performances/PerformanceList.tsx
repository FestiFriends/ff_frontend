'use client';

import { PerformanceCard } from '@/components/common';
import { Performance } from '@/types/performance';

interface Props {
  performances: Performance[];
}

const PerformanceList = ({ performances }: Props) => (
  <>
    <div className='mx-auto grid grid-cols-2 gap-6'>
      {performances.map((performance) => (
        <PerformanceCard
          performance={performance}
          key={performance.id}
          size='auto'
        />
      ))}
    </div>
  </>
);

export default PerformanceList;
