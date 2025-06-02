import React, { useId } from 'react';
import { RadioGroupProvider } from './RadioGroupContext';

interface RadioGroupProps {
  direction?: 'horizontal' | 'vertical';
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
  children: React.ReactNode;
  gap?: number;
  columns?: number;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  direction = 'vertical',
  value,
  onChange,
  name,
  className = '',
  children,
  gap = 12,
  columns,
}) => {
  const generatedId = useId();
  const groupName = name || `radio-group-${generatedId}`;

  const directionStyles = {
    horizontal: {
      ...(columns
        ? {
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridAutoFlow: 'row',
          }
        : {
            gridAutoFlow: 'column',
            gridAutoColumns: '1fr',
          }),
    },
    vertical: {
      gridTemplateColumns: '1fr',
      gridAutoFlow: 'row',
    },
  };
  const gridStyle = {
    display: 'grid',
    gap: `${gap}px`,
    ...directionStyles[direction],
  };

  return (
    <RadioGroupProvider
      value={value}
      onChange={onChange}
      name={groupName}
    >
      <div
        className={`radio-group ${className}`}
        style={gridStyle}
        role='radiogroup'
      >
        {children}
      </div>
    </RadioGroupProvider>
  );
};

export default RadioGroup;
