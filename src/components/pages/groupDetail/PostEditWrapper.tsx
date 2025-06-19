'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import DetailHeader from '@/components/common/DetailHeader/DetailHeader';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import { UploadedImage, useImageUploader } from '@/hooks';
import { useGetPost, useUpdatePost } from '@/hooks/postHooks/postHook';
import { useGetPresignedURL } from '@/hooks/useGetPresignedUrl/useGetPresignedUrl';
import { hasProfanity } from '@/lib/utils';
import { imagesApi } from '@/services/imagesService';
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
  const { mutateAsync: getPresignedURL } = useGetPresignedURL();
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
  const canSubmit = useMemo(
    () =>
      isValidText
      && content.length > 0
      && (isContentChanged || isImagesChanged),
    [content, isValidText, isContentChanged, isImagesChanged]
  );

  useEffect(() => {
    if (post) {
      setContent(post.content);
      const originalImagesUrls = post.images?.map((img) => img.src.toString());
      defaultUrlUpload(originalImagesUrls || []);
    }
    if (post?.images && post.images.length > 0) {
      setHasImage(true);
    }
  }, [post, defaultUrlUpload]);

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
    let uploadResults: { idx: number; url: string }[] = [];
    try {
      const uploadPromises = stagedImages
        .map((img) => {
          if (!img.file) {
            return null;
          }
          return getPresignedURL(img.file.name).then((res) => {
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
              .then(() => ({
                idx: stagedImages.indexOf(img),
                url: presignedUrl.split('?')[0],
              }));
          });
        })
        .filter(Boolean);
      uploadResults = (await Promise.all(uploadPromises)) as {
        idx: number;
        url: string;
      }[];
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      return;
    }
    const finalImageObjects = stagedImages.map((img, idx) => {
      const uploaded = uploadResults.find((r) => r && r.idx === idx);
      return {
        alt: img.file.name,
        src: uploaded ? uploaded.url : img.url,
      };
    });
    const res = await updatePost({
      groupId,
      postId,
      content,
      isPinned: post?.isPinned ?? false,
      images: finalImageObjects,
    });
    if ((res.data as { result: boolean }).result === true) {
      router.replace(`/groups/${groupId}/posts/${postId}`);
    }
  };

  return (
    <div className='flex h-full min-h-screen flex-col'>
      <DetailHeader
        title='게시글 수정'
        hasRightText='수정'
        onRightClick={handleSubmit}
        rightDisabled={!canSubmit}
      />
      <div className='h-full flex-1 px-4 pt-16'>
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
    </div>
  );
};

export default PostEditWrapper;
