import AddIcon from '@mui/icons-material/Add';
import { useAuthStore } from '../../stores/userStore';
import Portal from '../atomic/Portal';

interface NavbarUserInfoDivProps {
  modalOpen: boolean;
  setModalOpen: (input: boolean) => void;
}

const NavbarUserInfoDiv = ({ modalOpen, setModalOpen }: NavbarUserInfoDivProps) => {
  const user = useAuthStore((state) => state.user);

  const handleToggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className='font-[600] text-base h-[30px] leading-[30px] text-center' onClick={handleToggleModal}>
      {user ? user.email : '로그인 필요'}
      {user && modalOpen && (
        <Portal>
          <div
            className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10'
            onClick={(e) => e.stopPropagation()}
          >
            <div className='relative bg-primary-red-30 py-2 px-5 w-[270px] flex flex-col text-black'>
              <div className='absolute rotate-45 top-3 right-3 cursor-pointer' onClick={handleToggleModal}>
                <AddIcon sx={{ color: 'inherit', fontSize: 20 }} />
              </div>
              <div className='flex flex-col items-center justify-center min-w-[230px] min-h-[90px] border-b-[1px] border-b-black gap-2'>
                <span className='text-base font-bold'>{user.email}</span>
              </div>
              <div className='flex flex-col gap-4 py-3'>
                <span className='text-sm font-bold'>ID</span>
                <span className='text-xs font-normal'>{user.id}</span>
                <span className='text-sm font-bold'>Email</span>
                <span className='text-xs font-normal'>{user.email}</span>
                <span className='text-sm font-bold'>Role</span>
                <span className='text-xs font-normal'>{user.role}</span>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
};

export default NavbarUserInfoDiv;
