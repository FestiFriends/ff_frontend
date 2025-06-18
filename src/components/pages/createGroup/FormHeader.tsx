// components/pages/groupCreate/FormHeader.tsx
import React from 'react';

interface FormHeaderProps {
  title: string;
  subtitle?: string;
}

const FormHeader: React.FC<FormHeaderProps> = ({ title, subtitle }) => (
  <div className='mb-8 text-center'>
    <h1 className='text-xl font-bold text-gray-900'>{title}</h1>
    {subtitle && <p className='mt-2 text-gray-600'>{subtitle}</p>}
  </div>
);

export default FormHeader;
