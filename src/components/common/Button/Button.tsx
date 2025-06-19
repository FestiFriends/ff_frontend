import { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';
import { buttonStyles } from './Button.styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof buttonStyles.variants;
  color?: keyof typeof buttonStyles.variants.primary;
  size?: keyof typeof buttonStyles.sizes;
  disabled?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button = ({
  variant = 'primary',
  color = 'normal',
  size = 'full',
  disabled = false,
  className,
  onClick,
  children,
  type = 'button',
  ...props
}: PropsWithChildren<ButtonProps>) => {
  const buttonClasses = cn(
    // default style
    'inline-flex cursor-pointer items-center justify-center rounded-12 text-center text-14_M',
    buttonStyles.variants[variant]?.[color],
    buttonStyles.sizes[size],

    // custom style
    className
  );

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
