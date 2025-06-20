import React, { useRef } from 'react';
import Image from 'next/image';
import PhotoIcon from '@/components/icons/PhotoIcon';
import XIcon from '@/components/icons/XIcon';
import { UploadedImage } from '@/hooks';

interface PostImageUploaderProps {
  images: UploadedImage[];
  onImageUpload: (files: File | File[] | FileList | null) => void;
  onImageRemove: (index: number) => void;
}

const PostImageUploader = ({
  images,
  onImageUpload,
  onImageRemove,
}: PostImageUploaderProps) => {
  const imgRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageUpload(e.target.files);
  };

  const handleAddClick = () => {
    imgRef.current?.click();
  };

  return (
    <div className='flex w-full flex-col gap-4 border-t border-t-gray-100 bg-white p-4'>
      {images.length > 0 && (
        <div className='scrollbar-hide flex gap-2 overflow-x-auto'>
          {images.map((img, index) => (
            <div
              key={img.url.toString()}
              className='relative flex h-[60px] w-[60px] flex-shrink-0 items-center justify-center overflow-hidden rounded-sm'
            >
              <Image
                src={img.url}
                alt={img.url.toString()}
                fill
                sizes='60px'
                className='object-cover'
              />
              <button
                type='button'
                className='absolute top-[3px] right-[3.2px] z-10 cursor-pointer'
                onClick={() => onImageRemove(index)}
              >
                <XIcon className='h-5 w-5' />
              </button>
            </div>
          ))}
        </div>
      )}
      <input
        ref={imgRef}
        className='hidden'
        type='file'
        multiple
        accept='image/*'
        onChange={handleFileChange}
      />
      <button
        type='button'
        className='flex w-full gap-1'
        onClick={handleAddClick}
      >
        <PhotoIcon />
        <p className='text-16_body_M text-black'>사진 첨부</p>
      </button>
    </div>
  );
};
export default PostImageUploader;
