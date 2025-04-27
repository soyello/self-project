import DeleteIcon from '@mui/icons-material/Delete';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import HomeIcon from '@mui/icons-material/Home';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  return (
    <aside className='relative w-[60px] h-[calc(100vh-60px)] bg-secondary-F0 py-6 z-5 flex flex-col items-center'>
      <div className='flex flex-col items-center'>
        <SidebarItem pageLocation='HOME' href='/' tooltipText='Home'>
          <HomeIcon sx={{ color: 'inherit', fontSize: 30 }} />
        </SidebarItem>
        <SidebarItem pageLocation='RECYCLE BIN' href='/recycle-bin' tooltipText='Recycle bin'>
          <DeleteIcon sx={{ color: 'inherit', fontSize: 30 }} />
        </SidebarItem>
        <SidebarItem pageLocation='ADMIN' href='/admin' tooltipText='Admin'>
          <ManageAccountsIcon sx={{ color: 'inherit', fontSize: 30 }} />
        </SidebarItem>
      </div>
    </aside>
  );
};

export default Sidebar;
