'use client';

import { ChangeEvent, useState } from 'react';

type Validator = (value: string) => string | undefined;

type Validators<T> = {
  [Key in keyof T]?: Validator;
};

export const useForm = <T extends Record<string, string>>(
  initialValues: T,
  validators: Validators<T> = {}
) => {
  const [form, setForm] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    Object.keys(initialValues).reduce(
      (acc, key) => {
        acc[key as keyof T] = false;
        return acc;
      },
      {} as Record<keyof T, boolean>
    )
  );

  const onChange = (name: keyof T) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onBlur = (name: keyof T) => () => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const reset = () => {
    setForm(initialValues);
    setTouched(
      Object.keys(initialValues).reduce(
        (acc, key) => {
          acc[key as keyof T] = false;
          return acc;
        },
        {} as Record<keyof T, boolean>
      )
    );
  };

  const errors = Object.keys(validators).reduce(
    (acc, key) => {
      const typedKey = key as keyof T;
      const validate = validators[typedKey];
      const isTouched = touched[typedKey];
      const value = form[typedKey];

      if (validate && isTouched) {
        const error = validate(value);
        if (error) acc[typedKey] = error;
      }
      return acc;
    },
    {} as Partial<Record<keyof T, string>>
  );

  return {
    form,
    setForm,
    touched,
    onChange,
    onBlur,
    reset,
    errors,
  };
};
