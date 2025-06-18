import React, { useRef } from 'react';
import Image from 'next/image';
import PhotoIcon from '@/components/icons/PhotoIcon';
import XIcon from '@/components/icons/XIcon';
import { Image as ImageType } from '@/types/image';

interface PostImageUploaderProps {
  images: ImageType[];
  onImageUpload: (images: ImageType[]) => void;
  onImageRemove: (index: number) => void;
}

const PostImageUploader = ({
  images,
  onImageUpload,
  onImageRemove,
}: PostImageUploaderProps) => {
  const imgRef = useRef<HTMLInputElement>(null);

  const extensionMap: Record<string, string> = {
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
  };
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages = Array.from(files)
      .filter((file) => extensionMap[file.type])
      .map((file) => ({
        src: URL.createObjectURL(file),
        name: file.name,
        file,
      }));

    onImageUpload([...images, ...newImages]);
  };

  const handleAddClick = () => {
    imgRef.current?.click();
  };

  return (
    <div className='flex w-full flex-col gap-4 border-t border-t-gray-100 bg-white py-4 pl-4'>
      {images.length > 0 && (
        <div className='scrollbar-hide flex gap-2 overflow-x-auto'>
          {images.map((img, index) => (
            <div
              key={img.src.toString()}
              className='relative h-[60px] w-[60px] flex-shrink-0'
            >
              <Image
                src={img.src}
                alt={img.src.toString()}
                width={60}
                height={60}
                sizes='60px'
                className='rounded-sm object-cover'
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
