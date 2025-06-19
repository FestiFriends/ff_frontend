'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { XIcon } from '@/components/icons';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { UploadedImage } from '@/hooks';

interface ImageUploadProps {
  images: UploadedImage[];
  upload: (files: File | File[] | FileList | null) => void;
  remove: (index: number) => void;
  reset: () => void;
}

const ImageUpload = ({ images, upload, remove, reset }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex gap-2'>
        <button
          onClick={() => inputRef.current?.click()}
          className='rounded-12 bg-gray-200 px-2 py-1 text-12_B'
        >
          이미지 업로드
        </button>
        <button
          onClick={reset}
          className='rounded-12 bg-gray-200 px-2 py-1 text-12_B'
        >
          초기화
        </button>
      </div>
      <input
        type='file'
        accept='image/*'
        ref={inputRef}
        className='hidden'
        onChange={(e) => {
          upload(e.target.files);
          e.target.value = '';
        }}
        multiple
      />
      <Carousel>
        <CarouselContent className='m-0'>
          {images.map((img, idx) => (
            <CarouselItem
              key={img.url}
              className='relative h-24 w-24 basis-24'
            >
              <button
                className='absolute top-2 right-2 z-10'
                onClick={() => remove(idx)}
              >
                <XIcon />
              </button>
              <Image
                src={img.url}
                alt='이미지'
                width={96}
                height={96}
                sizes='96px'
                className='object-contain'
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ImageUpload;
