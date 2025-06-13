'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import TextInput from '@/components/common/TextInput/TextInput';
import { useMyProfile } from '@/hooks/useMyProfile/useMyProfile';
// import { profilesApi } from '@/services/profileService';
import { GenderType } from '@/types/enums';
import { validateNickname } from '@/utils/InputValidators/InputValidators';
import GenderSelect from './GenderSelect';
import ProfileImageInput from './ProfileImageInput';

interface EditProfileFormValues {
  profileImage: string | undefined;
  name: string;
  gender: GenderType | undefined;
  age: number;
  description: string;
  sns: string;
}

const EditProfileForm = () => {
  const { data: profile } = useMyProfile();
  const [nicknameError, setNicknameError] = useState<string>();
  const [nicknameTouched, setNicknameTouched] = useState(false);

  const { handleSubmit, setValue, reset, watch, control } =
    useForm<EditProfileFormValues>({
      defaultValues: {
        profileImage: '',
        name: '',
        gender: undefined,
        age: 20,
        description: '',
        sns: '',
      },
    });

  useEffect(() => {
    if (profile) {
      reset({
        profileImage: profile.profileImage?.src ?? undefined,
        name: profile.name ?? '',
        gender: profile.gender ?? undefined,
        age: profile.age ?? 20,
        description: profile.description ?? '',
        sns: profile.sns ?? '',
      });
    }
  }, [profile, reset]);

  const onSubmit = async (data: EditProfileFormValues) => {
    try {
      // await profilesApi.updateProfile({
      //   ...data,
      //   profileImage: data.profileImage
      //     ? { src: data.profileImage }
      //     : undefined,
      // });
      console.log('업데이트 성공', data);
      // TODO: 이동하거나 토스트 알림 띄우기
    } catch (error) {
      console.error('업데이트 실패', error);
    }
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
            onBlur={(e) => {
              const error = validateNickname(e.target.value);
              console.log('닉네임 에러:', error);
              setNicknameError(error);
              setNicknameTouched(true);
              field.onBlur?.();
            }}
            error={nicknameError}
            placeholder='닉네임을 입력해주세요'
            helperText={
              nicknameTouched && !nicknameError
                ? '사용 가능한 닉네임입니다.'
                : '2~20자 한글/영문/숫자/_만 입력 가능합니다.'
            }
            helperTextColor={
              nicknameTouched && !nicknameError
                ? 'text-green-600'
                : 'text-gray-500'
            }
          />
        )}
      />

      <div>
        <p className='mt-[30px] mb-[10px] text-14_B'>성별</p>
        <GenderSelect
          value={watch('gender') ?? ''}
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
