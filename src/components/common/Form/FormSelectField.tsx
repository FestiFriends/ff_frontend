import React from 'react';

interface SelectFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onClick?: () => void;
}

const FormSelectField: React.FC<SelectFieldProps> = ({
  value,
  placeholder,
  onClick,
}) => (
  <button
    className='cursor-pointer'
    onClick={onClick}
    aria-label={value || placeholder}
  >
    {value || placeholder}
  </button>
);

export default FormSelectField;
