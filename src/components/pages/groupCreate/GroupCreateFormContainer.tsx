'use client';

import React, { useState } from 'react';
import { LabeledWrapper } from '@/components/pages/groupCreate';
import { useStyles } from '@/hooks';

const GroupCreateFormContainer = () => {
  const { getButtonClasses } = useStyles();
  const [selectedType, setSelectedType] = useState<string>('');

  const handleTypeClick = (type: string) => {
    setSelectedType(type);
  };

  return (
    <>
      <div className='flex w-full flex-col gap-12.5 px-4'>
        <LabeledWrapper label='공연 이름'>
          <div>공연 이름</div>
        </LabeledWrapper>
        <LabeledWrapper
          label='종류'
          contentPosition='bottom'
        >
          <div className='flex gap-2'>
            {['동행', '탑승', '숙박'].map((type) => (
              <button
                key={type}
                className={getButtonClasses(selectedType === type)}
                onClick={() => handleTypeClick(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </LabeledWrapper>
        <LabeledWrapper
          label='제목'
          contentPosition='bottom'
        >
          <input type='text' />
        </LabeledWrapper>
        <LabeledWrapper
          label='소개글'
          contentPosition='bottom'
        >
          <textarea />
        </LabeledWrapper>
        <LabeledWrapper
          label='지역'
          contentPosition='bottom'
        >
          <span>지역 선택</span>
        </LabeledWrapper>
        <LabeledWrapper
          label='날짜'
          contentPosition='bottom'
        >
          <span>날짜 선택</span>
        </LabeledWrapper>
        <LabeledWrapper
          label='종류'
          contentPosition='bottom'
        >
          <div className='flex gap-2'>
            {['여성', '남성', '혼성'].map((type) => (
              <button
                key={type}
                className={getButtonClasses(selectedType === type)}
                onClick={() => handleTypeClick(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </LabeledWrapper>
      </div>
    </>
  );
};

export default GroupCreateFormContainer;
