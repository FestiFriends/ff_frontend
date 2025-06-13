import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { UseSuspenseQueryOptions } from '@tanstack/react-query';
import Link from 'next/link';
import PerformanceCard from '@/components/common/PerformanceCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PerformancesResponse } from '@/types/performance';
import MainPerformanceSkeletonCard from './MainPerformanceSkeletonCard';

interface PerformanceWrapperProps {
  title: string;
  href: string;
  queryOptions: UseSuspenseQueryOptions<PerformancesResponse>;
}

const PerformanceWrapper = ({
  title,
  href,
  queryOptions,
}: PerformanceWrapperProps) => (
  <div className='flex flex-col gap-5 bg-white px-4 pt-5 pb-[30px]'>
    <div className='flex items-center justify-between'>
      <h2 className='flex h-[19px] items-center text-16_B text-gray-950'>
        {title}
      </h2>
      <Link
        href={href}
        className='flex h-[17px] items-center text-14_M text-gray-500 underline'
      >
        더보기
      </Link>
    </div>

    <Carousel
      opts={{
        align: 'start',
      }}
      className='w-full'
    >
      <CarouselContent className='z-10 m-0 gap-5'>
        <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
          <Suspense fallback={<MainPerformanceSkeletonCard />}>
            <SuspenseQuery {...queryOptions}>
              {({ data }) => {
                if (data.data?.length === 0) {
                  return <p>데이터가 존재하지 않습니다.</p>;
                } else {
                  return data.data?.map((performance, idx) => (
                    <CarouselItem
                      key={performance.id}
                      className='basis-[150px] p-0'
                    >
                      <PerformanceCard
                        ranking={idx + 1}
                        performance={performance}
                      />
                    </CarouselItem>
                  ));
                }
              }}
            </SuspenseQuery>
          </Suspense>
        </ErrorBoundary>
      </CarouselContent>
    </Carousel>
  </div>
);
export default PerformanceWrapper;
