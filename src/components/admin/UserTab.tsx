import { ADMIN_PAGE_LIMIT_SIZE } from '@/constants/limitConstants';
import { ADMIN_USER_SEARCH_INFO, UserAuth, UserAuthCd, UserInfo } from '@/types/typeCollection';
import { formatISOString } from '@/utils/formatDate';
import EditIcon from '@mui/icons-material/Edit';
import RefreshIcon from '@mui/icons-material/Refresh';
import axios from 'axios';
import { useEffect, useState } from 'react';
import FilterSearchBar from '../FilterSearchBar';
import IconFrame from '../atomic/IconFrame';
import IconLabel from '../atomic/IconLabel';
import Pagination from '../atomic/Pagination';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfidentialGrid from '../home/ConfidentialGrid';
import { useAuthStore } from '@/stores/userStore';

const UserSearchFilterOptions = Object.entries(ADMIN_USER_SEARCH_INFO).map(([key, info]) => ({
  label: info.label,
  value: key,
}));

const UserTab = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserInfo | null>(null);

  const handleEditClick = (user: UserInfo) => {
    setSelectedUser(user);
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
    setIsEditMode(false);
  };

  return isEditMode && selectedUser ? (
    <UserEditPanel target_user={selectedUser} onCancel={handleCancelEdit} />
  ) : (
    <UserListPanel onEdit={handleEditClick} />
  );
};

export default UserTab;

const UserEditPanel = ({ target_user, onCancel }: { target_user: UserInfo; onCancel: () => void }) => {
  const [targetAuth, setTargetAuth] = useState<UserAuthCd | ''>('');
  const [initialAuth, setInitialAuth] = useState<UserAuthCd | ''>('');
  const { user } = useAuthStore();

  const fetchTargetAuth = async () => {
    try {
      const res = await axios.get<UserAuthCd>(`/api/users/${target_user.id}/auth`);

      const cd = res.data;
      setTargetAuth(cd);
      setInitialAuth(cd);
    } catch (error) {
      console.error('권한 조회 실패', error);
      throw new Error('권한 조회 실패');
    }
  };

  useEffect(() => {
    fetchTargetAuth();
  }, []);

  const handleCheckboxChange = (authCode: UserAuthCd) => {
    setTargetAuth((prev) => (prev === authCode ? '' : authCode));
  };
  const handlePasswordReset = () => {
    window.alert('비밀번호 초기화 기능 준비 중');
  };

  const handleReset = () => {
    setTargetAuth(initialAuth);
  };

  const handleSave = async () => {
    if (!user) {
      alert('권한이 필요합니다.');
      return;
    }
    try {
      await axios.post(`/api/users/${target_user.id}/auth`, {
        auth: targetAuth,
      });
      setInitialAuth(targetAuth);
      alert('저장 완료');
    } catch (error) {
      console.error('저장 실패', error);
      alert('저장 실패');
    }
  };

  return (
    <>
      <div className='flex flex-row w-[380px]'>
        <span className='w-1/3 text-base font-bold'>User Detail</span>
        <button
          className='flex flex-row items-center justify-center border-[1px] border-primary-red-50 rounded-lg w-[153px] h-8'
          onClick={() => onCancel()}
        >
          <div className='w-4 h-4 mt-[2px] text-primary-red-50 flex justify-center items-center'>
            <ArrowBackIcon sx={{ color: 'inherit', fontSize: 20 }} />
          </div>
          <span className='ml-1 text-sm font-medium text-primary-red-50'>Move to user list</span>
        </button>
      </div>
      <div className='flex flex-row items-center mt-3 gap-20'>
        <UserDetailItem title='ID' content={target_user.id} />
        <div className='flex flex-row w-[380px] items-center'>
          <span className='w-1/3 text-sm font-medium'>Password</span>
          <button
            className='flex items-center justify-center w-[153px] h-8 border  rounded-[8px] text-sm font-medium'
            onClick={() => handlePasswordReset()}
          >
            <RefreshIcon width={16} height={16} />
            <span className='pl-1'>Reset Password</span>
          </button>
        </div>
      </div>
      <div className='flex flex-row items-center mt-3 gap-20'>
        <UserDetailItem title='Name' content={target_user.name} />
        <UserDetailItem title='Email' content={target_user.email} />
      </div>
      <div className='flex flex-row items-center mt-3 gap-20'>
        <UserDetailItem title='Department' content='비공개' />
        <UserDetailItem title='Location' content='비공개' />
      </div>
      <div className='flex flex-row items-center mt-3 gap-20'>
        <UserDetailItem title='Joined date' content={formatISOString(target_user.joined_date)} />
      </div>
      <div className='mt-4'>
        <span className='w-1/3 text-sm font-medium'>Access auth</span>
        <table className='common-table mt-4'>
          <thead>
            <tr>
              <th className='w-[50px]'>No</th>
              <th className='w-[200px]'>Auth code</th>
              <th className='w-[687px]'>Auth description</th>
              <th className='w-[200px]'>On/Off</th>
            </tr>
          </thead>
          <tbody className='text-xs font-normal'>
            <tr>
              <td className='w-[50px] text-center'>1</td>
              <td className='w-[200px] text-center'>Admin</td>
              <td className='w-[687px] '>Admin 페이지 접근 권한 부여</td>
              <td className='w-[200px]'>
                <div className='flex items-center justify-center h-full'>
                  <input
                    type='checkbox'
                    checked={targetAuth.includes('ADMIN')}
                    onChange={() => handleCheckboxChange('ADMIN')}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='mt-4'>
        <span className='w-1/3 text-sm font-medium'>History</span>
        <div className='flex items-center justify-center w-full'>
          <ConfidentialGrid />
        </div>
      </div>
      <div className='flex flex-row justify-center gap-[10px] mt-6 text-sm'>
        <button className='w-[120px]' onClick={() => onCancel()}>
          <IconLabel label='Cancel' />
        </button>
        <button className='w-[120px]' onClick={() => handleReset()}>
          <IconLabel label='Reset' />
        </button>
        <button className='w-[120px]' onClick={() => handleSave()}>
          <IconLabel label='Save Changes' />
        </button>
      </div>
    </>
  );
};

