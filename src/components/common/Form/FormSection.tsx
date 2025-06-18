// TODO: 왜 필요?
import React, { ReactNode } from 'react';

interface FormSectionProps {
  children: ReactNode;
  className?: string;
}

const FormSection: React.FC<FormSectionProps> = ({
  children,
  className = '',
}) => <div className={`mb-6 ${className}`}>{children}</div>;

export default FormSection;
