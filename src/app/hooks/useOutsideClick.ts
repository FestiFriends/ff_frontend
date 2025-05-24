import { useEffect } from 'react';

interface UseOutsideClickProps {
  ref: React.RefObject<HTMLElement | null>;
  onClose: () => void;
}

const useOutsideClick = ({ ref, onClose }: UseOutsideClickProps) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, onClose]);
};

export default useOutsideClick;