const UserDetailItem = ({ title, content }: { title: string; content: string }) => {
  return (
    <div className='flex flex-row w-[380px] items-center'>
      <span className='w-1/3 text-sm font-medium'>{title}</span>
      <div className='border-[1px] border-grayscale-gray-90 rounded-[4px] w-2/3 h-8 px-3 py-[6px] text-xs font-normal'>
        {content}
      </div>
    </div>
  );
};

const UserListPanel = ({ onEdit }: { onEdit: (user: UserInfo) => void }) => {
  const [searchFilter, setSearchFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState<UserInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      alert('검색어를 입력하세요.');
      return;
    }
    if (currentPage !== 1) {
      setCurrentPage(1);
    } else {
      fetchUsers(1);
    }
  };

  const fetchUsers = async (page: number) => {
    try {
      const response = await axios.get('/api/admin/users', {
        params: {
          start_page: page,
          search_filter: searchFilter || undefined,
          search_query: searchQuery.trim() || undefined,
        },
      });
      setUserList(response.data.userList);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      alert('User 목록을 가져오지 못했습니다. 문제가 계속되면 문의하세요.');
    }
  };

  const refreshUsers = () => {
    setSearchFilter('');
    setSearchQuery('');
    setCurrentPage(1);
    fetchUsers(1);
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);
  return (
    <div className='w-auto h-auto'>
      <div className='flex flex-row justify-between items-center h-[60px]'>
        <div className='flex flex-row space-x-3'>
          <FilterSearchBar
            fieldName='Search'
            filterOptions={UserSearchFilterOptions}
            showSearch={true}
            selectedFilter={searchFilter}
            setSelectedFilter={setSearchFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
          <IconFrame onClick={refreshUsers}>
            <RefreshIcon sx={{ color: 'inherit', fontSize: 30 }} />
          </IconFrame>
        </div>
        <button>
          <IconLabel label='+ Add' />
        </button>
      </div>
      <div className='w-full my-4 mx-0'>
        <table className='common-table'>
          <thead className='text-left'>
            <tr>
              <th className='w-[56px]'></th>
              <th className='w-[40px]'>No</th>
              <th className='w-[263px]'>ID</th>
              <th className='w-[263px]'>Name</th>
              <th className='w-[263px]'>Email</th>
              <th className='w-[263px]'>Department</th>
              <th className='w-[263px]'>Location</th>
              <th className='w-[263px]'>Joined Date</th>
              <th className='w-[100px]'>Edit</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((item, rowIndex) => (
              <tr key={rowIndex}>
                <td className='w-[56px]'></td>
                <td className='w-[40px]'>{(currentPage - 1) * ADMIN_PAGE_LIMIT_SIZE + rowIndex + 1}</td>
                <td className='w-[226px]'>{item.id}</td>
                <td className='w-[226px]'>{item.name}</td>
                <td className='w-[226px]'>{item.email}</td>
                <td className='w-[226px]'>비공개</td>
                <td className='w-[226px]'>비공개</td>
                <td className='w-[226px]'>{formatISOString(item.joined_date)}</td>
                <td>
                  <button className='w-4 h-4 flex justify-center items-center' onClick={() => onEdit(item)}>
                    <EditIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='py-1'>
        <Pagination
          currentPage={currentPage}
          totalCount={totalCount}
          itemsPerPage={ADMIN_PAGE_LIMIT_SIZE}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};
