import BreadCrumb from '@/components/breadcrumb/BreadCrumb';
import ConfidentialGrid from '@/components/home/ConfidentialGrid';
import MediumGrid from '@/components/home/MediumGrid';
import NoticeGrid from '@/components/home/NoticeGrid';
import SmallGrid from '@/components/home/SmallGrid';
import MainLayout from '@/components/layout/MainLayout';
import DeleteIcon from '@mui/icons-material/Delete';
import HomeIcon from '@mui/icons-material/Home';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

const Home = () => {
  return (
    <MainLayout title='HOME' pageLocation='HOME'>
      <BreadCrumb
        breadCrumbNodeInfos={[{ icon: <HomeIcon sx={{ color: 'inherit', fontSize: 30 }} />, url: '/', text: 'Home' }]}
      />
      <div className='grid grid-rows-2 gap-6'>
        <div className='grid grid-cols-2 gap-8'>
          <div className='grid grid-rows-[auto_auto] gap-6'>
            <div className='grid grid-cols-2 gap-[26px]'>
              <MediumGrid
                icon={<ManageAccountsIcon sx={{ color: 'inherit', fontSize: 60 }} />}
                href='/admin'
                title='Admin'
              />
              <MediumGrid
                icon={<DeleteIcon sx={{ color: 'inherit', fontSize: 60 }} />}
                href='recycle-bin'
                title='Recycle Bin'
              />
            </div>
            <div className='grid grid-cols-3 gap-[22px]'>
              <SmallGrid
                icon={
                  <div className='flex justify-center items-center w-5 h-5'>
                    <HourglassEmptyIcon sx={{ color: 'inherit', fontSize: 30 }} />
                  </div>
                }
                title='준비 중'
                alertMessage='준비 중'
              />
              <SmallGrid
                icon={
                  <div className='flex justify-center items-center w-5 h-5'>
                    <HourglassEmptyIcon sx={{ color: 'inherit', fontSize: 30 }} />
                  </div>
                }
                title='준비 중'
                alertMessage='준비 중'
              />
              <SmallGrid
                icon={
                  <div className='flex justify-center items-center w-5 h-5'>
                    <HourglassEmptyIcon sx={{ color: 'inherit', fontSize: 30 }} />
                  </div>
                }
                title='준비 중'
                alertMessage='준비 중'
              />
            </div>
          </div>
          <NoticeGrid />
        </div>
        <div className='grid grid-cols-2 gap-8'>
          <ConfidentialGrid />
          <ConfidentialGrid />
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
