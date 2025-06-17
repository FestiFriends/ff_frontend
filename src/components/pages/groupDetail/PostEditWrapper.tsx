'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import { useGetPost, useUpdatePost } from '@/hooks/postHooks/postHook';
import { useGetPresignedURL } from '@/hooks/useGetPresignedUrl/useGetPresignedUrl';
import { hasProfanity } from '@/lib/utils';
import { imagesApi } from '@/services/imagesService';
import { Image } from '@/types/image';
import PostImageUploader from './PostImageUploader/PostImageUploader';

const PostEditWrapper = () => {
  const params = useParams();
  const groupId = params?.groupId as string;
  const postId = params?.postId as string;
  const router = useRouter();

  const { data: post } = useGetPost({ groupId, postId });
  const [content, setContent] = useState('');
  const [isValidText, setIsValidText] = useState(true);
  const [images, setImages] = useState<Image[]>([]);
  const { mutateAsync: getPresignedURL } = useGetPresignedURL();
  const { mutateAsync: updatePost } = useUpdatePost();

  const isContentChanged = content !== (post?.content ?? '');
  const isImagesChanged =
    JSON.stringify(images) !== JSON.stringify(post?.images ?? []);
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
      setImages(post.images || []);
    }
  }, [post]);

  const handleImageUpload = (newImages: Image[]) => setImages(newImages);
  const handleImageRemove = (idx: number) =>
    setImages((prev) => prev.filter((_, i) => i !== idx));

  const handleChange = (value: string) => {
    setContent(value);
    setIsValidText(!hasProfanity(value));
  };

  const handleSubmit = async () => {
    let uploadResults: { idx: number; url: string }[] = [];
    try {
      const uploadPromises = images
        .map((img) => {
          if (!img.file) {
            return null;
          }
          return getPresignedURL(img.name!).then((res) => {
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
                idx: images.indexOf(img),
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
    // 업로드된 이미지라면 새 URL로, 아니면 기존 src 사용
    const finalImageObjects = images.map((img, idx) => {
      const uploaded = uploadResults.find((r) => r && r.idx === idx);
      return {
        alt: img.alt ?? img.name ?? '',
        src: uploaded ? uploaded.url : img.src.toString(),
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
      router.push(`/groups/${groupId}/posts/${postId}`);
    }
  };

  return (
    <div className='flex h-full flex-col gap-4'>
      {/* TODO: 헤더 컴포넌트로 추후 변경*/}
      <header>
        <button
          className='h-10 w-10 bg-blue-500'
          onClick={handleSubmit}
          disabled={!canSubmit}
        >
          수정
        </button>
      </header>
      <form>
        <TextareaInput
          value={content}
          onChange={handleChange}
          className='h-full border-none px-4 py-2.5 text-16_M placeholder:text-gray-400'
          hasBorder={false}
          isValidText={isValidText}
          showLength={false}
          placeholder='내용을 입력해 주세요'
        />
        <div className='fixed bottom-[80px] w-full'>
          <PostImageUploader
            images={images}
            onImageUpload={handleImageUpload}
            onImageRemove={handleImageRemove}
          />
        </div>
      </form>
    </div>
  );
};

export default PostEditWrapper;
