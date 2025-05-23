import { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick: () => void;
}

const Button = ({
  variant = 'md',
  className,
  onClick,
  children,
}: PropsWithChildren<ButtonProps>) => {
  const buttonClasses = cn(
    // default style
    'cursor-pointer',

    // variant style (변경 필요)
    {
      'p-1': variant === 'sm',
      'p-2': variant === 'md',
      'p-3': variant === 'lg',
    },

    // custom style
    className
  );

  return (
    <button className={buttonClasses} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
