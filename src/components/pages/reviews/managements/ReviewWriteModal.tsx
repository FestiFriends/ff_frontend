'use client';
import React, { useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import {
  ButtonGroup,
  ButtonGroupItem,
} from '@/components/common/ButtonGroup/ButtonGroup';
import Modal from '@/components/common/Modal/Modal';
import ModalAction from '@/components/common/Modal/ModalAction';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import { ReviewTagLabels } from '@/constants/reviewLabels';
import { usePostWriteReview } from '@/hooks/reviewHooks/reviewHooks';
import { ReviewTag, ReviewTagType } from '@/types/enums';
import { PostReviewRequest, WritableReviewsData } from '@/types/reviews';

interface ReviewWriteModalProps {
  review: WritableReviewsData['reviews'][number];
  groupId: string;
}

const reviewTagKeys = Object.keys(ReviewTag) as ReviewTagType[];
type UpdateField = 'defaultTag' | 'rating' | 'content';

const ReviewWriteModal = ({ review, groupId }: ReviewWriteModalProps) => {
  const { mutateAsync } = usePostWriteReview();
  const [data, setData] = useState<PostReviewRequest>({
    groupId,
    targetUserId: review.targetUserId,
    defaultTag: [],
    rating: 0,
    content: '',
  });

  const handleSetData = (
    field: UpdateField,
    value: PostReviewRequest[UpdateField]
  ) => {
    setData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleReset = () => {
    setData((prev) => ({ ...prev, content: '', defaultTag: [], rating: 0 }));
  };

  const handleSubmit = async () => {
    await mutateAsync(data);
  };

  return (
    <Modal onClose={handleReset}>
      <ModalTrigger>리뷰 작성하기</ModalTrigger>

      <ModalContent className='w-4/5 p-4'>
        <div className='flex flex-col gap-2'>
          <Rating
            size={25}
            SVGstyle={{ display: 'inline' }}
            allowFraction
            onClick={(v) => handleSetData('rating', v)}
          />

          <ButtonGroup
            mode='multiple'
            value={data.defaultTag}
            onChange={(value) =>
              handleSetData('defaultTag', value as ReviewTagType[])
            }
          >
            <div className='flex flex-wrap gap-2'>
              {reviewTagKeys.map((tag) => (
                <ButtonGroupItem
                  key={tag}
                  value={tag}
                  className='rounded-full border px-2 py-1 text-12_M hover:bg-gray-100 data-[selected=true]:bg-gray-400 data-[selected=true]:text-white'
                >
                  {ReviewTagLabels[tag]}
                </ButtonGroupItem>
              ))}
            </div>
          </ButtonGroup>

          <textarea
            placeholder='한줄평'
            className='h-10'
            value={data.content}
            onChange={(e) => handleSetData('content', e.target.value)}
          />

          <div className='flex gap-2'>
            <ModalCancel
              className='w-full bg-gray-100'
              onClick={handleReset}
            >
              작성 취소
            </ModalCancel>
            <ModalAction
              className='w-full bg-black text-white disabled:bg-black/40'
              onClick={handleSubmit}
              disabled={data.defaultTag.length === 0 || data.rating === 0}
            >
              작성 완료
            </ModalAction>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ReviewWriteModal;
