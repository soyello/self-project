import { useAuthStore } from '../../stores/userStore';
import { useState } from 'react';
import HistoryTab from './HistoryTab';
import UserTab from './UserTab';

type AdminPageType = 'USERS' | 'HISTORY';

interface AdminPageTypeInfo {
  text: string;
}

const ADMIN_PAGE_INFO: Record<AdminPageType, AdminPageTypeInfo> = {
  USERS: {
    text: 'Users',
  },
  HISTORY: {
    text: 'History',
  },
};

const Admin = () => {
  const user = useAuthStore((state) => state.user);
  const [mode, setMode] = useState<AdminPageType>('USERS');

  if (!user || user.role !== 'admin') {
    return <div className='flex justify-center items-center h-full'>표시할 탭이 없습니다.</div>;
  }

  return (
    <div className='layout-box w-auto h-auto'>
      <TabButton mode='USERS' currentMode={mode} setMode={setMode} />
      <TabButton mode='HISTORY' currentMode={mode} setMode={setMode} />
      <div className='mt-6'>
        {mode === 'USERS' && <UserTab />}
        {mode === 'HISTORY' && <HistoryTab />}
      </div>
    </div>
  );
};

export default Admin;

interface TabButtonProps {
  mode: AdminPageType;
  currentMode: AdminPageType;
  setMode: (mode: AdminPageType) => void;
}

const TabButton = ({ mode, currentMode, setMode }: TabButtonProps) => {
  const text = ADMIN_PAGE_INFO[mode].text;

  if (mode === currentMode) {
    return (
      <button className='font-bold text-primary-bluegreen-50 border-y-2 border-b-primary-bluegreen-50 border-t-transparent px-6 py-2'>
        {text}
      </button>
    );
  } else {
    return (
      <button className='px-6 py-2' onClick={() => setMode(mode)}>
        {text}
      </button>
    );
  }
};
