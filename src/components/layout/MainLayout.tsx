import { usePageLocationStore } from '@/stores/pageLocationStore';
import { PageLocation } from '@/types/typeCollection';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { useAuthStore } from '../../stores/userStore';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const baseURL = process.env.NEXT_PUBLIC_API_URL; // 추가: 환경변수 baseURL

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  pageLocation?: PageLocation;
}

const MainLayout = ({ children, pageLocation }: MainLayoutProps) => {
  const { setPageLocationState } = usePageLocationStore();
  const { user, isHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    /* 페이지 로케이션 세팅 */
    setPageLocationState(pageLocation ?? 'NO LOCATION');

    if (!isHydrated) return;

    /* 유저 정보가 없는 경우 로그인 페이지로 이동 */
    if (!user) {
      router.replace('/login'); // 로그인 페이지로 강제 이동
    }
  }, [pageLocation, user, router, setPageLocationState]);

  return (
    <div className='flex flex-col h-screen overflow-hidden'>
      <Navbar />
      <div className='flex flex-row flex-1 overflow-hidden'>
        <Sidebar />
        {/* 화면의 내용 표시 */}
        <div className='flex-1 overflow-auto'>
          <div className='flex flex-col min-w-[calc(1920px-78px)] min-h-[calc(100vh-60px)] bg-secondary-E6 p-6 gap-6'>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
