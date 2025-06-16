'use client';

import { useEffect, useRef } from 'react';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { useImageUploader } from '@/hooks/useImageUploader/useImageUploader';

interface ProfileImageInputProps {
  initialImageUrl?: string;
  onChange?: (url: string) => void;
}

const ProfileImageInput = ({
  initialImageUrl,
  onChange,
}: ProfileImageInputProps) => {
  const { images, upload, defaultUrlUpload } = useImageUploader('single');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImageUrl) {
      defaultUrlUpload(initialImageUrl);
    }
  }, [initialImageUrl, defaultUrlUpload]);

  const handleClickChange = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if (images?.url) {
      onChange?.(images.url);
    }
  }, [images, onChange]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    upload(e.target.files);
  };

  return (
    <div className='relative w-fit'>
      <ProfileImage
        size='lg'
        src={images?.url}
      />
      <button
        type='button'
        onClick={handleClickChange}
        className='absolute -right-5 -bottom-2 h-[28px] w-[43px] rounded-full bg-gray-25 text-14_M text-gray-800 shadow-md transition hover:bg-gray-100'
      >
        변경
      </button>
      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        className='hidden'
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfileImageInput;
