'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Toast } from '@/components/common';
import DetailHeader from '@/components/common/DetailHeader/DetailHeader';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import { UploadedImage, useImageUploader } from '@/hooks';
import { useGetPost, useUpdatePost } from '@/hooks/postHooks/postHook';
import { useUploadMultipleFiles } from '@/hooks/useGetPresignedUrl/useGetPresignedUrl';
import { hasProfanity } from '@/lib/utils';
import PinCheckbox from './PinCheckbox/PinCheckbox';
import PostImageUploader from './PostImageUploader/PostImageUploader';

const MAX_TEXTAREA_ROWS = 33;
const MAX_TEXTAREA_LENGTH = 500;

const PostEditWrapper = () => {
  const params = useParams();
  const groupId = params?.groupId as string;
  const postId = params?.postId as string;
  const router = useRouter();

  const { data: post } = useGetPost({ groupId, postId });
  const [content, setContent] = useState('');
  const [isValidText, setIsValidText] = useState(true);
  const [hasImage, setHasImage] = useState(false);
  const [originalImages, setOriginalImages] = useState<UploadedImage[]>([]);
  const [isPinned, setIsPinned] = useState(false);
  const [originalIsPinned, setOriginalIsPinned] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { mutateAsync: uploadMultipleFiles } = useUploadMultipleFiles();
  const { mutateAsync: updatePost } = useUpdatePost();
  const {
    upload,
    images: stagedImages,
    remove,
    defaultUrlUpload,
  } = useImageUploader('multi');

  const isContentChanged = content !== (post?.content ?? '');
  const isImagesChanged =
    originalImages.length !== stagedImages.length
    || originalImages.some((img, idx) => img.url !== stagedImages[idx]?.url);
  const isPinnedChanged = isPinned !== originalIsPinned;

  const canSubmit = useMemo(
    () =>
      isValidText
      && content.length > 0
      && (isContentChanged || isImagesChanged || isPinnedChanged),
    [content, isValidText, isContentChanged, isImagesChanged, isPinnedChanged]
  );

  useEffect(() => {
    if (post && !isInitialized) {
      setContent(post.content);
      setIsPinned(post.isPinned);
      setOriginalIsPinned(post.isPinned);
      const originalImagesUrls = post.images?.map((img) => img.src.toString());
      defaultUrlUpload(originalImagesUrls || []);
      setIsInitialized(true);
    }
    if (post?.images && post.images.length > 0) {
      setHasImage(true);
    }
  }, [post, defaultUrlUpload, isInitialized]);

  useEffect(() => {
    if (originalImages?.length === 0 && hasImage) {
      setOriginalImages(stagedImages);
    }
  }, [stagedImages, originalImages, hasImage]);

  const handleChange = (value: string) => {
    setContent(value);
    setIsValidText(!hasProfanity(value));
  };

  const handleSubmit = async () => {
    try {
      const files = stagedImages.map((img) => img.file);
      const uploadedUrls = await uploadMultipleFiles(files);

      const finalImageObjects = stagedImages.map((img, idx) => ({
        alt: img.file.name,
        src: uploadedUrls[idx],
      }));

      const res = await updatePost({
        groupId,
        postId,
        content,
        isPinned,
        images: finalImageObjects,
      });

      if ((res.data as { result: boolean }).result === true) {
        router.replace(`/groups/${groupId}/posts/${postId}`);
      }
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'message' in error) {
        setMessage((error as { message: string }).message);
      } else {
        setMessage('게시글 수정 중 오류가 발생했습니다.');
      }
    }
  };

  const handlePinClick = () => {
    setIsPinned((prev) => !prev);
  };

  return (
    <div className='flex h-dvh flex-col'>
      <DetailHeader
        title='게시글 수정'
        hasRightText='수정'
        onRightClick={handleSubmit}
        rightDisabled={!canSubmit}
      />
      <PinCheckbox
        isPinned={isPinned}
        onClick={handlePinClick}
      />
      <div className='h-[calc(100dvh-164px)] flex-1 px-4 pt-1 pb-20'>
        <TextareaInput
          value={content}
          onChange={handleChange}
          maxLength={MAX_TEXTAREA_LENGTH}
          rows={MAX_TEXTAREA_ROWS}
          className='h-full border-none px-4 py-2.5 text-16_M placeholder:text-gray-400'
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
          images={stagedImages}
          onImageUpload={upload}
          onImageRemove={remove}
        />
      </div>
      {message && (
        <Toast
          message={message}
          onClose={() => {}}
        />
      )}
    </div>
  );
};

export default PostEditWrapper;
