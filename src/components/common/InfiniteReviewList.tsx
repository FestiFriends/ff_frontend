'use client';

import { Fragment, ReactNode } from 'react';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
import { cn } from '@/lib/utils';
import type { ApiResponse } from '@/types/api';
import type {
  UseSuspenseInfiniteQueryResult,
  InfiniteData,
  UseSuspenseInfiniteQueryOptions,
} from '@tanstack/react-query';

type InfiniteReviewListProps<TPage extends { data: TData[] }, TData> = {
  options: UseSuspenseInfiniteQueryOptions<
    TPage,
    ApiResponse,
    InfiniteData<TPage>,
    TPage,
    string[],
    number | undefined
  >;
  getDataId: (data: TData) => string | number;
  renderData: (data: TData) => ReactNode;
  fallback?: ReactNode;
  isFetchingFallback?: ReactNode;
  className?: string;
};

const ContentList = <TPage extends { data: TData[] }, TData>({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  getDataId,
  renderData,
  isFetchingFallback = <p>로딩 중...</p>,
  className,
}: UseSuspenseInfiniteQueryResult<InfiniteData<TPage>, ApiResponse>
  & Omit<InfiniteReviewListProps<TPage, TData>, 'options' | 'fallback'>) => {
  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  return (
    <>
      <div className={cn('flex flex-col items-center gap-5', className)}>
        {data.pages.flatMap((page) =>
          page.data.map((data) => (
            <Fragment key={getDataId(data)}>{renderData(data)}</Fragment>
          ))
        )}
      </div>
      <div ref={bottomRef} />
      {isFetchingNextPage && isFetchingFallback}
    </>
  );
};

const InfiniteReviewList = <TPage extends { data: TData[] }, TData>({
  options,
  getDataId,
  renderData,
  fallback = <p>로딩 중...</p>,
  isFetchingFallback = <p>로딩 중...</p>,
}: InfiniteReviewListProps<TPage, TData>) => (
  <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
    <Suspense fallback={fallback}>
      <SuspenseInfiniteQuery {...options}>
        {(queryResult) => (
          <ContentList
            {...queryResult}
            getDataId={getDataId}
            renderData={renderData}
            isFetchingFallback={isFetchingFallback}
          />
        )}
      </SuspenseInfiniteQuery>
    </Suspense>
  </ErrorBoundary>
);

export default InfiniteReviewList;
