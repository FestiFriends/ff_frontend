import { useEffect } from 'react';

interface UseOutsideClickProps {
  ref: React.RefObject<HTMLElement | null>;
  onClose: () => void;
}

const useClickOutside = ({ ref, onClose }: UseOutsideClickProps) => {
  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, onClose]);
};

export default useClickOutside;
