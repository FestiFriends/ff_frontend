'use client';

import React from 'react';
import { Star } from 'lucide-react';

const ProfileCard = () => {
  return (
    <div className='w-full max-w-md rounded-lg bg-gray-200 p-4'>
      <div className='flex items-start justify-between'>
        <div className='flex items-center gap-4'>
          <div className='h-16 w-16 rounded-full bg-gray-300' />

          <div className='flex items-end gap-3'>
            <p className='text-lg font-bold text-black'>닉네임</p>
            <div className='flex items-center gap-1'>
              <Star
                className='h-4 w-4 text-yellow-500'
                fill='currentColor'
              />
              <span className='text-black'>4.8</span>
            </div>
          </div>
        </div>

        <button className='rounded bg-gray-100 px-3 py-1 text-sm text-black'>
          프로필 수정
        </button>
      </div>

      <div className='mt-2 rounded bg-white p-3 text-sm text-black'>
        인삿말 또는 소개글 텍스트
      </div>

      <div className='mt-1 text-sm text-gray-800'>
        🔗 인스타, 페북 등 소셜 링크 (선택사항)
      </div>

      <div className='mt-3 flex flex-wrap gap-2'>
        {['태그1', '태그2', '태그3', '태그4', '태그5'].map((tag, i) => (
          <span
            key={i}
            className='rounded-full bg-gray-100 px-3 py-1 text-sm text-black'
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProfileCard;
