'use client';

import { useState } from 'react';
import TextInput from '@/components/common/TextInput/TextInput';

const EditProfileForm = () => {
  const [nickname, setNickname] = useState('');

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
    </div>
  );
};

export default EditProfileForm;
