import React from 'react';
import { Rating, Star } from '@smastrom/react-rating';
import Modal from '@/components/common/Modal/Modal';
import ModalCancel from '@/components/common/Modal/ModalCancel';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { ReviewTagLabels } from '@/constants/reviewLabels';
import { WrittenReviewsData } from '@/types/reviews';
import '@smastrom/react-rating/style.css';

interface WrittenReviewsModalProps {
  review: WrittenReviewsData['reviews'][number];
}

const WrittenReviewsModal = ({ review }: WrittenReviewsModalProps) => (
  <Modal>
    <ModalTrigger>
      <button className='rounded-[8px] bg-gray-900 px-2.5 py-1 text-13_M text-gray-25'>
        리뷰 보기
      </button>
    </ModalTrigger>
    <ModalContent className='flex w-[343px] flex-col rounded-2xl p-5'>
      <div className='flex flex-col gap-5'>
        <h1 className='text-center text-16_B'>작성한 리뷰</h1>

        <div className='flex flex-col gap-5'>
          <div className='flex items-center justify-center gap-1'>
            <div className='flex h-[30px] w-[30px] items-center justify-center'>
              <ProfileImage
                src={review.targetUserProfileImage}
                className='h-[18px] w-[18px]'
              />
            </div>
            <span className='text-14_B text-gray-950'>
              {review.targetUserName}
            </span>
          </div>

          {review.defaultTag.length > 0 && (
            <div className='flex flex-col gap-[14px]'>
              {review.defaultTag.map((tag) => (
                <span
                  key={tag}
                  className='flex w-full items-center rounded-[0px_16px_16px_16px] bg-[#f4f4f4] px-4 py-3 text-14_M leading-normal tracking-[-0.35px]'
                >
                  {ReviewTagLabels[tag]}
                </span>
              ))}
            </div>
          )}

          <div className='flex flex-col'>
            <span className='text-12_B text-gray-500'>별점</span>
            <div className='flex w-full justify-center'>
              <Rating
                style={{ maxWidth: 166 }}
                value={review.rating}
                itemStyles={{
                  itemShapes: Star,
                  activeFillColor: '#FFCB02',
                  inactiveFillColor: '#fbf1a9',
                }}
                readOnly
              />
            </div>
          </div>

          {review.content !== '' && (
            <div className='flex w-full items-center rounded-[6px] bg-[#f4f4f4] px-4 py-3'>
              <span className='text-14_M leading-normal tracking-[-0.35px]'>
                {review.content}
              </span>
            </div>
          )}
        </div>
      </div>

      <ModalCancel className='mt-[30px] flex w-full items-center justify-center rounded-12 border border-primary-red px-5 py-2.5 text-primary-red'>
        닫기
      </ModalCancel>
    </ModalContent>
  </Modal>
);
export default WrittenReviewsModal;
