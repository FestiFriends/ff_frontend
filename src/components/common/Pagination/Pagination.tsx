'use client';

import ChevronLeftIcon from '@/components/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/icons/ChevronRightIcon';
import { cn } from '@/lib/utils';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
  className,
}: PaginationProps) => {
  const rangeStart =
    Math.floor((currentPage - 1) / maxVisiblePages) * maxVisiblePages + 1;
  const rangeEnd = Math.min(rangeStart + maxVisiblePages - 1, totalPages);

  const getPageNumbers = () =>
    Array.from({ length: rangeEnd - rangeStart + 1 }, (_, i) => rangeStart + i);

  const goToPrevPage = () => {
    if (currentPage === 1) return;
    const prevPage = currentPage - 1;
    onPageChange(prevPage);
  };

  const goToNextPage = () => {
    if (currentPage === totalPages) return;
    const nextPage = currentPage + 1;
    onPageChange(nextPage);
  };

  return (
    <div className={cn('flex items-center justify-center gap-1', className)}>
      <button
        onClick={goToPrevPage}
        className={cn(
          'flex aspect-square h-10 w-10 items-center justify-center px-2 py-1.5 text-gray-950 transition-all',
          currentPage === 1 && 'text-gray-300'
        )}
      >
        <ChevronLeftIcon />
      </button>

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={
            page === currentPage
              ? 'flex aspect-square h-10 w-10 flex-col items-center justify-center border-b-2 border-b-primary-red p-2 text-14_B text-gray-950 transition-all select-none'
              : 'flex aspect-square h-10 w-10 flex-col items-center justify-center p-2 text-14_M text-gray-300 transition-all select-none'
          }
          aria-current={page === currentPage ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={goToNextPage}
        className={cn(
          'flex aspect-square h-10 w-10 items-center justify-center px-2 py-1.5 text-gray-950 transition-all',
          currentPage === totalPages && 'text-gray-300'
        )}
      >
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default Pagination;
