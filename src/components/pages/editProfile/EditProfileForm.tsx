'use client';

import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import TextInput from '@/components/common/TextInput/TextInput';
import { useMyProfile } from '@/hooks/useMyProfile/useMyProfile';
import { hasProfanity } from '@/lib/utils';
import { profilesApi } from '@/services/profileService';
import { getCheckNickname } from '@/services/usersService';
import { GenderType } from '@/types/enums';
import {
  validateAge,
  validateNickname,
} from '@/utils/InputValidators/InputValidators';
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
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const router = useRouter();

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
      mode: 'onBlur',
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

  const handleNicknameBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const value = e.target.value;

    const error = validateNickname(value);
    setNicknameError(error);
    setNicknameTouched(true);

    if (error) {
      setIsAvailable(null);
      return;
    }

    if (hasProfanity(value)) {
      setNicknameError('비속어는 사용할 수 없습니다.');
      setIsAvailable(null);
      return;
    }

    setIsChecking(true);
    try {
      const available = await getCheckNickname(value);
      setIsAvailable(available);
    } catch (err) {
      console.error('중복 확인 실패', err);
      setIsAvailable(null);
    } finally {
      setIsChecking(false);
    }
  };

  const onSubmit = async (data: EditProfileFormValues) => {
    if (hasProfanity(data.description)) {
      alert('소개글에 부적절한 표현이 포함되어 있습니다.');
      return;
    }
    try {
      await profilesApi.updateProfile({
        ...data,
        profileImage: data.profileImage
          ? { src: data.profileImage }
          : undefined,
      });
      console.log('업데이트 성공', data);
      router.replace('/profiles/me');
    } catch (error) {
      console.error('업데이트 실패', error);
    }
  };

  const handleFormKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (
      e.key === 'Enter'
      && e.target instanceof HTMLElement
      && e.target.tagName === 'INPUT'
    ) {
      e.preventDefault();
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleFormKeyDown}
    >
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
              field.onBlur?.();
              handleNicknameBlur(e);
            }}
            error={nicknameError}
            placeholder='닉네임을 입력해주세요'
            helperText={
              isChecking
                ? '사용 가능 확인 중...'
                : nicknameTouched && !nicknameError && isAvailable === true
                  ? '사용 가능한 닉네임입니다.'
                  : nicknameError
                    ? nicknameError
                    : isAvailable === false
                      ? '이미 사용 중인 닉네임입니다.'
                      : '2~20자 한글/영문/숫자/_만 입력 가능합니다.'
            }
            helperTextColor={
              isAvailable && !nicknameError
                ? 'text-green-600'
                : nicknameError || isAvailable === false
                  ? 'text-red-500'
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

      <div>
        <p className='mt-[30px] mb-[16px] text-14_B'>나이</p>
        <Controller
          name='age'
          control={control}
          rules={{
            validate: (val) => validateAge(val) ?? true,
          }}
          render={({ field, fieldState }) => (
            <TextInput
              {...field}
              placeholder='나이를 입력해 주세요'
              error={fieldState.error?.message}
              helperText={
                fieldState.error ? fieldState.error.message : undefined
              }
            />
          )}
        />
      </div>

      <p className='mt-[30px] mb-[10px] text-14_B'>소개글</p>
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
