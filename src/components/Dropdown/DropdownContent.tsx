'use client';

import { PropsWithChildren } from 'react';
import { useDropdownContext } from './DropdownContext';

const DropdownContent = ({ children }: PropsWithChildren) => {
  const { isOpen } = useDropdownContext();
  if (!isOpen) return null;

  return <ul className='absolute z-10'>{children}</ul>;
};

export default DropdownContent;
