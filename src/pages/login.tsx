import LoginForm from '@/components/LoginForm';
import Head from 'next/head';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>로그인 | Self Project</title>
      </Head>
      <div className='flex items-center justify-center min-h-screen bg-secondary-E6'>
        <div className='bg-white p-8 rounded shadow-md w-[400px]'>
          <h1 className='text-2xl font-bold text-center mb-6'>Login</h1>
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default LoginPage;
