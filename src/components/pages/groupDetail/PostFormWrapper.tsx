'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DetailHeader from '@/components/common/DetailHeader/DetailHeader';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import { useImageUploader } from '@/hooks';
import { useCreatePost } from '@/hooks/postHooks/postHook';
import { useGetPresignedURL } from '@/hooks/useGetPresignedUrl/useGetPresignedUrl';
import { hasProfanity } from '@/lib/utils';
import { imagesApi } from '@/services/imagesService';
import PinCheckbox from './PinCheckbox/PinCheckbox';
import PostImageUploader from './PostImageUploader/PostImageUploader';

const MAX_TEXTAREA_ROWS = 33;
const MAX_TEXTAREA_LENGTH = 500;

const PostFormWrapper = () => {
  const params = useParams();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isValidText, setIsValidText] = useState(true);
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: getPresignedURL } = useGetPresignedURL();
  const groupId = params?.groupId as string;
  const [isPinned, setIsPinned] = useState(false);
  const { upload, images: uploadedImages, remove } = useImageUploader('multi');

  const canSubmit = useMemo(
    () => content.length > 0 && isValidText,
    [content, isValidText]
  );

  const handleChange = (value: string) => {
    setContent(value);
    setIsValidText(!hasProfanity(value));
  };

  const handleSubmit = async () => {
    let imageUrls: string[] = [];
    try {
      if (uploadedImages.length > 0) {
        const uploadPromises = uploadedImages.map((img) =>
          getPresignedURL(img.file.name).then((res) => {
            if (res.code !== 200) {
              throw new Error('URL 생성 실패');
            }
            const { presignedUrl } = res.data as { presignedUrl: string };
            const fileToUpload = img.file;
            if (!fileToUpload) {
              throw new Error('파일이 없습니다.');
            }
            return imagesApi
              .uploadImage(presignedUrl, fileToUpload)
              .then(() => presignedUrl.split('?')[0]);
          })
        );

        imageUrls = await Promise.all(uploadPromises);
      }
    } catch (error) {
      console.error('이미지 업로드 프로세스 중 오류 발생:', error);
      // TODO: 에러처리 필요(404페이지나 모달, 토스트 등)
    }

    const imageObjects = uploadedImages.map((img, idx) => ({
      alt: img.file.name,
      src: imageUrls[idx],
    }));
    const res = await createPost({
      groupId,
      content,
      isPinned,
      images: imageObjects,
    });

    if ((res.data as { result: boolean }).result === true) {
      router.push(`/groups/${groupId}`);
    }
  };

  const handlePinClick = () => {
    setIsPinned((prev) => !prev);
  };

  return (
    <div className='flex h-full min-h-screen flex-col'>
      <DetailHeader
        title='게시글 작성'
        hasRightText='등록'
        onRightClick={handleSubmit}
        rightDisabled={!canSubmit}
      />
      <PinCheckbox
        isPinned={isPinned}
        onClick={handlePinClick}
      />
      <div className='h-full flex-1 px-4 pt-1 pb-20'>
        <TextareaInput
          value={content}
          onChange={handleChange}
          maxLength={MAX_TEXTAREA_LENGTH}
          rows={MAX_TEXTAREA_ROWS}
          className='border-none px-4 py-2.5 text-16_M placeholder:text-gray-400'
          hasBorder={false}
          isValidText={isValidText}
          showLength={false}
          placeholder='내용을 입력해 주세요'
          showToast={true}
          showWarning={false}
        />
      </div>
      <div className='fixed bottom-0 w-full'>
        <PostImageUploader
          images={uploadedImages}
          onImageUpload={upload}
          onImageRemove={remove}
        />
      </div>
    </div>
  );
};

export default PostFormWrapper;
