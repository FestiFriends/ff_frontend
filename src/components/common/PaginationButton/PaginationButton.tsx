'use client';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  // 페이지 번호 배열 생성 (현재 페이지 기준으로 앞뒤 2개씩)
  const getPageNumbers = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className='mt-8 flex items-center justify-center gap-2'>
      {/* 이전 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className='flex h-8 w-8 items-center justify-center rounded border hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <ChevronLeft size={16} />
      </button>

      {/* 첫 페이지 */}
      {pageNumbers[0] > 1 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className='h-8 w-8 rounded border hover:bg-gray-100'
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span className='px-2'>...</span>}
        </>
      )}

      {/* 페이지 번호들 */}
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`h-8 w-8 rounded border ${
            page === currentPage
              ? 'bg-blue-500 text-white'
              : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      ))}

      {/* 마지막 페이지 */}
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className='px-2'>...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className='h-8 w-8 rounded border hover:bg-gray-100'
          >
            {totalPages}
          </button>
        </>
      )}

      {/* 다음 페이지 버튼 */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='flex h-8 w-8 items-center justify-center rounded border hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
};

export default Pagination;
