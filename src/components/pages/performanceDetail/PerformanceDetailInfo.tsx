import React, { useMemo } from 'react';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Image as ImageType } from '@/types/image';
import { Performance } from '@/types/performance';
import { formatLocation } from '@/utils/formatLocation';

interface PerformanceDetailInfoProps {
  isPending: boolean;
  performanceDetail?: Performance;
}

type InfoItem = {
  label: string;
  value: React.ReactNode;
};

const PerformanceDetailInfo = ({
  isPending,
  performanceDetail,
}: PerformanceDetailInfoProps) => {
  const imageWidth = 500;
  const imageHeight = 700;

  const performanceInfoList: InfoItem[] = useMemo(() => {
    if (!performanceDetail) return [];

    return [
      {
        label: '지역',
        value:
          formatLocation(performanceDetail?.location).location || '정보 없음',
      },
      {
        label: '공연 시간',
        value:
          performanceDetail.time.length === 0 ? (
            '정보 없음'
          ) : (
            <div className='flex flex-col gap-1.5'>
              {performanceDetail.time.map((price: string) => (
                <p key={price}>{price}</p>
              ))}
            </div>
          ),
      },
      {
        label: '공연 런타임',
        value: performanceDetail?.runtime || '정보 없음',
      },
      { label: '관람 연령', value: performanceDetail.age || '정보 없음' },
      { label: '공연 상태', value: performanceDetail.state || '정보 없음' },
      {
        label: '티켓 가격',
        value:
          performanceDetail.price.length === 0 ? (
            '정보 없음'
          ) : (
            <div className='flex flex-col gap-1.5'>
              {performanceDetail.price.map((price: string) => (
                <p key={price}>{price}</p>
              ))}
            </div>
          ),
      },
      { label: '내한 여부', value: performanceDetail.visit || '정보 없음' },
      {
        label: '공연 제작진',
        value:
          performanceDetail.crew?.length === 0
            ? '정보 없음'
            : performanceDetail.crew?.join(', '),
      },
      {
        label: '주최',
        value:
          performanceDetail.host?.length === 0 ? (
            '정보 없음'
          ) : (
            <div className='flex flex-col gap-1.5'>
              {performanceDetail.host?.map((host: string) => (
                <p key={host}>{host}</p>
              ))}
            </div>
          ),
      },
      {
        label: '주관',
        value:
          performanceDetail.organizer?.length === 0 ? (
            '정보 없음'
          ) : (
            <div className='flex flex-col gap-1.5'>
              {performanceDetail.organizer?.map((organizer: string) => (
                <p key={organizer}>{organizer}</p>
              ))}
            </div>
          ),
      },
      {
        label: '제작사',
        value: (
          <div className='flex flex-col gap-1.5'>
            {performanceDetail.productionCompany?.map((company: string) => (
              <p key={company}>{company}</p>
            ))}
          </div>
        ),
      },
      {
        label: '기획사',
        value:
          performanceDetail.agency?.length === 0 ? (
            '정보 없음'
          ) : (
            <div className='flex flex-col gap-1.5'>
              {performanceDetail.agency?.map((agency: string) => (
                <span key={agency}>{agency}</span>
              ))}
            </div>
          ),
      },
    ];
  }, [performanceDetail]);

  if (isPending || !performanceDetail)
    return (
      <div className='flex flex-col items-center px-4 pt-2.5 pb-5'>
        <Skeleton className='h-[60vh] w-full' />
      </div>
    );

  return (
    <div className='flex flex-col gap-2.5 px-4 pt-2.5 pb-5'>
      {/* 공연 상세 정보 */}
      <div
        className='grid'
        style={{ gridTemplateColumns: 'max-content 1fr' }}
      >
        {performanceInfoList.map(({ label, value }, index) => (
          <React.Fragment key={label}>
            <span
              className={
                index === performanceInfoList.length - 1
                  ? 'py-3.5 pr-7.5 text-14_B leading-normal tracking-[-0.35px] whitespace-nowrap text-gray-400'
                  : 'border-b-1 border-gray-50 py-3.5 pr-5 text-14_B leading-normal tracking-[-0.35px] whitespace-nowrap text-gray-400'
              }
            >
              {label}
            </span>
            <span
              className={
                index === performanceInfoList.length - 1
                  ? 'py-3.5 text-14_M leading-normal tracking-[-0.35px] text-gray-800'
                  : 'border-b-1 border-gray-50 py-3.5 text-14_M leading-normal tracking-[-0.35px] text-gray-800'
              }
            >
              {value}
            </span>
          </React.Fragment>
        ))}
      </div>

      {/* 공연 소개 이미지 */}
      <div className='flex flex-col items-center'>
        {performanceDetail.images?.map((image: ImageType) => (
          <div
            key={image.id}
            className='relative'
          >
            <Image
              src={image.src}
              alt={image.alt || ''}
              width={imageWidth}
              height={imageHeight}
              sizes={`${imageWidth}px`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceDetailInfo;
