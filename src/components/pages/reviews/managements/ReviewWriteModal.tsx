'use client';
import React, { useRef, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { ButtonGroup, ButtonGroupItem } from '@/components/common/ButtonGroup';
import LoadingOverlay from '@/components/common/LoadingOverlay/LoadingOverlay';
import {
  Modal,
  ModalAction,
  ModalCancel,
  ModalContent,
  ModalTrigger,
} from '@/components/common/Modal';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import CheckBoxIcon from '@/components/icons/CheckboxIcon';
import { ReviewTagLabels } from '@/constants/reviewLabels';
import { usePostWriteReview } from '@/hooks/reviewHooks/reviewHooks';
import { cn } from '@/lib/utils';
import { ReviewTag, ReviewTagType } from '@/types/enums';
import { PostReviewRequest, WritableReviewsData } from '@/types/reviews';

interface ReviewWriteModalProps {
  review: WritableReviewsData['reviews'][number];
  groupId: string;
}

const reviewTagKeys = Object.keys(ReviewTag) as ReviewTagType[];
type UpdateField = 'defaultTag' | 'rating' | 'content';

const ReviewWriteModal = ({ review, groupId }: ReviewWriteModalProps) => {
  const [otherCheck, setOtherCheck] = useState(false);
  const { mutateAsync, isPending } = usePostWriteReview();
  const [data, setData] = useState<PostReviewRequest>({
    groupId,
    targetUserId: review.targetUserId,
    defaultTag: [],
    rating: 0,
    content: '',
  });
  const ref = useRef<HTMLDivElement | null>(null);

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
    setOtherCheck(false);
  };

  const handleSubmit = async () => {
    if (!isPending) await mutateAsync(data);
  };

  const handleOther = () => {
    if (otherCheck) {
      setOtherCheck(false);
      handleSetData('content', '');
    } else {
      setOtherCheck(true);
    }
  };

  return (
    <>
      <Modal
        onClose={handleReset}
        disableBackdropClose
      >
        <ModalTrigger>
          <button className='h-[26px] rounded-[8px] bg-white px-2.5'>
            <span className='flex items-center justify-center text-13_M text-gray-800'>
              리뷰 작성
            </span>
          </button>
        </ModalTrigger>
        <ModalContent
          className='w-4/5 rounded-2xl p-5'
          ref={ref}
        >
          <div className='flex flex-col gap-5'>
            <h1 className='flex h-[19px] items-center justify-center text-16_B'>
              리뷰 작성
            </h1>

            <div className='flex flex-col gap-2'>
              <span className='flex h-[14px] items-center text-12_B text-gray-500'>
                최소 1개, 중복 선택 가능
              </span>

              <ButtonGroup
                mode='multiple'
                value={data.defaultTag}
                onChange={(value) =>
                  handleSetData('defaultTag', value as ReviewTagType[])
                }
              >
                <div className='flex flex-col gap-1'>
                  {reviewTagKeys.map((tag) => (
                    <ButtonGroupItem
                      key={tag}
                      value={tag}
                      className='flex h-10 w-full items-center justify-start gap-2.5'
                    >
                      {(selected) => (
                        <>
                          <CheckBoxIcon
                            type={selected ? 'active' : 'normal'}
                            className={cn(selected && 'text-primary-red')}
                          />
                          <span className='text-12_M'>
                            {ReviewTagLabels[tag]}
                          </span>
                        </>
                      )}
                    </ButtonGroupItem>
                  ))}

                  <button onClick={handleOther}>
                    {
                      <div className='flex flex-col gap-1'>
                        <div className='flex h-10 w-full items-center justify-start gap-2.5'>
                          <CheckBoxIcon
                            type={otherCheck ? 'active' : 'normal'}
                            className={cn(otherCheck && 'text-primary-red')}
                          />
                          <span className='text-12_M'>기타</span>
                        </div>
                      </div>
                    }
                  </button>
                  {otherCheck && (
                    <TextareaInput
                      maxLength={200}
                      placeholder='리뷰 내용을 입력해주세요.'
                      className='h-[190px] rounded-2xl border border-gray-100 px-5 py-4'
                      value={data.content || ''}
                      onChange={(value) => handleSetData('content', value)}
                    />
                  )}
                </div>
              </ButtonGroup>
            </div>

            <div className='flex flex-col'>
              <span className='flex h-[14px] items-center text-12_B text-gray-500'>
                별점
              </span>

              <div className='flex justify-center'>
                <Rating
                  size={30}
                  SVGstyle={{ display: 'inline' }}
                  allowFraction
                  onClick={(v) => handleSetData('rating', v)}
                />
              </div>
            </div>

            <div className='flex gap-2'>
              <ModalCancel
                className='flex h-12 w-full items-center justify-center rounded-12 border border-primary-red'
                onClick={handleReset}
                disabled={isPending}
              >
                <span className='text-14_M text-primary-red'>취소</span>
              </ModalCancel>
              <ModalAction
                className='flex h-12 w-full items-center justify-center rounded-12 bg-primary-red disabled:cursor-no-drop disabled:opacity-70'
                onClick={handleSubmit}
                disabled={
                  (data.defaultTag.length === 0 && data.content?.length === 0)
                  || data.rating === 0
                  || isPending
                }
              >
                <span className='text-14_M text-white'>완료</span>
              </ModalAction>
            </div>
          </div>
          {isPending && (
            <LoadingOverlay
              style={{
                height: ref.current?.scrollHeight
                  ? ref.current.scrollHeight + 40
                  : '100%',
              }}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReviewWriteModal;
