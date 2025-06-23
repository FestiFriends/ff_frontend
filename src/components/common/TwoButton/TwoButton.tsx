import React from 'react';
import { Button, buttonStyles } from '@/components/common';
import { cn } from '@/lib/utils';

interface TwoButtonProps {
  leftText: string;
  rightText: string;
  leftAction?: () => void;
  rightAction?: () => void;
  leftVariant?: keyof typeof buttonStyles.variants;
  rightVariant?: keyof typeof buttonStyles.variants;

  leftDisabled?: boolean;
  rightDisabled?: boolean;
  onRightDisabledClick?: () => void;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
}

const TwoButton = ({
  leftText,
  rightText,
  leftAction,
  rightAction,
  leftVariant = 'secondary',
  rightVariant = 'primary',
  leftDisabled = false,
  rightDisabled = false,
  onRightDisabledClick,
  className,
  leftClassName,
  rightClassName,
}: TwoButtonProps) => {
  const handleRightClick = () => {
    if (rightDisabled && onRightDisabledClick) {
      onRightDisabledClick();
      return;
    }

    if (!rightDisabled && rightAction) {
      rightAction();
    }
  };

  return (
    <div className={cn('flex gap-4', className)}>
      <Button
        type='button'
        onClick={leftAction}
        disabled={leftDisabled}
        variant={leftVariant}
        className={cn('flex-1 whitespace-nowrap', leftClassName)}
      >
        {leftText}
      </Button>
      <Button
        type='button'
        onClick={handleRightClick}
        disabled={!onRightDisabledClick && rightDisabled}
        variant={rightVariant}
        className={cn(
          'flex-1 whitespace-nowrap',
          rightDisabled
            && !onRightDisabledClick
            && 'cursor-not-allowed opacity-50',
          rightDisabled && onRightDisabledClick && 'cursor-pointer opacity-50',
          rightClassName
        )}
      >
        {rightText}
      </Button>
    </div>
  );
};

export default TwoButton;
