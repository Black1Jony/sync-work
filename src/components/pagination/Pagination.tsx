import { useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalItems: number;
  currentPage?: number;
}

const Pagination = ({ totalItems, currentPage = 1 }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const limit = Number(searchParams.get('limit')) || 10;
  const totalPages = Math.ceil(totalItems / limit);

  const handlePageChange = (page: number) => {
    const newParams = new URLSearchParams(searchParams);
    page === 1 ? newParams.delete('page') : newParams.set('page', String(page));
    setSearchParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    pages.push(1);
    if (currentPage > 3) pages.push('...');
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      pages.push(i);
    }
    if (currentPage < totalPages - 2) pages.push('...');
    if (totalPages > 1) pages.push(totalPages);
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-6 py-4 bg-[#1a1a1a] border border-white/5 rounded-xl">
      <div className="text-sm text-gray-400">
        <span className="text-white font-medium">{(currentPage - 1) * limit + 1}</span> -
        <span className="text-white font-medium"> {Math.min(currentPage * limit, totalItems)}</span> of
        <span className="text-white font-medium"> {totalItems}</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg border border-white/10 text-gray-400 hover:border-orange-500/50 hover:text-orange-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && handlePageChange(page)}
              disabled={page === '...'}
              className={`min-w-[40px] h-10 px-3 rounded-lg text-sm font-medium transition-all ${
                page === currentPage
                  ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                  : page === '...'
                  ? 'text-gray-600 cursor-default'
                  : 'text-gray-400 border border-white/10 hover:border-orange-500/50 hover:text-orange-400'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg border border-white/10 text-gray-400 hover:border-orange-500/50 hover:text-orange-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
