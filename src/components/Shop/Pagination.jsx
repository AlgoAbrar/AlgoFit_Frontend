import { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiMoreHorizontal,
} from "react-icons/fi";

const Pagination = ({
  totalPages,
  currentPage,
  handlePageChange,
  siblingCount = 1,
  boundaryCount = 1,
}) => {
  const [pageRange, setPageRange] = useState([]);

  useEffect(() => {
    // Generate page numbers with ellipses
    const range = [];
    const totalNumbers = siblingCount * 2 + 3 + boundaryCount * 2;
    const totalBlocks = totalNumbers + 2;

    if (totalPages <= totalBlocks) {
      // Show all pages if total pages is less than calculated blocks
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      const startPages = [];
      const endPages = [];

      // Start pages
      for (let i = 1; i <= boundaryCount; i++) {
        startPages.push(i);
      }

      // End pages
      for (let i = totalPages - boundaryCount + 1; i <= totalPages; i++) {
        endPages.push(i);
      }

      // Siblings around current page
      const siblingsStart = Math.max(
        Math.min(
          currentPage - siblingCount,
          totalPages - boundaryCount - siblingCount * 2 - 1
        ),
        boundaryCount + 2
      );

      const siblingsEnd = Math.min(
        Math.max(
          currentPage + siblingCount,
          boundaryCount + siblingCount * 2 + 2
        ),
        totalPages - boundaryCount - 1
      );

      // Add start pages
      range.push(...startPages);

      // Add first ellipsis if needed
      if (siblingsStart > boundaryCount + 2) {
        range.push("ellipsis-start");
      } else if (boundaryCount + 1 < totalPages - boundaryCount) {
        range.push(boundaryCount + 1);
      }

      // Add sibling pages
      for (let i = siblingsStart; i <= siblingsEnd; i++) {
        range.push(i);
      }

      // Add second ellipsis if needed
      if (siblingsEnd < totalPages - boundaryCount - 1) {
        range.push("ellipsis-end");
      } else if (totalPages - boundaryCount > boundaryCount) {
        range.push(totalPages - boundaryCount);
      }

      // Add end pages
      range.push(...endPages);
    }

    setPageRange(range);
  }, [totalPages, currentPage, siblingCount, boundaryCount]);

  if (totalPages <= 1) return null;

  const showFirst = currentPage > 1;
  const showLast = currentPage < totalPages;
  const showPrev = currentPage > 1;
  const showNext = currentPage < totalPages;

  return (
    <div className="flex flex-col items-center gap-4 mb-8">
      {/* Page Info */}
      <div className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* First Page */}
        {showFirst && (
          <button
            onClick={() => handlePageChange(1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
            aria-label="Go to first page"
          >
            <FiChevronsLeft className="w-4 h-4" />
          </button>
        )}

        {/* Previous Page */}
        {showPrev && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
            aria-label="Go to previous page"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
        )}

        {/* Page Numbers */}
        {pageRange.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span
                key={index}
                className="w-10 h-10 flex items-center justify-center text-gray-400"
              >
                <FiMoreHorizontal className="w-4 h-4" />
              </span>
            );
          }

          return (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-all duration-200 ${
                currentPage === page
                  ? "bg-gradient-to-r from-primary to-primary-dark text-white border-transparent shadow-md"
                  : "border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              }`}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          );
        })}

        {/* Next Page */}
        {showNext && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
            aria-label="Go to next page"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Last Page */}
        {showLast && (
          <button
            onClick={() => handlePageChange(totalPages)}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-200"
            aria-label="Go to last page"
          >
            <FiChevronsRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Quick Navigation */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Go to page:</span>
        <input
          type="number"
          min="1"
          max={totalPages}
          defaultValue={currentPage}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                handlePageChange(page);
                e.target.value = "";
              }
            }
          }}
          className="w-16 p-1 text-center border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>
    </div>
  );
};

export default Pagination;
