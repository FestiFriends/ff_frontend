import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'normalPrimary'
    | 'normalSecondary'
    | 'labelPrimary'
    | 'labelSecondary'
    | 'disablePrimary'
    | 'disableSecondary';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  variant = 'normalPrimary',
  size = 'md',
  disabled,
  className,
  onClick,
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const buttonClasses = cn(
    // default style
    'inline-flex h-[42px] w-full cursor-pointer items-center justify-center rounded-12 text-center text-14_M',

    // variant style
    {
      'bg-primary-red text-white': variant === 'normalPrimary',
      'border border-primary-red text-primary-red':
        variant === 'normalSecondary',
      'bg-[#FFEEEF] text-primary-red': variant === 'labelPrimary',
      'border border-primary-100 text-primary-red':
        variant === 'labelSecondary',
      'bg-gray-200 text-gray-100': variant === 'disablePrimary',
      'border border-gray-200 text-gray-100': variant === 'disableSecondary',
    },

    // size style
    {
      'px-2 py-1': size === 'sm',
      'px-5 py-2.5': size === 'md',
      'px-8 py-2': size === 'lg',
    },

    // disabled style
    disabled && 'cursor-not-allowed border-none bg-gray-200 text-white',

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
