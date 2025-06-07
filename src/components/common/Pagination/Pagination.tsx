'use client';

import {
  Pagination as PaginationContainer,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 5,
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
    <PaginationContainer>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious onClick={goToPrevPage} />
        </PaginationItem>

        {getPageNumbers().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              onClick={() => onPageChange(page)}
              className={page === currentPage ? 'font-bold underline' : ''}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext onClick={goToNextPage} />
        </PaginationItem>
      </PaginationContent>
    </PaginationContainer>
  );
};

export default Pagination;
