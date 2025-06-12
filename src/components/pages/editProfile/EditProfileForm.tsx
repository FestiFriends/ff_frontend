'use client';

import { useState } from 'react';
import TextInput from '@/components/common/TextInput/TextInput';
import { GenderType } from '@/types/enums';
import GenderSelect from './GenderSelect';

const EditProfileForm = () => {
  const [nickname, setNickname] = useState<string>('');
  const [gender, setGender] = useState<GenderType | ''>('');

  return (
    <div>
      <TextInput
        label='닉네임'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder='닉네임을 입력해주세요'
        helperText='변경 가능한 닉네임입니다.'
      />

      <div>
        입력된 닉네임:<span>{nickname}</span>
      </div>

      <div>
        <p className='mb-2 text-14_B'>성별</p>
        <GenderSelect
          value={gender}
          onChange={setGender}
        />
      </div>
    </div>
  );
};

export default EditProfileForm;
