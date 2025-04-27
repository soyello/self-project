import CampaignIcon from '@mui/icons-material/Campaign';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import PushPinIcon from '@mui/icons-material/PushPin';
import RefreshIcon from '@mui/icons-material/Refresh';

import IconFrame from '@/components/atomic/IconFrame';
import IconLabel from '@/components/atomic/IconLabel';
import Pagination from '@/components/atomic/Pagination';
import BreadCrumb from '@/components/breadcrumb/BreadCrumb';
import FilterSearchBar from '@/components/FilterSearchBar';
import MainLayout from '@/components/layout/MainLayout';
import NoticeModal from '@/components/notice/NoticeModal';
import { NOTICE_PAGE_LIMIT_SIZE } from '@/constants/limitConstants';

import { Notice, NOTICE_SEARCH_FILTER_INFO, NOTICE_TYPE_INFO } from '@/types/typeCollection';
import { useAuthStore } from '../stores/userStore';

import { formatISOString } from '@/utils/formatDate';
import axios from 'axios';
import { useEffect, useState } from 'react';

const NoticePage = () => {
  const { user } = useAuthStore();
  const [searchFilter, setSearchFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'view' | 'edit' | 'add'>('view');
  const [noticeId, setNoticeId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const handleReadOnlyModalOpen = (id: number) => {
    setNoticeId(id);
    setIsOpen(true);
    setMode('view');
  };

  const handleEditModalOpen = (id: number) => {
    setNoticeId(id);
    setIsOpen(true);
    setMode('edit');
  };

  const handleAddModalOpen = () => {
    setIsOpen(true);
    setMode('add');
  };

  const handleModalClose = () => {
    setNoticeId(null);
    setIsOpen(false);
  };

  const fetchNotices = async (page: number) => {
    try {
      const response = await axios.get('/api/notices', {
        params: {
          mode: 'notice',
          start_page: page,
          category_cd: categoryFilter || undefined,
          search_filter: searchFilter || undefined,
          search_query: searchQuery.trim() || undefined,
        },
      });

      const { noticeList, totalCount } = response.data;
      setNoticeList(noticeList);
      setTotalCount(totalCount);
    } catch (error) {
      alert('공지 목록을 가져오지 못했습니다. 문제가 계속되면 문의하세요.');
      setNoticeList([]);
      setTotalCount(0);
    }
  };

  const refreshNotices = async () => {
    setCategoryFilter('');
    setSearchFilter('');
    setSearchQuery('');
    setCurrentPage(1);

    await fetchNotices(1);
  };

  useEffect(() => {
    if (categoryFilter === '' && searchFilter === '' && searchQuery === '') {
      fetchNotices(1);
    }
  }, [categoryFilter, searchFilter, searchQuery]);

  useEffect(() => {
    fetchNotices(currentPage);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchNotices(1);
    }
  }, [categoryFilter]);

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert('검색어를 입력하세요.');
      return;
    }
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchNotices(1);
    }
  };

  const NoticeCategoryOptions = Object.entries(NOTICE_TYPE_INFO).map(([key, info]) => ({
    label: info.label,
    value: key,
  }));

  const NoticeSearchFilterOptions = Object.entries(NOTICE_SEARCH_FILTER_INFO).map(([key, info]) => ({
    label: info.label,
    value: key,
  }));

  return (
    <MainLayout title='Notice' pageLocation='HOME'>
      <BreadCrumb
        breadCrumbNodeInfos={[
          { icon: <HomeIcon sx={{ color: 'inherit', fontSize: 30 }} />, url: '/', text: 'Home' },
          { icon: <CampaignIcon sx={{ color: 'inherit', fontSize: 30 }} />, url: '/notice', text: 'Notice' },
        ]}
      />
      <div className='layout-box w-auto h-auto'>
        <div className='flex flex-row justify-between items-center h-[60px]'>
          <div className='flex flex-row space-x-3'>
            {/* 카테고리 필터 */}
            <FilterSearchBar
              fieldName='Category'
              filterOptions={NoticeCategoryOptions}
              selectedFilter={categoryFilter}
              setSelectedFilter={setCategoryFilter}
            />
            {/* 검색 필터 */}
            <FilterSearchBar
              fieldName='Search'
              filterOptions={NoticeSearchFilterOptions}
              showSearch={true}
              selectedFilter={searchFilter}
              setSelectedFilter={setSearchFilter}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSearch={handleSearch}
            />
            <IconFrame onClick={refreshNotices}>
              <RefreshIcon sx={{ color: 'inherit', fontSize: 30 }} />
            </IconFrame>
          </div>
          <button onClick={handleAddModalOpen}>
            <IconLabel label='+ Upload' />
          </button>
        </div>

        <div className='w-full my-4 mx-0'>
          <table className='common-table'>
            <thead className='text-left'>
              <tr>
                <th className='w-[56px]'></th>
                <th className='w-[40px]'>No</th>
                <th className='w-[280px]'>Category</th>
                <th className='w-[770px]'>Title</th>
                <th className='w-[280px]'>Writer</th>
                <th className='w-[280px]'>Date</th>
                <th className='w-[56px]'>Edit</th>
              </tr>
            </thead>
            <tbody>
              {noticeList.map((item, rowIndex) => (
                <tr key={rowIndex}>
                  <td className='w-[56px]'>
                    {item.pinned == true ? (
                      <div className='flex justify-center items-center'>
                        <PushPinIcon sx={{ color: 'inherit', fontSize: 20 }} />
                      </div>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className='w-[40px]'>{item.id}</td>
                  <td className='w-[280px]'>
                    {NoticeCategoryOptions.find((opt) => opt.value === item.category_code)?.label || ''}
                  </td>
                  <td className='w-[730px] cursor-pointer' onClick={() => handleReadOnlyModalOpen(item.id)}>
                    {item.title}
                  </td>
                  <td className='w-[280px]'>{item.writer}</td>
                  <td className='w-[280px]'>{formatISOString(item.created_at)}</td>
                  <td>
                    {/* user.email과 작성자 ID 비교 */}
                    {item.writer === user?.email ? (
                      <button
                        onClick={() => handleEditModalOpen(item.id)}
                        className='w-4 h-4 flex justify-center items-center'
                      >
                        <EditIcon sx={{ color: 'inherit', fontSize: 20 }} />
                      </button>
                    ) : (
                      ''
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {isOpen && (
            <NoticeModal onClose={handleModalClose} noticeId={noticeId} mode={mode} onRefresh={refreshNotices} />
          )}
        </div>
        <div className='py-1'>
          <Pagination
            currentPage={currentPage}
            totalCount={totalCount}
            itemsPerPage={NOTICE_PAGE_LIMIT_SIZE}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </MainLayout>
  );
};

export default NoticePage;
