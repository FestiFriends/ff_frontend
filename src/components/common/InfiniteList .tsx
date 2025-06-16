'use client';

import { Fragment, ReactNode } from 'react';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseInfiniteQuery } from '@suspensive/react-query';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll/useInfiniteScroll';
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
  emptyFallback?: ReactNode;
  className?: string;
};

const ListContent = <TPage extends { data: TData[] }, TData>({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  getDataId,
  renderData,
  isFetchingFallback,
  emptyFallback,
  className,
}: UseSuspenseInfiniteQueryResult<InfiniteData<TPage>, ApiResponse>
  & Omit<InfiniteReviewListProps<TPage, TData>, 'options' | 'fallback'>) => {
  const bottomRef = useInfiniteScroll<HTMLDivElement>(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );

  const datas = data.pages.flatMap((page) => page.data);

  return (
    <>
      <div className={className}>
        {datas.length === 0 && emptyFallback}
        {datas.length > 0
          && datas.map((data) => (
            <Fragment key={getDataId(data)}>{renderData(data)}</Fragment>
          ))}
      </div>
      <div ref={bottomRef} />
      {isFetchingNextPage && isFetchingFallback}
    </>
  );
};

const InfiniteList = <TPage extends { data: TData[] }, TData>({
  options,
  getDataId,
  renderData,
  className,
  emptyFallback = <p>데이터가 없습니다.</p>,
  fallback = <p>로딩 중...</p>,
  isFetchingFallback = <p>로딩 중...</p>,
}: InfiniteReviewListProps<TPage, TData>) => (
  <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
    <Suspense fallback={fallback}>
      <SuspenseInfiniteQuery {...options}>
        {(queryResult) => (
          <ListContent
            {...queryResult}
            getDataId={getDataId}
            renderData={renderData}
            isFetchingFallback={isFetchingFallback}
            emptyFallback={emptyFallback}
            className={className}
          />
        )}
      </SuspenseInfiniteQuery>
    </Suspense>
  </ErrorBoundary>
);

export default InfiniteList;
