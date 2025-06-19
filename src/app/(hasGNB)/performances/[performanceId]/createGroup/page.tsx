'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { Header } from '@/components/common';
import {
  FormTextInput,
  FormTextArea,
  FormCounter,
  FormText,
} from '@/components/common/Form';
import {
  CategorySelector,
  GenderSelector,
  DateSelector,
  AgeRangeSlider,
  TagInput,
  FormActions,
  LabeledWrapper,
  LocationSelector,
} from '@/components/pages/createGroup';
import { useGetPerformanceDetail, useCreateGroup } from '@/hooks';
import { groupCreateSchema } from '@/schema/groupsCreate';
import { CreateGroupFormData } from '@/types/group';

const DEFAULT_VALUES: CreateGroupFormData = {
  name: '공연 이름',
  category: '동행',
  title: '',
  description: '',
  region: '',
  dateRange: { startDate: null, endDate: null },
  gender: '혼성',
  ageRange: [20, 80],
  maxParticipants: 2,
  tags: [],
};

const CreateGroupPage = () => {
  const pathname = usePathname();
  const performanceId = pathname.split('/')[2];
  const { data: performanceDetail, isLoading } =
    useGetPerformanceDetail(performanceId);
  const performanceName = performanceDetail?.data?.title;
  const createGroupMutation = useCreateGroup();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { isValid },
    trigger,
  } = useForm<CreateGroupFormData>({
    resolver: zodResolver(groupCreateSchema),
    defaultValues: DEFAULT_VALUES,
    mode: 'all',
  });

  useEffect(() => {
    if (performanceName) {
      setValue('name', performanceName);
    }
  }, [performanceName, setValue]);

  useEffect(() => {
    trigger();
  }, [trigger]);

  const onSubmit = async (data: CreateGroupFormData) => {
    const isFormValid = await trigger();
    if (isFormValid) {
      createGroupMutation.mutate({ performanceId, data });
    }
  };

  const onReset = () => {
    reset(DEFAULT_VALUES);
  };

  return (
    <>
      <Header title='모임 개설' />
      <div className='relative mx-auto min-h-screen max-w-md'>
        <h1 className='sr-only'>모임 개설</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mx-auto flex flex-col gap-12.5 p-6 pb-4'
        >
          <LabeledWrapper label='공연 이름'>
            <FormText
              name='name'
              className='text-16_M text-gray-950'
              control={control}
              value={
                isLoading
                  ? '공연 정보를 불러오는 중...'
                  : performanceName || '공연 이름'
              }
            />
          </LabeledWrapper>
          <LabeledWrapper
            label='종류'
            contentPosition='bottom'
          >
            <CategorySelector
              name='category'
              control={control}
              rules={{ required: '종류를 선택해주세요' }}
            />
          </LabeledWrapper>

          <LabeledWrapper
            label='제목'
            contentPosition='bottom'
          >
            <FormTextInput
              name='title'
              control={control}
              placeholder='모임명을 입력해 주세요.'
              rules={{ required: '제목을 입력해주세요' }}
            />
          </LabeledWrapper>

          <LabeledWrapper
            label='소개글'
            contentPosition='bottom'
          >
            <FormTextArea
              name='description'
              control={control}
              placeholder='모임에 대해 소개해 주세요.'
              rows={6}
              rules={{
                required: '소개글을 입력해주세요',
                minLength: {
                  value: 10,
                  message: '소개글을 10자 이상 입력해주세요',
                },
              }}
            />
          </LabeledWrapper>

          <LabeledWrapper
            label='지역'
            contentPosition='bottom'
          >
            <LocationSelector
              name='region'
              control={control}
              rules={{ required: '지역을 선택해주세요' }}
            />
          </LabeledWrapper>

          <LabeledWrapper
            label='날짜'
            contentPosition='bottom'
          >
            <DateSelector
              name='dateRange'
              control={control}
              placeholder='날짜를 선택해주세요'
              rules={{ required: '날짜를 선택해주세요' }}
            />
          </LabeledWrapper>

          <LabeledWrapper
            label='성별'
            contentPosition='bottom'
          >
            <GenderSelector
              name='gender'
              control={control}
              rules={{ required: '성별을 선택해주세요' }}
            />
          </LabeledWrapper>
          <LabeledWrapper
            label='연령대'
            contentPosition='bottom'
            gap={5}
          >
            <AgeRangeSlider
              name='ageRange'
              control={control}
            />
          </LabeledWrapper>

          <LabeledWrapper
            label='참여 인원 수'
            className='h-12'
          >
            <FormCounter
              name='maxParticipants'
              control={control}
              min={2}
              max={100}
              showError={false}
              rules={{
                required: '참여 인원 수를 설정해주세요',
                min: { value: 2, message: '최소 2명 이상이어야 합니다' },
                max: { value: 100, message: '최대 100명까지 가능합니다' },
              }}
            />
          </LabeledWrapper>

          <LabeledWrapper
            label='태그 추가'
            contentPosition='bottom'
          >
            <TagInput
              name='tags'
              control={control}
              rules={{
                required: '태그를 하나 이상 추가해주세요',
                validate: (value) =>
                  value.length > 0 || '태그를 하나 이상 추가해주세요',
              }}
            />
          </LabeledWrapper>

          <div className='fixed right-0 bottom-0 left-0 z-20 bg-white p-6'>
            <FormActions
              onSubmit={handleSubmit(onSubmit)}
              onReset={onReset}
              isValid={isValid}
              isSubmitting={createGroupMutation.isPending}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateGroupPage;
