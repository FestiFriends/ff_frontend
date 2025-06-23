'use client';
import { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const BANNER_INFO: { id: string; src: string; alt: string; href: string }[] = [
  {
    id: '1',
    src: '/banner.png',
    alt: 'FestiFriends main banner',
    href: '/performances',
  },
  {
    id: '2',
    src: '/banner.png',
    alt: 'FestiFriends main banner',
    href: '/performances',
  },
];

interface MainBannerPaginationProps {
  totalPage: number;
  currentPage: number;
  className?: string;
}

const MainBannerPagination = ({
  totalPage,
  currentPage,
  className,
}: MainBannerPaginationProps) => (
  <div className={cn('flex w-fit gap-2', className)}>
    {Array.from({ length: totalPage }).map((_, idx) => (
      <span
        key={idx}
        className={cn(
          'h-1.5 w-1.5 rounded-full border border-black/10 bg-white transition-all duration-200',
          currentPage === idx && 'bg-white/50'
        )}
      />
    ))}
  </div>
);

const MainBanner = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className='bg-white px-4 pt-5 pb-[30px]'>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        setApi={setApi}
        plugins={[
          Autoplay({
            delay: 4000,
            stopOnInteraction: false,
          }),
        ]}
        className='w-full'
      >
        <CarouselContent className='m-0'>
          {BANNER_INFO.map((item) => (
            <CarouselItem
              key={item.id}
              className='mr-3 h-full w-full overflow-hidden rounded-[8px] p-0'
            >
              <Link href={item.href}>
                <Image
                  priority
                  src={item.src}
                  alt={item.alt}
                  width={750}
                  height={375}
                  className='h-full'
                />
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <MainBannerPagination
          className='absolute bottom-3 left-1/2 z-10 -translate-x-1/2'
          totalPage={count}
          currentPage={current}
        />
      </Carousel>
    </div>
  );
};
export default MainBanner;
