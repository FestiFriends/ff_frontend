'use client';

import type { KeyboardEvent } from 'react';
import { ReportReasonLabels } from '@/constants/reportLabels';
import { cn } from '@/lib/utils';
import { ReportReasonType } from '@/types/enums';

interface ReportItemProps {
  reportedAt: string;
  reason: ReportReasonType;
  onClick: () => void;
  className?: string;
}

// TODO: date-fns 적용 후 제거 예정
const formatDateTime = (iso: string): string => {
  const date = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, '0');

  const year = date.getFullYear().toString().slice(-2);
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

const ReportItem = ({
  reportedAt,
  reason,
  onClick,
  className,
}: ReportItemProps) => {
  // 키보드 조작
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      role='button'
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'flex flex-col gap-1 rounded-md border border-gray-200 bg-white p-4 shadow-sm',
        className
      )}
    >
      <div className='text-xs text-gray-500'>{formatDateTime(reportedAt)}</div>
      <div className='text-base font-medium text-gray-800'>
        {ReportReasonLabels[reason]}
      </div>
    </div>
  );
};

export default ReportItem;
