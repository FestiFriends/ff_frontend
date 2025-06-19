'use client';

import { useEffect, useRef } from 'react';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';
import { UploadedImage } from '@/hooks/useImageUploader/useImageUploader';
import { ProfileEditRequest } from '@/types/profiles';

interface ProfileImageInputProps {
  images?: UploadedImage;
  upload: (files: File | File[] | FileList | null) => void;
  defaultUrlUpload: (urls: string[] | string) => Promise<void>;
  initialImageUrl: ProfileEditRequest['profileImage'];
}

const ProfileImageInput = ({
  images,
  defaultUrlUpload,
  upload,
  initialImageUrl,
}: ProfileImageInputProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialImageUrl?.src) {
      defaultUrlUpload(initialImageUrl.src);
    }
  }, [initialImageUrl, defaultUrlUpload]);

  const handleClickChange = () => {
    fileInputRef.current?.click();
  };

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
