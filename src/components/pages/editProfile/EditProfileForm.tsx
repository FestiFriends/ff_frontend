'use client';

import { useState } from 'react';
import MultiSlider from '@/components/common/MultiSlider/MultiSlider';
import TextareaInput from '@/components/common/TextareaInput/TextareaInput';
import TextInput from '@/components/common/TextInput/TextInput';
import { GenderType } from '@/types/enums';
import GenderSelect from './GenderSelect';
import ProfileImageInput from './ProfileImageInput';

const EditProfileForm = () => {
  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<GenderType | ''>('');
  const [ageRange, setAgeRange] = useState<[number, number]>([30, 60]);
  const [description, setDescription] = useState('');
  const [snsId, setSnsId] = useState('');

  return (
    <div>
      <ProfileImageInput />
      <p className='mb-2 text-14_B'>닉네임</p>
      <TextInput
        label='닉네임'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder='닉네임을 입력해주세요'
        helperText='변경 가능한 닉네임입니다.'
      />

      <div>
        <p className='mb-2 text-14_B'>성별</p>
        <GenderSelect
          value={gender}
          onChange={setGender}
        />
      </div>
      <p className='mb-2 text-14_B'>연령대</p>
      <div className='mb-10'>
        <MultiSlider
          min={20}
          max={80}
          step={10}
          value={ageRange}
          onChange={setAgeRange}
          valuePosition='none'
          marks={{
            20: '20세 이하',
            30: '30세',
            40: '40세',
            50: '50세',
            60: '60세',
            70: '70세',
            80: '80세 이상',
          }}
        />
      </div>

      <p className='mb-2 text-14_B'>소개글</p>
      <TextareaInput
        value={description}
        onChange={setDescription}
        placeholder='자기소개를 입력해주세요'
        maxLength={150}
        rows={5}
      />

      <p className='mb-2 text-14_B'>SNS 아이디</p>
      <TextInput
        placeholder='인스타그램 아이디'
        value={snsId}
        onChange={(e) => setSnsId(e.target.value)}
      />
    </div>
  );
};

export default EditProfileForm;
