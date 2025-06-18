'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Button from '@/components/common/Button/Button';
import GroupCard from '@/components/common/GroupCard/GroupCard';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { reviewsApi } from '@/services/reviewsService';
import { Gender } from '@/types/enums';
import ReviewWriteModal from './ReviewWriteModal';

const WritableReviewList = () => {
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<{
    groupId: string;
    targetUserId: string;
    targetUserName: string;
    targetUserProfileImage: string;
  } | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['writableReviews'],
    queryFn: () =>
      reviewsApi.getWritableReviews({ cursorId: undefined, size: 20 }),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>리뷰 작성 가능한 그룹을 불러오지 못했습니다.</div>;
  if (!data || data.data.length === 0)
    return <div>작성 가능한 리뷰가 없습니다.</div>;

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
            host: {
              hostId: '',
              name: '',
            },
            isHost: false,
          };

          return (
            <li key={group.groupId}>
              <GroupCard
                groupData={groupCardData}
                buttonText={isExpanded ? '접기' : '더보기'}
                onButtonClick={() =>
                  setExpandedGroupId(isExpanded ? null : group.groupId)
                }
              />

              {isExpanded && (
                <ul className='mt-2 flex flex-col gap-2 px-4'>
                  {group.reviews.map((member) => (
                    <li
                      key={member.targetUserId}
                      className='flex items-center justify-between py-[8px]'
                    >
                      <div className='flex items-center gap-[14px]'>
                        <ProfileImage
                          src={member.targetUserProfileImage}
                          size='sm'
                        />
                        <span className='text-14_B'>
                          {member.targetUserName}
                        </span>
                      </div>
                      <Button
                        size='sm'
                        className='h-[26px] rounded-[8px] border bg-white px-[10px] py-[5px] !text-13_M text-gray-800'
                        onClick={() =>
                          setSelectedUser({
                            groupId: group.groupId,
                            targetUserId: member.targetUserId,
                            targetUserName: member.targetUserName,
                            targetUserProfileImage:
                              member.targetUserProfileImage,
                          })
                        }
                      >
                        리뷰 작성
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
      {selectedUser && (
        <ReviewWriteModal
          groupId={selectedUser?.groupId ?? ''}
          targetUserId={selectedUser?.targetUserId ?? ''}
          targetUserName={selectedUser?.targetUserName ?? ''}
          targetUserProfileImage={selectedUser?.targetUserProfileImage ?? ''}
          isOpen={true}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </>
  );
};

export default WritableReviewList;
