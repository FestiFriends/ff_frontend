import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { PerformancesResponse } from '@/types/performance';
import MainPerformanceCard from './MainPerformanceCard';

interface PerformanceWrapperProps {
  title: string;
  href: string;
  performances: PerformancesResponse;
}

const PerformanceWrapper = ({
  title,
  href,
  performances,
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
        {performances.data?.map((performance) => (
          <CarouselItem
            key={performance.id}
            className='basis-[150px] p-0'
          >
            <MainPerformanceCard performance={performance} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  </div>
);

export default PerformanceWrapper;
