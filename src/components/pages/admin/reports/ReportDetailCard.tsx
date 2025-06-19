'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { ButtonGroup, ButtonGroupItem } from '@/components/common';
import CheckBoxIcon from '@/components/icons/CheckboxIcon';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import {
  ReportReasonLabels,
  ReportTargetLabels,
} from '@/constants/reportLabels';
import { cn } from '@/lib/utils';
import { Report, ReportAction } from '@/types/report';

interface CarouselPaginationProps {
  totalPage: number;
  currentPage: number;
  className?: string;
}

const CarouselPagination = ({
  totalPage,
  currentPage,
  className,
}: CarouselPaginationProps) => (
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

interface ReportDetailCardProps {
  report: Report;
  onStatus: (action: ReportAction['reportStatus']) => void;
}

const ReportDetailCard = ({ report, onStatus }: ReportDetailCardProps) => {
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
    <div className='flex flex-col gap-2'>
      <Carousel setApi={setApi}>
        <CarouselContent className='m-0'>
          {report.snapshots?.map((img) => (
            <CarouselItem
              key={img.id}
              className='relative h-64 w-64'
            >
              <Image
                src={img.src}
                alt={img.alt || '신고 이미지'}
                className='object-contain'
                width={256}
                height={256}
                sizes='256px'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPagination
          className='absolute bottom-3 left-1/2 z-10 -translate-x-1/2'
          totalPage={count}
          currentPage={current}
        />
      </Carousel>

      <div className='flex flex-col gap-1'>
        <div className='flex gap-3 text-12_B'>
          <span className='rounded-full bg-blue-200 p-2'>
            {ReportTargetLabels[report.category]}
          </span>
          <span className='rounded-full bg-yellow-200 p-2'>
            {ReportReasonLabels[report.reason]}
          </span>
        </div>
        <p className='text-16_body_M'>{report.details}</p>
      </div>

      <div className='flex gap-2'>
        <ButtonGroup
          mode='single'
          onChange={(value) => onStatus(value as ReportAction['reportStatus'])}
        >
          <ButtonGroupItem
            value='REJECTED'
            className='flex h-10 w-full items-center justify-center gap-2.5'
          >
            {(selected) => (
              <>
                <CheckBoxIcon
                  type={selected ? 'active' : 'normal'}
                  className={cn(selected && 'text-primary-red')}
                />
                <span className='text-12_M'>반려</span>
              </>
            )}
          </ButtonGroupItem>
          <ButtonGroupItem
            value='APPROVED'
            className='flex h-10 w-full items-center justify-center gap-2.5'
          >
            {(selected) => (
              <>
                <CheckBoxIcon
                  type={selected ? 'active' : 'normal'}
                  className={cn(selected && 'text-primary-red')}
                />
                <span className='text-12_M'>승인</span>
              </>
            )}
          </ButtonGroupItem>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default ReportDetailCard;
