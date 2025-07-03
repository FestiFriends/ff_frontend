import { useEffect } from 'react';

type SingleOrArray<T> = T | T[];

interface UseOutsideClickProps {
  ref: SingleOrArray<React.RefObject<HTMLElement | null>>;
  onClose: () => void;
}

const useClickOutside = ({ ref, onClose }: UseOutsideClickProps) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      const refs = Array.isArray(ref) ? ref : [ref];

      const clickedInside = refs.some((r) =>
        r.current?.contains(e.target as Node)
      );
      if (clickedInside) return;

      e.preventDefault();
      e.stopPropagation();
      onClose();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('touchstart', handleClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('touchstart', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [ref, onClose]);
};

export default useClickOutside;
