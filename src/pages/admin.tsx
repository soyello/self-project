import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Admin from '@/components/admin/Admin';
import BreadCrumb from '@/components/breadcrumb/BreadCrumb';
import MainLayout from '@/components/layout/MainLayout';

const Page = () => {
  return (
    <MainLayout title='Admin' pageLocation='ADMIN'>
      <BreadCrumb
        breadCrumbNodeInfos={[
          { icon: <ManageAccountsIcon sx={{ color: 'inherit', fontSize: 30 }} />, url: '/admin', text: 'Admin' },
        ]}
      />
      <Admin />
    </MainLayout>
  );
};

export default Page;
