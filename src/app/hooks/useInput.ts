'use client';

import { useState, ChangeEvent } from 'react';

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const reset = () => setValue('');

  return { value, onChange, setValue, reset };
};

export default useInput;
