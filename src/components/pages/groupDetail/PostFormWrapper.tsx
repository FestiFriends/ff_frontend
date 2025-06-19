'use client';

import React, { useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DetailHeader from '@/components/common/DetailHeader/DetailHeader';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import { useCreatePost } from '@/hooks/postHooks/postHook';
import { useGetPresignedURL } from '@/hooks/useGetPresignedUrl/useGetPresignedUrl';
import { hasProfanity } from '@/lib/utils';
import { imagesApi } from '@/services/imagesService';
import { Image } from '@/types/image';
import PostImageUploader from './PostImageUploader/PostImageUploader';

const MAX_TEXTAREA_ROWS = 33; // 최대 20줄까지 늘어남
const MAX_TEXTAREA_LENGTH = 500;

const PostFormWrapper = () => {
  const params = useParams();
  const router = useRouter();
  const [content, setContent] = useState('');
  const [isValidText, setIsValidText] = useState(true);
  const [images, setImages] = useState<Image[]>([]);
  const { mutateAsync: createPost } = useCreatePost();
  const { mutateAsync: getPresignedURL } = useGetPresignedURL();
  const groupId = params?.groupId as string;

  const canSubmit = useMemo(
    () => content.length > 0 && isValidText,
    [content, isValidText]
  );

  const handleImageUpload = (newImages: Image[]) => setImages(newImages);
  const handleImageRemove = (idx: number) =>
    setImages((prev) => prev.filter((_, i) => i !== idx));

  const handleChange = (value: string) => {
    setContent(value);
    setIsValidText(!hasProfanity(value));
  };

  const handleSubmit = async () => {
    let imageUrls: string[] = [];
    try {
      if (images.length > 0) {
        const uploadPromises = images.map((img) =>
          getPresignedURL(img.name!).then((res) => {
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

    const imageObjects = images.map((img, idx) => ({
      alt: img.alt ?? img.name ?? '',
      src: imageUrls[idx],
    }));
    const res = await createPost({
      groupId,
      content,
      isPinned: false,
      images: imageObjects,
    });

    if ((res.data as { result: boolean }).result === true) {
      router.push(`/groups/${groupId}`);
    }
  };

  return (
    <div className='flex h-full min-h-screen flex-col'>
      <DetailHeader
        title='게시글 작성'
        hasRightText='등록'
        onRightClick={handleSubmit}
        rightDisabled={!canSubmit}
      />
      <div className='h-full flex-1 px-4 pt-16 pb-20'>
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
          images={images}
          onImageUpload={handleImageUpload}
          onImageRemove={handleImageRemove}
        />
      </div>
    </div>
  );
};

export default PostFormWrapper;
