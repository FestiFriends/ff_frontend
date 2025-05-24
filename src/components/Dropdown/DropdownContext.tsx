import { createContext, useContext } from 'react';

interface DropdownContextType {
  isOpen: boolean;
  toggleDropdown: () => void;
  closeDropdown: () => void;
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

export const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

export const useDropdownContext = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown 컴포넌트 내부에서만 사용할 수 있습니다.');
  return ctx;
};
