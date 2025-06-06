import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { GroupsResponse } from '@/types/group';

interface PerformanceDetailGroupsPaginationProps {
  groups?: GroupsResponse;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

const PerformanceDetailGroupsPagination = ({
  groups,
  currentPage,
  setCurrentPage,
}: PerformanceDetailGroupsPaginationProps) => {
  const handlePaginationClick = (page: number) => {
    if (page < 1 || page > groups.totalPages) return;
    setCurrentPage(page);
  };

  const renderPaginationItem = () => {
    const paginationArr = Array.from(
      { length: groups.totalPages },
      (_, i: number) => i + 1
    );

    return paginationArr.map((page) => (
      <PaginationItem key={page}>
        <PaginationLink
          onClick={() => handlePaginationClick(page)}
          isActive={currentPage === page}
        >
          {page}
        </PaginationLink>
      </PaginationItem>
    ));
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => handlePaginationClick(currentPage - 1)}
          />
        </PaginationItem>

        {renderPaginationItem()}

        <PaginationItem>
          <PaginationNext
            onClick={() => handlePaginationClick(currentPage + 1)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
export default PerformanceDetailGroupsPagination;
