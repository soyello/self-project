import { Notice } from '@/types/typeCollection';
import { formatISOString } from '@/utils/formatDate';
import CloseIcon from '@mui/icons-material/Close';
import PushPinIcon from '@mui/icons-material/PushPin';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../../stores/userStore';
import IconLabel from '../atomic/IconLabel';
import NoticeEditModalItem from './NoticeEditModalItem';
import NoticeReadOnlyModalItem from './NoticeReadOnlyModalItem';

interface NoticeModalProps {
  onClose: () => void;
  noticeId: number | null;
  mode: 'view' | 'edit' | 'add';
  onRefresh?: () => void;
}

const NoticeModal = ({ onClose, noticeId, mode = 'view', onRefresh }: NoticeModalProps) => {
  const [noticeData, setNoticeData] = useState<Notice>();
  const [isPinned, setPinned] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useAuthStore();

  useEffect(() => {
    const fetchNotice = async () => {
      if (!noticeId) return;
      try {
        const notice = await axios.get(`/api/notices/${noticeId}`).then((res) => res.data as Notice);
        setNoticeData(notice);
        setPinned(notice.pinned);
      } catch (error) {
        console.error('공지 조회 실패:', error);
      }
    };
    fetchNotice();
  }, [noticeId]);

  const handleDelete = async () => {
    if (!noticeId) return;
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      await axios.delete(`/api/notices/${noticeId}`);
      alert('정상 삭제되었습니다.');
      onRefresh?.();
      onClose();
    } catch (error) {
      console.error('공지 삭제 실패:', error);
      alert('삭제 중 오류 발생');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value ?? '';
    const content = contentRef.current?.value ?? '';
    const category_code = categoryRef.current?.value ?? '';

    const missingFields = [];
    if (!title) missingFields.push('Title');
    if (!content) missingFields.push('Content');
    if (!category_code) missingFields.push('Category');

    if (missingFields.length > 0) {
      alert(`${missingFields.join(', ')} 입력은 필수입니다.`);
      return;
    }

    if (!user) {
      alert('로그인 정보가 없습니다.');
      return;
    }

    const payload: any = {
      pinned: isPinned,
      category_code,
      title,
      content,
      writer: user.email,
      created_at: new Date().toISOString(),
    };

    try {
      if (mode === 'edit' && noticeId) {
        await axios.put(`/api/notices/${noticeId}`, payload);
        alert('정상 수정되었습니다.');
      } else if (mode === 'add') {
        await axios.post(`/api/notices`, payload);
        alert('정상 작성되었습니다.');
      }
      onRefresh?.();
      onClose();
    } catch (error) {
      console.error('공지 저장 실패:', error);
      alert('공지 저장 중 오류 발생');
    }
  };

  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10'>
      <div className='relative bg-white px-8 rounded-lg w-1/2'>
        {/* 공지 제목 */}
        <div className='flex items-center h-20 border-b-[1.3px] border-b-gray-70'>
          <button onClick={onClose} className='absolute top-4 right-4'>
            <CloseIcon sx={{ color: 'inherit', fontSize: 30 }} />
          </button>
          <div className='flex justify-between items-center w-full'>
            <span className='text-lg font-bold w-1/5'>
              {mode === 'add' ? 'Add Notice' : mode === 'edit' ? 'Edit Notice' : 'Notice'}
            </span>
            {(mode === 'add' || mode === 'edit') && (
              <div className='flex flex-row items-center gap-4 w-4/5'>
                <PushPinIcon sx={{ color: 'inherit', fontSize: 30 }} />
                <span className='text-xs font-semibold'>Pinned post</span>
                <input
                  type='checkbox'
                  className='cursor-pointer'
                  checked={isPinned}
                  onChange={(e) => setPinned(e.target.checked)}
                />
              </div>
            )}
          </div>
        </div>

        {/* 공지 본문 */}
        <div className='mt-2 mb-8'>
          {mode === 'view' ? (
            <>
              <NoticeReadOnlyModalItem
                title='Date'
                textSize='short'
                children={formatISOString(noticeData?.created_at ?? '')}
              />
              <NoticeReadOnlyModalItem title='Category' textSize='short' children={noticeData?.category_code} />
              <NoticeReadOnlyModalItem title='Title' textSize='medium' children={noticeData?.title} />
              <NoticeReadOnlyModalItem title='Content' longHeight='h-[208px]' children={noticeData?.content} />
            </>
          ) : (
            <>
              <NoticeEditModalItem
                title='Date'
                initialValue={
                  mode === 'edit'
                    ? formatISOString(noticeData?.created_at ?? '')
                    : formatISOString(new Date().toISOString())
                }
              />
              <NoticeEditModalItem
                title='Category'
                key={noticeData?.category_code ?? ''}
                inputRef={categoryRef}
                initialValue={noticeData?.category_code ?? ''}
              />
              <NoticeEditModalItem title='Title' inputRef={titleRef} initialValue={noticeData?.title} />
              <NoticeEditModalItem title='Content' inputRef={contentRef} initialValue={noticeData?.content} />
              <div className='flex flex-row justify-center pt-7 gap-3'>
                {mode === 'edit' ? (
                  <button className='w-1/6' onClick={handleDelete}>
                    <IconLabel label='Delete' />
                  </button>
                ) : (
                  <button className='w-1/6' onClick={onClose}>
                    <IconLabel label='Cancel' />
                  </button>
                )}
                <button className='w-1/6' onClick={handleSubmit}>
                  <IconLabel label='Save' />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeModal;
