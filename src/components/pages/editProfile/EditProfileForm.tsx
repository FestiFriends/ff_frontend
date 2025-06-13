'use client';

import { useEffect, useState } from 'react';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import TextInput from '@/components/common/TextInput/TextInput';
import { useMyProfile } from '@/hooks/useMyProfile/useMyProfile';
import { GenderType } from '@/types/enums';
import GenderSelect from './GenderSelect';
import ProfileImageInput from './ProfileImageInput';

const EditProfileForm = () => {
  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<GenderType | ''>('');
  const [age, setAge] = useState<number>(20);
  const [description, setDescription] = useState('');
  const [snsId, setSnsId] = useState('');
  const { data: profile } = useMyProfile();

  useEffect(() => {
    if (profile) {
      setNickname(profile.name ?? '');
      setGender(profile.gender ?? '');
      setAge(profile.age ?? '');
      setDescription(profile.description ?? '');
      setSnsId(profile.sns ?? '');
    }
  }, [profile]);

  return (
    <div>
      <div className='flex justify-center'>
        <ProfileImageInput />
      </div>
      <p className='mt-[30px] mb-[10px] text-14_B'>닉네임</p>
      <TextInput
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder='닉네임을 입력해주세요'
        helperText='변경 가능한 닉네임입니다.'
      />

      <div>
        <p className='mt-[30px] mb-[10px] text-14_B'>성별</p>
        <GenderSelect
          value={gender}
          onChange={setGender}
        />
      </div>
      <p className='mt-[30px] mb-[16px] text-14_B'>나이</p>
      <div className='mb-10'>
        <TextInput
          value={String(age)}
          onChange={(e) => setAge(Number(e.target.value))}
          placeholder='나이를 입력해 주세요'
          helperText='정확한 나이를 입력해주세요'
        />
      </div>

      <p className='mt-[38px] mb-[10px] text-14_B'>소개글</p>
      <TextareaInput
        value={description}
        onChange={setDescription}
        placeholder='자기소개를 입력해주세요'
        maxLength={150}
        rows={5}
      />

      <p className='mt-[30px] mb-[10px] text-14_B'>SNS 아이디</p>
      <TextInput
        placeholder='인스타그램 아이디'
        value={snsId}
        onChange={(e) => setSnsId(e.target.value)}
      />

      <div className='mt-[30px] mb-[28px] flex gap-[10px]'>
        <button
          type='button'
          className='flex-1 rounded-[12px] border border-gray-300 py-3 text-16_M text-gray-800'
        >
          취소
        </button>
        <button
          type='submit'
          className='flex-1 rounded-[12px] bg-red-500 py-3 text-16_M text-white'
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default EditProfileForm;
