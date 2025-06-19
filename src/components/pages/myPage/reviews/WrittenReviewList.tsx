'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/common/Button/Button';
import GroupCard from '@/components/common/GroupCard/GroupCard';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { reviewsApi } from '@/services/reviewsService';
import { Gender } from '@/types/enums';
import { SelectedWrittenReview } from '@/types/reviews';
import ReviewViewModal from './ReviewViewModal';

const WrittenReviewList = () => {
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [selectedReview, setSelectedReview] =
    useState<SelectedWrittenReview | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['writtenReviews'],
    queryFn: () =>
      reviewsApi.getWrittenReviews({ cursorId: undefined, size: 20 }),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>리뷰 데이터를 불러오지 못했습니다.</div>;
  if (!data || data.data.length === 0)
    return <div>작성한 리뷰가 없습니다.</div>;

  return (
    <>
      <ul className='flex flex-col gap-4'>
        {data.data.map((group) => {
          const isExpanded = expandedGroupId === group.groupId;

          const groupCardData = {
            id: group.groupId,
            title: group.groupTitle,
            category: group.category,
            startDate: group.groupStartDate,
            endDate: group.groupEndDate,
            performance: group.performance,
            gender: Gender.ALL,
            startAge: 0,
            endAge: 99,
            location: '지역 미표시',
            memberCount: group.memberCount,
            maxMembers: group.memberCount,
            host: { hostId: '', name: '' },
            isHost: false,
          };

          return (
            <li key={group.groupId}>
              <GroupCard
                groupData={groupCardData}
                buttonText={isExpanded ? '닫기' : '더보기'}
                onButtonClick={() =>
                  setExpandedGroupId(isExpanded ? null : group.groupId)
                }
              />

              {isExpanded && (
                <ul className='mt-2 flex flex-col gap-2 px-4'>
                  {group.reviews.map((review) => (
                    <li
                      key={review.reviewId}
                      className='flex items-center justify-between py-[8px]'
                    >
                      <div className='flex items-center gap-[14px]'>
                        <ProfileImage
                          src={review.targetUserProfileImage}
                          size='sm'
                        />
                        <span className='text-14_B'>
                          {review.targetUserName}
                        </span>
                      </div>
                      <Button
                        size='sm'
                        className='h-[26px] rounded-[8px] border bg-black px-[10px] py-[5px] !text-13_M text-white'
                        onClick={() =>
                          setSelectedReview({
                            groupId: group.groupId,
                            targetUserId: review.targetUserId,
                            targetUserName: review.targetUserName,
                            targetUserProfileImage:
                              review.targetUserProfileImage,
                            defaultTag: review.defaultTag,
                            content: review.content,
                            rating: review.rating,
                          })
                        }
                      >
                        리뷰 보기
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      {selectedReview && (
        <ReviewViewModal
          isOpen={true}
          onClose={() => setSelectedReview(null)}
          targetUserName={selectedReview.targetUserName}
          targetUserProfileImage={selectedReview.targetUserProfileImage}
          defaultTag={selectedReview.defaultTag}
          content={selectedReview.content}
          rating={selectedReview.rating}
        />
      )}
    </>
  );
};

export default WrittenReviewList;
