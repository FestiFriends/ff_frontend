'use client';
import React, { useState } from 'react';
import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { useSearchParams } from 'next/navigation';
import { LoadingOverlay } from '@/components/common';
import QueryPagination from '@/components/common/QueryPagination/QueryPagination';
import StateNotice from '@/components/common/StateNotice/StateNotice';
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
              return <StateNotice preset='reportEmpty' />;
            } else {
              return (
                <>
                  <div className='flex h-full flex-col justify-between p-5'>
                    <ul className='flex flex-col gap-3'>
                      {data.data.map((item) => (
                        <ReportCard
                          key={item.id}
                          data={item}
                        />
                      ))}
                    </ul>

                    <QueryPagination
                      totalPages={data.totalPages}
                      maxVisiblePages={5}
                      className='mt-4'
                    />
                  </div>
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
