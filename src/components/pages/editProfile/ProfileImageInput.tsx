'use client';

import { useRef, useState } from 'react';
import ProfileImage from '@/components/common/ProfileImage/ProfileImage';

const ProfileImageInput = () => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickChange = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='relative w-fit'>
      <ProfileImage
        size='lg'
        src={imageUrl}
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
