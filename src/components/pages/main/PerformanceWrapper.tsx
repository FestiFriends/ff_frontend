import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { PerformancesResponse } from '@/types/performance';
import MainPerformanceCard from './MainPerformanceCard';

interface PerformanceWrapperProps {
  title: string;
  href: string;
  isPending: boolean;
  performances?: PerformancesResponse;
}

const PerformanceWrapper = ({
  title,
  href,
  isPending,
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

  if (performances) {
    content = performances.data?.map((performance, idx) => (
      <CarouselItem
        key={performance.id}
        className='basis-[150px] p-0'
      >
        <MainPerformanceCard
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
