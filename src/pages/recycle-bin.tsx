import FilterSearchBar from '@/components/FilterSearchBar';
import IconFrame from '@/components/atomic/IconFrame';
import IconLabel from '@/components/atomic/IconLabel';
import Pagination from '@/components/atomic/Pagination';
import BreadCrumb from '@/components/breadcrumb/BreadCrumb';
import MainLayout from '@/components/layout/MainLayout';
import { RECYCLE_BIN_PAGE_LIMIT_SIZE } from '@/constants/limitConstants';
import { RECYCLE_BIN_SEARCH_FILTER_INFO, RecycleBin } from '@/types/typeCollection';
import DeleteIcon from '@mui/icons-material/Delete';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useEffect, useState } from 'react';

const Page = () => {
  const [searchFilter, setSearchFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recycleBinList, setRecycleBinList] = useState<RecycleBin[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);

  const isAllChecked = recycleBinList.length > 0 && checkedItems.length === recycleBinList.length;

  const handleCheckAll = () => {
    if (isAllChecked) {
      setCheckedItems([]);
    } else {
      setCheckedItems(recycleBinList.map((item) => item.recyclebin_no));
    }
  };

  const handleCheckItem = (no: number) => {
    setCheckedItems((prev) => (prev.includes(no) ? prev.filter((itemNo) => itemNo !== no) : [...prev, no]));
  };

  const deleteFileOrFolder = () => {
    alert('삭제 기능 준비 중');
  };

  useEffect(() => {
    if (searchFilter === '' && searchQuery === '') {
      fetchRecycleBin(1);
    }
  }, [searchFilter, searchQuery]);

  useEffect(() => {
    fetchRecycleBin(currentPage);
  }, [currentPage]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert('검색어를 입력하세요.');
      return;
    }
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchRecycleBin(1);
    }
  };

  //dummyData 한정으로 real data, api 생성 후 변경
  const fetchRecycleBin = (page: number) => {
    let filtered = dummyData;

    if (searchQuery && searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();

      filtered = filtered.filter((item) => {
        if (searchFilter === 'E000') {
          return item.name.toLowerCase().includes(q);
        }
        if (searchFilter === 'E001') {
          return item.type.toLowerCase().includes(q);
        }
        if (searchFilter === 'E002') {
          return item.origin_location.toLowerCase().includes(q);
        }
        if (searchFilter === 'E003') {
          return String(item.dltd_date).toLowerCase().includes(q);
        }
        if (searchFilter === 'E004') {
          return item.dltd_by.toLowerCase().includes(q);
        }

        return (
          item.name.toLowerCase().includes(q) ||
          item.type.toLowerCase().includes(q) ||
          item.origin_location.toLowerCase().includes(q) ||
          String(item.dltd_date).toLowerCase().includes(q) ||
          item.dltd_by.toLowerCase().includes(q)
        );
      });
    }
    const startIndex = (page - 1) * RECYCLE_BIN_PAGE_LIMIT_SIZE;
    const paginated = filtered.slice(startIndex, startIndex + RECYCLE_BIN_PAGE_LIMIT_SIZE);

    setRecycleBinList(paginated);
    setTotalCount(filtered.length);
  };

  const refreshRecycleBin = () => {
    setSearchFilter('');
    setSearchQuery('');
    setCurrentPage(1);
    setCheckedItems([]);
  };

  const RecycleBinSearchFilterOptions = Object.entries(RECYCLE_BIN_SEARCH_FILTER_INFO).map(([key, info]) => ({
    label: info.label,
    value: key,
  }));

  //추후 real data 및 api 생성 후 제거
  const dummyData: RecycleBin[] = Array.from({ length: 200 }).map((_, idx) => ({
    recyclebin_no: idx + 1,
    name: `Name ${idx + 2}`,
    type: `Type ${idx}`,
    origin_location: 'a/b/c',
    dltd_date: idx + 3,
    dltd_by: '정재연',
  }));

  return (
    <MainLayout title='Recycle Bin' pageLocation='RECYCLE BIN'>
      <BreadCrumb
        breadCrumbNodeInfos={[
          {
            icon: (
              <div className='flex justify-center items-center w-4 h-4'>
                <DeleteIcon sx={{ color: 'inherit', fontSize: 30 }} />
              </div>
            ),
            url: '/recycle-bin',
            text: 'Recycle Bin',
          },
        ]}
      />
      <div className='layout-box w-auto h-auto'>
        <div className='flex flex-row items-center justify-between h-[60px]'>
          <div className='flex flex-row space-x-3'>
            <FilterSearchBar
              fieldName='Search'
              filterOptions={RecycleBinSearchFilterOptions}
              showSearch={true}
              selectedFilter={searchFilter}
              setSelectedFilter={setSearchFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
            <IconFrame onClick={() => refreshRecycleBin()}>
              <RefreshIcon sx={{ color: 'inherit', fontSize: 20 }} />
            </IconFrame>
          </div>
          <div className='flex flex-row gap-x-2'>
            <button onClick={deleteFileOrFolder}>
              <IconLabel label='Delete' />
            </button>
          </div>
        </div>
        <div className='w-full my-4 mx-0'>
          <table className='common-table'>
            <thead className='text-left'>
              <tr>
                <th className='w-[44px] text-center'>
                  <div className='flex items-center justify-center h-full'>
                    <input type='checkbox' checked={isAllChecked} onChange={handleCheckAll} />
                  </div>
                </th>
                <th className='w-[50px]'>No</th>
                <th className='w-[350px]'>Name</th>
                <th className='w-[250px]'>Type</th>
                <th className='w-[571px]'>Origin Location</th>
                <th className='w-[250px]'>Deleted on</th>
                <th className='w-[250px]'>Deleted by</th>
              </tr>
            </thead>
            <tbody>
              {recycleBinList.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  <td className='w-[44px] text-center'>
                    <div className='flex items-center justify-center h-full'>
                      <input
                        type='checkbox'
                        checked={checkedItems.includes(item.recyclebin_no)}
                        onChange={() => handleCheckItem(item.recyclebin_no)}
                      />
                    </div>
                  </td>
                  <td className='w-[50px]'>{item.recyclebin_no}</td>
                  <td className='w-[350px]'>{item.name}</td>
                  <td className='w-[250px]'>{item.type}</td>
                  <td className='w-[571px]'>{item.origin_location}</td>
                  <td className='w-[250px]'>{item.dltd_date}</td>
                  <td className='w-[250px]'>{item.dltd_by}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='py-1'>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            itemsPerPage={RECYCLE_BIN_PAGE_LIMIT_SIZE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default Page;
