'use client';

import { useEffect, useRef } from 'react';
import { Rating, Star } from '@smastrom/react-rating';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { ReviewTagLabels } from '@/constants/reviewLabels';
import { ReviewTagType } from '@/types/enums';
import '@smastrom/react-rating/style.css';

interface ReviewViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserName: string;
  targetUserProfileImage: string;
  defaultTag: ReviewTagType[];
  content?: string;
  rating: number;
}

const ReviewViewModal = ({
  isOpen,
  onClose,
  targetUserName,
  targetUserProfileImage,
  defaultTag,
  content,
  rating,
}: ReviewViewModalProps) => {
  const hiddenButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) hiddenButtonRef.current?.click();
  }, [isOpen]);

  return (
    <Modal onClose={onClose}>
      <ModalTrigger>
        <button
          ref={hiddenButtonRef}
          style={{ display: 'none' }}
        />
      </ModalTrigger>

      {isOpen && (
        <ModalContent className='w-[343px] rounded-2xl bg-white p-5'>
          <h2 className='mb-4 text-center text-16_B text-black'>작성한 리뷰</h2>

          <div className='mb-4 flex items-center justify-center gap-2'>
            <ProfileImage
              src={targetUserProfileImage}
              size='sm'
            />
            <span className='text-14_B'>{targetUserName}</span>
          </div>

          <div className='mb-4 space-y-2'>
            {defaultTag.map((tag) => (
              <div
                key={tag}
                className='rounded bg-gray-50 px-4 py-2 text-14_M text-gray-950'
              >
                {ReviewTagLabels[tag]}
              </div>
            ))}

            {content && (
              <div className='rounded bg-gray-50 px-4 py-3 text-14_M text-gray-950'>
                {content}
              </div>
            )}
          </div>

          <div className='mb-6'>
            <p className='mb-[8px] text-12_B text-gray-500'>별점</p>
            <div className='flex justify-center'>
              <Rating
                value={rating}
                style={{ maxWidth: 140 }}
                readOnly
                itemStyles={{
                  itemShapes: Star,
                  activeFillColor: '#FFCB02',
                  inactiveFillColor: '#fbf1a9',
                }}
              />
            </div>
          </div>

          <Button
            variant='secondary'
            onClick={onClose}
            className='w-full border border-red-400 text-red-500'
          >
            닫기
          </Button>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ReviewViewModal;
