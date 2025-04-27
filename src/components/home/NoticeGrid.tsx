import { formatISOString } from '@/utils/formatDate';
import axios from 'axios';
import { useEffect, useState } from 'react';
import MainGridHeader from '../MainGridHeader';
import NoticeStatus from '../atomic/NoticeStatus';
import NoticeModal from '../notice/NoticeModal';

const NoticeGrid = () => {
  const [noticeData, setNoticeData] = useState([]);
  const [openNotice, setOpenNotice] = useState(false);
  const [noticeId, setNoticeId] = useState<number | null>(null);

  useEffect(() => {
    axios
      .get('/api/notices?mode=main&start_page=1')
      .then((res) => {
        setNoticeData(res.data.noticeList);
      })
      .catch(() => alert('Notice 리스트가 보이지 않으면, 문의 주세요.'));
  }, []);

  const handleNoticeModalOpen = (id: number) => {
    setNoticeId(id);
    setOpenNotice(true);
  };

  const handleModalClose = () => {
    setNoticeId(null);
    setOpenNotice(false);
  };
  const isNewNotice = (unixTimestamp: number) => {
    const updatedDate = new Date(unixTimestamp * 1000);
    const now = new Date();
    const diffInMs = now.getTime() - updatedDate.getTime();
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    return diffInDays <= 3;
  };
  return (
    <div className='flex flex-col items-center justify-center bg-white w-[881px] h-[362px] rounded-lg p-6'>
      <MainGridHeader title='Notice' href='/notice' />
      <table className='table-auto w-full border-none mt-3 text-[12px] leading-[18px]'>
        <tbody>
          {noticeData.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className='h-10 text-left text-gray-90 border-b border-b-gray-50 text-[12px] hover:bg-secondary-F0'
            >
              <td className='pl-2 w-3/4'>
                <div className='flex flex-row items-center gap-2'>
                  {isNewNotice(item['createdAt']) && <NoticeStatus bgColor='bg-[#FC8484]' stateText='new' />}
                  <div className='cursor-pointer' onClick={() => handleNoticeModalOpen(item['id'])}>
                    {item['title']}
                  </div>
                </div>
              </td>
              <td className='w-1/4'>{formatISOString(item['created_at'])}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {openNotice && <NoticeModal onClose={handleModalClose} noticeId={noticeId} mode='view' />}
    </div>
  );
};

export default NoticeGrid;
