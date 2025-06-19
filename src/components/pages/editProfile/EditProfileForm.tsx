'use client';

import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import TextInput from '@/components/common/TextInput/TextInput';
import { USERS_QUERY_KEYS } from '@/constants/queryKeys';
import { useUploadSingleFile } from '@/hooks/useGetPresignedUrl/useGetPresignedUrl';
import { useImageUploader } from '@/hooks/useImageUploader/useImageUploader';
import { useNicknameValidator } from '@/hooks/useNicknameValidator/useNicknameValidator';
import { hasProfanity } from '@/lib/utils';
import { profilesApi } from '@/services/profileService';
import { FullProfile, ProfileEditRequest } from '@/types/profiles';
import {
  validateAge,
  validateNickname,
} from '@/utils/InputValidators/InputValidators';
import FormSection from './FormSection';
import GenderSelect from './GenderSelect';
import ProfileImageInput from './ProfileImageInput';

interface EditProfileFormProps {
  profile: FullProfile;
}

const EditProfileForm = ({ profile }: EditProfileFormProps) => {
  const { images, upload, defaultUrlUpload } = useImageUploader('single');
  const { mutateAsync: imaegMutate, isPending: imageIsPending } =
    useUploadSingleFile();

  const {
    isChecking,
    isAvailable,
    error: nicknameError,
    validate: validateNicknameAsync,
  } = useNicknameValidator();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { handleSubmit, setValue, watch, control } =
    useForm<ProfileEditRequest>({
      defaultValues: {
        age: profile.age,
        description: profile.description,
        gender: profile.gender,
        hashtag: profile.hashtag,
        name: profile.name,
        profileImage: profile.profileImage || {},
        sns: profile.sns,
      },
      mode: 'onBlur',
    });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: ProfileEditRequest) => profilesApi.updateProfile(data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [USERS_QUERY_KEYS.myProfile] });
      router.replace('/profiles/me');
    },
    onError: (error) => {
      console.error('업데이트 실패', error);
      alert('업데이트에 실패했습니다.');
    },
  });

  const onSubmit = async (data: ProfileEditRequest) => {
    if (hasProfanity(data.description)) {
      alert('소개글에 부적절한 표현이 포함되어 있습니다.');
      return;
    }
    let imageData: ProfileEditRequest['profileImage'] = {};
    if (images?.file) {
      await imaegMutate(images?.file, {
        onSuccess: (url) => {
          imageData = { src: url, alt: '프로필 이미지' };
        },
      });
    }

    const submitData: ProfileEditRequest = {
      ...data,
      profileImage: imageData,
    };
    await mutateAsync(submitData);
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

  const getNicknameHelperText = () => {
    if (isChecking) {
      return '사용 가능 확인 중...';
    }
    if (nicknameError) {
      return nicknameError;
    }
    if (isAvailable === true) {
      return '사용 가능한 닉네임입니다.';
    }
    return '2~20자 한글/영문/숫자/_만 입력 가능합니다.';
  };

  const getNicknameHelperColor = () => {
    if (isAvailable && !nicknameError) return 'text-green-600';
    if (nicknameError || isAvailable === false) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleFormKeyDown}
    >
      <div className='flex justify-center'>
        <ProfileImageInput
          images={images}
          upload={upload}
          defaultUrlUpload={defaultUrlUpload}
          initialImageUrl={watch('profileImage')}
        />
      </div>

      <FormSection label='닉네임'>
        <Controller
          name='name'
          control={control}
          rules={{
            required: '닉네임을 입력해주세요.',
            validate: (v) => validateNickname(v),
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              onBlur={(e) => {
                field.onBlur?.();
                validateNicknameAsync(e.target.value);
              }}
              error={nicknameError}
              placeholder='닉네임을 입력해주세요'
              helperText={getNicknameHelperText()}
              helperTextColor={getNicknameHelperColor()}
            />
          )}
        />
      </FormSection>

      <FormSection label='성별'>
        <Controller
          name='gender'
          control={control}
          rules={{
            validate: (value) =>
              value === 'MALE' || value === 'FEMALE'
                ? true
                : '성별을 선택해주세요.',
          }}
          render={({ field, fieldState }) => (
            <>
              <GenderSelect
                value={field.value ?? ''}
                onChange={field.onChange}
              />
              {fieldState.error && (
                <p className='mt-1 text-sm text-red-500'>
                  {fieldState.error.message}
                </p>
              )}
            </>
          )}
        />
      </FormSection>

      <FormSection label='나이'>
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
              helperText={fieldState.error?.message}
            />
          )}
        />
      </FormSection>

      <FormSection label='소개글'>
        <TextareaInput
          value={watch('description') || ''}
          onChange={(val) => setValue('description', val)}
          placeholder='자기소개를 입력해주세요'
          maxLength={150}
          rows={5}
        />
      </FormSection>

      <FormSection label='SNS 아이디'>
        <Controller
          name='sns'
          control={control}
          render={({ field }) => (
            <TextInput
              placeholder='인스타그램 아이디'
              {...field}
              value={watch('sns') || ''}
            />
          )}
        />
      </FormSection>

      <div className='mt-[30px] mb-[28px] flex gap-[10px]'>
        <button
          type='button'
          className='flex-1 rounded-[12px] border border-gray-300 py-3 text-16_M text-gray-800'
          onClick={() => router.back()}
          disabled={isPending || imageIsPending}
        >
          취소
        </button>
        <button
          type='submit'
          disabled={isPending || imageIsPending}
          className='flex-1 rounded-[12px] bg-red-500 py-3 text-16_M text-white disabled:cursor-not-allowed disabled:opacity-50'
        >
          {isPending || imageIsPending ? '저장 중...' : '확인'}
        </button>
      </div>
    </form>
  );
};

export default EditProfileForm;
