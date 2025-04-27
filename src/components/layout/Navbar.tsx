import Link from 'next/link';
import NavbarItem from './NavbarItem';
import NavbarUserInfoDiv from '../userInfo/NavbarUserInfoDiv';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuthStore } from '@/stores/userStore';

const Navbar = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    if (confirm('로그아웃 하시겠습니까?')) {
      logout();
      router.push('/login');
    }
  };

  return (
    <nav className='relative h-[60px] w-full bg-primary-red-80 text-white flex items-center justify-between px-6 z-10'>
      <Link href='/' className='gap-1'>
        <h1 className='font-bold text-[20px] leading-[28px]'>Self Project</h1>
      </Link>
      <div className='flex items-center gap-3'>
        <NavbarItem tooltipText='User Info' modalOpen={modalOpen} icon={false}>
          <NavbarUserInfoDiv modalOpen={modalOpen} setModalOpen={setModalOpen} />
        </NavbarItem>

        <button className='text-sm text-center cursor-pointer flex items-center' onClick={handleLogout}>
          LogOut
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
