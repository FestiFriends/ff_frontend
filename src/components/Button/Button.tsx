import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outlined';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  disabled,
  className,
  onClick,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  // Todo: 디자인 받은 후 스타일 변경 필요
  const buttonClasses = cn(
    // default style
    'inline-flex cursor-pointer items-center justify-center rounded-sm text-center',

    // variant style
    {
      'bg-blue-500': variant === 'primary',
      'bg-gray-500': variant === 'secondary',
      'bg-red-500': variant === 'danger',
      'border-2 border-gray-500': variant === 'outlined',
    },

    // size style
    {
      'px-2 py-1': size === 'sm',
      'px-5 py-1.5': size === 'md',
      'px-8 py-2': size === 'lg',
    },

    // disabled style
    disabled && 'cursor-not-allowed bg-gray-200 text-gray-400',

    // custom style
    className
  );

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
