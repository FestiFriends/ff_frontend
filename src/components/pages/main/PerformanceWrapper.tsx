import Link from 'next/link';
import PerformanceCard from '@/components/common/PerformanceCard';
// import MainPerformanceCard from './MainPerformanceCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { ApiResponse } from '@/types/api';
import { PerformancesResponse } from '@/types/performance';

interface PerformanceWrapperProps {
  title: string;
  href: string;
  isPending: boolean;
  isError: boolean;
  error: ApiResponse | null;
  performances?: PerformancesResponse;
}

const PerformanceWrapper = ({
  title,
  href,
  isPending,
  isError,
  error,
  performances,
}: PerformanceWrapperProps) => {
  let content;

  if (isPending) {
    content = Array.from({ length: 5 }).map((_, index) => (
      <CarouselItem
        key={index}
        className='basis-[150px] p-0'
      >
        <div className='flex w-[150px] flex-col gap-3'>
          <Skeleton className='h-[200px] w-[150px] rounded-[12px]' />
          <div className='flex flex-col gap-2'>
            <Skeleton className='h-[19px] w-[150px]' />
            <Skeleton className='h-[17px] w-[150px]' />
          </div>
        </div>
      </CarouselItem>
    ));
  }

  if (isError) {
    content = <p>{error?.message}</p>;
  }

  if (performances?.data?.length === 0) {
    content = <p>데이터가 존재하지 않습니다.</p>;
  }

  if (performances?.data && performances.data.length > 0) {
    content = performances.data.map((performance, idx) => (
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

  return (
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
        <CarouselContent className='z-10 m-0 gap-5'>{content}</CarouselContent>
      </Carousel>
    </div>
  );
};

export default PerformanceWrapper;
