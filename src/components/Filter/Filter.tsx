'use client';

import { cn } from '@/lib/utils';
import Button from '../button/Button';

interface FilterProps {
  name: string;
  options: filterOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

interface filterOption {
  label: string;
  value: string;
}

const Filter = ({
  name,
  options,
  value,
  onChange,
  placeholder = '선택',
  className,
}: FilterProps) => {
  return (
    <div className={cn('inline-block', className)}>
      <Button>{value || placeholder}</Button>
    </div>
  );
};

export default Filter;
