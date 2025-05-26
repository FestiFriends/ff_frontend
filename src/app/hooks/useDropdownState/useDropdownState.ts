import { useCallback, useState } from 'react';

const useDropdownState = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState('');

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeDropdown = useCallback(() => setIsOpen(false), []);

  return {
    isOpen,
    toggleDropdown,
    closeDropdown,
    selectedItem,
    setSelectedItem,
  };
};

export default useDropdownState;
