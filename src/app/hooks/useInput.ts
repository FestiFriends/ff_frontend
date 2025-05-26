'use client';

import { useState, ChangeEvent } from 'react';

const useInput = (
  initialValue = '',
  validate?: (_value: string) => string | undefined
) => {
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

  const error = touched && validate ? validate(value) : undefined;

  return { value, onChange, onBlur, setValue, reset, touched, error };
};

export default useInput;
