'use client';
import React, { useState } from 'react';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { useSearchParams } from 'next/navigation';
import { LoadingOverlay } from '@/components/common';
import QueryPagination from '@/components/common/QueryPagination/QueryPagination';
import { reportListOption } from '@/hooks/reportHooks/reportHooks';
import AdminCheck from './AdminCheck';
import ReportCard from './ReportCard';

const ReportsMain = () => {
  const [isAccept, setIsAccept] = useState(false);
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const handleAccept = (accept: boolean) => {
    setIsAccept(accept);
  };

  if (!isAccept) {
    return <AdminCheck onAccept={handleAccept} />;
  }

  return (
    <ErrorBoundary fallback={({ error }) => <p>{error.message}</p>}>
      <Suspense fallback={<LoadingOverlay />}>
        <SuspenseQuery {...reportListOption(page)}>
          {({ data }) => {
            if (data.totalElements === 0) {
              return <p>데이터가 존재하지 않습니다.</p>;
            } else {
              return (
                <>
                  <ul className='flex h-full flex-col justify-between gap-3 p-5'>
                    {data.data.map((item) => (
                      <ReportCard
                        key={item.id}
                        data={item}
                      />
                    ))}

                    <QueryPagination
                      totalPages={data.totalPages}
                      maxVisiblePages={5}
                      className='mt-4'
                    />
                  </ul>
                </>
              );
            }
          }}
        </SuspenseQuery>
      </Suspense>
    </ErrorBoundary>
  );
};

export default ReportsMain;
