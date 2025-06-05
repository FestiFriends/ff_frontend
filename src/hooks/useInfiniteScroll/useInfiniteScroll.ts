import { useEffect, useRef } from 'react';

export const useInfiniteScroll = <T extends HTMLElement>(
  fetchNextPage: () => void,
  hasNextPage: boolean
) => {
  const bottomRef = useRef<T | null>(null);

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  return bottomRef;
};
