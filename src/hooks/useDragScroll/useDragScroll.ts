import { useRef, useCallback, useEffect } from 'react';

interface UseDragScrollOptions {
  direction?: 'horizontal' | 'vertical' | 'both';
  sensitivity?: number;
}

export const useDragScroll = <T extends HTMLElement>(
  options: UseDragScrollOptions = {}
) => {
  const { direction = 'horizontal', sensitivity = 1 } = options;
  const elementRef = useRef<T>(null);
  const isDragging = useRef(false);
  const startPosition = useRef({ x: 0, y: 0 });
  const scrollStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = useCallback((e: MouseEvent) => {
    if (!elementRef.current) return;

    isDragging.current = true;
    startPosition.current = { x: e.clientX, y: e.clientY };
    scrollStart.current = {
      x: elementRef.current.scrollLeft,
      y: elementRef.current.scrollTop,
    };

    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging.current || !elementRef.current) return;

      e.preventDefault();

      const deltaX = (startPosition.current.x - e.clientX) * sensitivity;
      const deltaY = (startPosition.current.y - e.clientY) * sensitivity;

      if (direction === 'horizontal' || direction === 'both') {
        elementRef.current.scrollLeft = scrollStart.current.x + deltaX;
      }

      if (direction === 'vertical' || direction === 'both') {
        elementRef.current.scrollTop = scrollStart.current.y + deltaY;
      }
    },
    [direction, sensitivity]
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isDragging.current = false;
  }, []);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    element.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave]);

  return elementRef;
};
