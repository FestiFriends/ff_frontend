import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ReviewTagLabels } from '@/constants/reviewLabels';
import { nextFetcher } from '@/lib/nextFetcher';
import { RecentReviewsResponse } from '@/types/reviews';
import MainReviewCard from './MainReviewCard';

const MainRecentReviews = async () => {
  let content;

  try {
    const recentReviews = await nextFetcher<RecentReviewsResponse>(
      '/api/v1/performances/recent-reviews',
      { method: 'GET', revalidate: 21600 }
    );

    if (!recentReviews.data || recentReviews.data.length === 0) {
      content = <p>데이터가 존재하지 않습니다.</p>;
    }

    if (recentReviews.data && recentReviews.data.length > 0) {
      content = recentReviews.data?.map((group) =>
        group.reviews.map((review) => (
          <CarouselItem
            key={review.reviewId}
            className='basis-[233px] p-0'
          >
            <MainReviewCard
              groupTitle={group.groupTitle}
              nickname={'blur'}
              ratings={review.rating}
              content={
                review.content
                ?? review.defaultTag
                  .map((tag) => ReviewTagLabels[tag])
                  .join(', ')
              }
              imgSrc={group.performance.poster}
            />
          </CarouselItem>
        ))
      );
    }
  } catch (error) {
    let errorMessage;

    if (typeof error === 'object' && error !== null && 'message' in error) {
      errorMessage = error.message as string;
    } else {
      errorMessage = '알 수 없는 에러가 발생했습니다.';
    }

    content = <p>{errorMessage}</p>;
  }

  return (
    <section className='flex flex-col gap-2.5 bg-white px-4 py-5'>
      <h2 className='flex h-[19px] w-fit items-center to-gray-950 text-16_B'>
        실제 모임 후기
      </h2>

      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent className='m-0 gap-5'>{content}</CarouselContent>
      </Carousel>
    </section>
  );
};
export default MainRecentReviews;
