import React from 'react';
import LockIcon from '@mui/icons-material/Lock';

const HistoryTab = () => {
  return (
    <div
      className='flex flex-col w-full items-center justify-center gap-3 bg-white w-[881px] h-[362px] rounded-lg p-6 cursor-pointer'
      onClick={() => alert('비공개 영역입니다.')}
    >
      <LockIcon sx={{ color: 'disabled', fontSize: 100 }} />
      <span className='text-4xl font-bold'>Confidential</span>
    </div>
  );
};

export default HistoryTab;
