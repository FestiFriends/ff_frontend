'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import {
  FormTextInput,
  FormTextArea,
  FormCounter,
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
import { useGetPerformanceDetail } from '@/hooks';
import { groupCreateSchema } from '@/schema/groupsCreate';
import { CreateGroupFormData } from '@/types/group';

const DEFAULT_VALUES: CreateGroupFormData = {
  name: '',
  category: '탐승',
  title: '',
  description: '',
  region: '',
  dateRange: { startDate: null, endDate: null },
  gender: '혼성',
  ageRange: [20, 80],
  maxParticipants: 10,
  tags: [],
};

interface Props {
  performanceTitle?: string;
}

const CreateGroupPage = ({ performanceTitle }: Props) => {
  const pathname = usePathname();
  const performanceId = pathname.split('/')[2];
  const { data: performanceDetail } = useGetPerformanceDetail(performanceId);
  const performanceName = performanceTitle || performanceDetail?.data?.title;

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid },
  } = useForm<CreateGroupFormData>({
    resolver: zodResolver(groupCreateSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const onSubmit = async (data: CreateGroupFormData) => {
    try {
      console.log('Form submitted:', data);
      // TODO: 서버 액션 추가
    } catch (error) {
      console.error('Error creating group:', error);
    }
  };

  const onReset = () => {
    reset(DEFAULT_VALUES);
  };

  return (
    <div className='relative mx-auto min-h-screen max-w-md'>
      <h1 className='sr-only'>모임 개설</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mx-auto flex flex-col gap-12.5 p-6 pb-4'
      >
        <LabeledWrapper label='공연 이름'>
          <FormTextInput
            name='name'
            control={control}
            placeholder={performanceName}
            disabled={true}
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
        >
          <AgeRangeSlider
            name='ageRange'
            control={control}
          />
        </LabeledWrapper>

        <LabeledWrapper label='참여 인원 수'>
          <FormCounter
            name='maxParticipants'
            control={control}
            min={1}
            max={100}
            rules={{
              required: '참여 인원 수를 설정해주세요',
              min: { value: 1, message: '최소 1명 이상이어야 합니다' },
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
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateGroupPage;
