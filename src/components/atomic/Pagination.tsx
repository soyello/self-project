import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

interface Props {
  currentPage: number;
  totalCount: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalCount, itemsPerPage, onPageChange }: Props) => {
  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const PAGE_GROUP_SIZE = 10;
  const currentPageGroup = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE);
  const startPage = currentPageGroup * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  const visiblePages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  if (totalPages === 0) return null;

  const handlePageClick = (page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <div className='flex items-center gap-2 justify-center mt-4'>
      <button onClick={() => handlePageClick(1)} disabled={currentPage === 1} className='disabled:opacity-30'>
        <div className='rotate-180'>
          <KeyboardDoubleArrowRightIcon sx={{ color: 'inherit', fontSize: 30 }} />
        </div>
      </button>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className='disabled:opacity-30'
      >
        <div className='rotate-180 flex justify-center items-center'>
          <ArrowForwardIosIcon sx={{ color: 'inherit', fontSize: 20 }} />
        </div>
      </button>
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`text-sm font-bold w-6 h-6 rounded ${
            currentPage === page ? 'bg-primary-red-10 text-primary-red-50' : 'bg-white text-gray-70'
          }`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='disabled:opacity-30'
      >
        <div className='flex justify-center items-center'>
          <ArrowForwardIosIcon sx={{ color: 'inherit', fontSize: 20 }} />
        </div>
      </button>
      <button
        onClick={() => handlePageClick(totalPages)}
        disabled={currentPage === totalPages}
        className='disabled:opacity-30'
      >
        <KeyboardDoubleArrowRightIcon sx={{ color: 'inherit', fontSize: 30 }} />
      </button>
    </div>
  );
};

export default Pagination;
