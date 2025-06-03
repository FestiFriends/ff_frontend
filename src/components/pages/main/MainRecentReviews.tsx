import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { nextFetcher } from '@/lib/nextFetcher';
import { ReviewTag } from '@/types/enums';
import { RecentReviewsResponse } from '@/types/reviews';
import MainReviewCard from './MainReviewCard';

const MainRecentReviews = async () => {
  const recentReviews = await nextFetcher<RecentReviewsResponse>(
    '/api/v1/performances/recent-reviews',
    { method: 'GET', revalidate: 21600 }
  );

  return (
    <section className='flex flex-col gap-2.5 px-4 py-5'>
      <h2 className='flex h-[19px] w-fit items-center to-gray-950 text-16_B'>
        실제 모임 후기
      </h2>

      <Carousel
        opts={{
          align: 'start',
        }}
        className='w-full'
      >
        <CarouselContent className='m-0 gap-5'>
          {recentReviews.data?.map((group) =>
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
                    ?? review.defaultTag.map((tag) => ReviewTag[tag]).join(', ')
                  }
                  imgSrc={group.performance.poster}
                />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>
    </section>
  );
};
export default MainRecentReviews;
