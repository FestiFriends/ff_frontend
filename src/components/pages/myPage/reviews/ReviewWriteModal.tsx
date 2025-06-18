'use client';

import { useEffect, useRef, useState } from 'react';
import { Rating, Star } from '@smastrom/react-rating';
import { useMutation } from '@tanstack/react-query';
import Button from '@/components/common/Button/Button';
import Modal from '@/components/common/Modal/Modal';
import ModalContent from '@/components/common/Modal/ModalContent';
import ModalTrigger from '@/components/common/Modal/ModalTrigger';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import { ReviewTagLabels } from '@/constants/reviewLabels';
import { reviewsApi } from '@/services/reviewsService';
import { ReviewTag, ReviewTagType } from '@/types/enums';
import { PostReviewRequest } from '@/types/reviews';
import '@smastrom/react-rating/style.css';

interface ReviewWriteModalProps {
  groupId: string;
  targetUserId: string;
  targetUserName: string;
  targetUserProfileImage: string;
  isOpen: boolean;
  onClose: () => void;
}

const ReviewWriteModal = ({
  isOpen,
  onClose,
  groupId,
  targetUserId,
  targetUserName,
  targetUserProfileImage,
}: ReviewWriteModalProps) => {
  const [rating, setRating] = useState(5);
  const [selectedTags, setSelectedTags] = useState<ReviewTagType[]>([]);
  const [content, setContent] = useState('');
  const hiddenButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen) hiddenButtonRef.current?.click();
  }, [isOpen]);

  const toggleTag = (tag: ReviewTagType) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (payload: PostReviewRequest) =>
      reviewsApi.postWriteReview(payload),
    onSuccess: () => {
      alert('리뷰가 등록되었습니다!');
      onClose();
    },
  });

  const handleSubmit = () => {
    mutate({
      groupId,
      targetUserId,
      rating,
      content,
      defaultTag: selectedTags,
    });
  };

  return (
    <Modal onClose={onClose}>
      <ModalTrigger>
        <button
          ref={hiddenButtonRef}
          style={{ display: 'none' }}
        />
      </ModalTrigger>

      {isOpen && (
        <ModalContent className='w-[90vw] rounded-2xl bg-white p-[20px]'>
          <h2 className='mb-[20px] flex justify-center text-16_B text-black'>
            리뷰 작성
          </h2>

          <div className='mb-[20px] flex items-center justify-center gap-2'>
            <ProfileImage
              src={targetUserProfileImage}
              size='sm'
            />
            <span className='text-14_B text-gray-950'>{targetUserName}</span>
          </div>

          <div className='mb-[20px]'>
            <p className='mb-[8px] text-12_B text-gray-500'>태그</p>
            <div className='flex flex-wrap gap-2'>
              {Object.values(ReviewTag).map((tag) => (
                <button
                  key={tag}
                  type='button'
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-3 py-2 text-12_M ${
                    selectedTags.includes(tag)
                      ? 'border-blue-400 bg-blue-100 text-blue-800'
                      : 'border-gray-100 bg-gray-25'
                  }`}
                >
                  {ReviewTagLabels[tag]}
                </button>
              ))}
            </div>
          </div>

          <div className='mb-[20px]'>
            <p className='mb-[8px] text-12_B text-gray-500'>한줄평 (선택)</p>

            <TextareaInput
              value={content}
              onChange={setContent}
              placeholder='내용을 입력해주세요'
              maxLength={150}
              rows={3}
              showLength={true}
            />
          </div>

          <div className='mb-4'>
            <p className='mb-[8px] text-12_B text-gray-500'>별점</p>
            <div className='flex justify-center'>
              <Rating
                value={rating}
                onChange={setRating}
                style={{ maxWidth: 140 }}
                itemStyles={{
                  itemShapes: Star,
                  activeFillColor: '#FFCB02',
                  inactiveFillColor: '#fbf1a9',
                }}
              />
            </div>
          </div>

          <div className='mt-5 flex justify-between gap-2'>
            <Button
              variant='secondary'
              onClick={onClose}
              className='w-1/2'
            >
              취소
            </Button>
            <Button
              variant='primary'
              onClick={handleSubmit}
              className='w-1/2'
              disabled={isPending}
            >
              등록
            </Button>
          </div>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ReviewWriteModal;
