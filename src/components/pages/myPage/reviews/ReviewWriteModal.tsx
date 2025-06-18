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

const tagOptions: { value: ReviewTagType; label: string }[] = [
  { value: ReviewTag.PUNCTUAL, label: '⏰ 시간 약속을 잘 지켜요' },
  { value: ReviewTag.POLITE, label: '🙏 친절하고 매너가 좋아요' },
  { value: ReviewTag.COMFORTABLE, label: '🛋️ 편안한 분위기였어요' },
  { value: ReviewTag.COMMUNICATIVE, label: '🗣️ 대화가 잘 통했어요' },
  { value: ReviewTag.CLEAN, label: '🧼 청결하고 깔끔했어요' },
  { value: ReviewTag.RESPONSIVE, label: '📞 소통이 잘 되고 응답이 빨라요' },
  { value: ReviewTag.RECOMMEND, label: '❤️ 다음에도 함께하고 싶어요' },
];

const ReviewWriteModal = ({
  isOpen,
  onClose,
  groupId,
  targetUserId,
  targetUserName,
  targetUserProfileImage,
}: ReviewWriteModalProps) => {
  const [rating, setRating] = useState(0);
  const [selectedTags, setSelectedTags] = useState<ReviewTagType[]>([]);
  const [isEtcSelected, setIsEtcSelected] = useState(false);
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
    if (selectedTags.length === 0 && !content.trim()) {
      alert('리뷰 태그를 최소 1개 이상 선택하거나 기타 의견을 작성해주세요.');
      return;
    }

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
        <ModalContent className='w-[90vw] rounded-2xl bg-white p-5'>
          <h2 className='mb-[20px] text-center text-16_B text-black'>
            리뷰 작성
          </h2>
          <div className='mb-4 flex items-center justify-center gap-2'>
            <ProfileImage
              src={targetUserProfileImage}
              size='sm'
            />
            <span className='text-14_B'>{targetUserName}</span>
          </div>
          <p className='mb-[8px] text-12_M text-gray-500'>
            최소 1개, 중복 선택 가능
          </p>

          <div className='mb-[20px] space-y-[4px]'>
            {tagOptions.map(({ value, label }) => (
              <label
                key={value}
                className='flex h-[40px] items-center gap-[10px]'
              >
                <input
                  type='checkbox'
                  checked={selectedTags.includes(value)}
                  onChange={() => toggleTag(value)}
                  className='accent-red-500'
                />
                <span className='text-14_M'>{label}</span>
              </label>
            ))}

            <label className='mb-[20px] flex h-[40px] items-center gap-2'>
              <input
                type='checkbox'
                checked={isEtcSelected}
                onChange={() => setIsEtcSelected(!isEtcSelected)}
                className='accent-red-500'
              />
              <span className='text-14_M'>기타</span>
            </label>

            {isEtcSelected && (
              <TextareaInput
                value={content}
                onChange={setContent}
                placeholder='리뷰 내용을 입력해주세요.'
                maxLength={200}
                rows={4}
              />
            )}
          </div>

          <div className='mb-[20px]'>
            <p className='text-12_B text-gray-500'>별점</p>
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

          <div className='mt-[20px] flex justify-between gap-2'>
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
              완료
            </Button>
          </div>
        </ModalContent>
      )}
    </Modal>
  );
};

export default ReviewWriteModal;
