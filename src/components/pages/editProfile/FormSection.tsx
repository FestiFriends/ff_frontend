interface FormSectionProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

const FormSection = ({ label, children, className }: FormSectionProps) => (
  <div className={className}>
    <p className='mt-[30px] mb-[10px] text-14_B'>{label}</p>
    {children}
  </div>
);

export default FormSection;
