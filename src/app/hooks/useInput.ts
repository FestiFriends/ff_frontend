'use client';

import { useState, ChangeEvent } from 'react';

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setTouched(true);
  };

  const reset = () => {
    setValue('');
    setTouched(false);
  };

  return { value, onChange, onBlur, setValue, reset, touched };
};

export default useInput;
