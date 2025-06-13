'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import TextInput from '@/components/common/TextInput/TextInput';
import { useMyProfile } from '@/hooks/useMyProfile/useMyProfile';
import { GenderType } from '@/types/enums';
import GenderSelect from './GenderSelect';
import ProfileImageInput from './ProfileImageInput';

interface EditProfileFormValues {
  profileImage: string | undefined;
  name: string;
  gender: GenderType | '';
  age: number;
  description: string;
  sns: string;
}

const EditProfileForm = () => {
  const { data: profile } = useMyProfile();

  const { handleSubmit, setValue, reset, watch, control } =
    useForm<EditProfileFormValues>({
      defaultValues: {
        profileImage: '',
        name: '',
        gender: '',
        age: 20,
        description: '',
        sns: '',
      },
    });

  useEffect(() => {
    if (profile) {
      reset({
        profileImage: profile.profileImage?.src ?? '',
        name: profile.name ?? '',
        gender: profile.gender ?? '',
        age: profile.age ?? 20,
        description: profile.description ?? '',
        sns: profile.sns ?? '',
      });
    }
  }, [profile, reset]);

  const onSubmit = (data: EditProfileFormValues) => {
    console.log('제출 데이터:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='flex justify-center'>
        <ProfileImageInput
          initialImageUrl={watch('profileImage')}
          onChange={(url) => setValue('profileImage', url)}
        />
      </div>
      <p className='mt-[30px] mb-[10px] text-14_B'>닉네임</p>
      <Controller
        name='name'
        control={control}
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder='닉네임을 입력해주세요'
            helperText='변경 가능한 닉네임입니다.'
          />
        )}
      />

      <div>
        <p className='mt-[30px] mb-[10px] text-14_B'>성별</p>
        <GenderSelect
          value={watch('gender')}
          onChange={(val) => setValue('gender', val)}
        />
      </div>
      <p className='mt-[30px] mb-[16px] text-14_B'>나이</p>
      <div className='mb-10'>
        <Controller
          name='age'
          control={control}
          render={({ field }) => (
            <TextInput
              {...field}
              placeholder='나이를 입력해 주세요'
              helperText='정확한 나이를 입력해주세요'
            />
          )}
        />
      </div>

      <p className='mt-[38px] mb-[10px] text-14_B'>소개글</p>
      <TextareaInput
        value={watch('description')}
        onChange={(val) => setValue('description', val)}
        placeholder='자기소개를 입력해주세요'
        maxLength={150}
        rows={5}
      />

      <p className='mt-[30px] mb-[10px] text-14_B'>SNS 아이디</p>
      <Controller
        name='sns'
        control={control}
        render={({ field }) => (
          <TextInput
            placeholder='인스타그램 아이디'
            {...field}
          />
        )}
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
    </form>
  );
};

export default EditProfileForm;
