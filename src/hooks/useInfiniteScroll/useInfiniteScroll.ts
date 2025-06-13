import { useEffect, useRef } from 'react';

export const useInfiniteScroll = <T extends HTMLElement>(
  fetchNextPage: () => void,
  hasNextPage: boolean,
  isFetchingNextPage?: boolean
) => {
  const bottomRef = useRef<T | null>(null);

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage, isFetchingNextPage]);

  return bottomRef;
};
