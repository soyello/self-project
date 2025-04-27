import { useState } from 'react';
import { loginRequest } from '../pages/api/authApi';
import { useAuthStore } from '../stores/userStore';
import { useRouter } from 'next/router';

const LoginForm = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await loginRequest(email, password);
      login(user); // zustand store에 저장
      router.push('/');
    } catch {
      alert('아이디와 비밀번호를 확인하세요.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div className='flex flex-row items-center justify-center gap-5'>
        <span>ID</span>
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='border p-2 w-[320px]'
        />
      </div>

      <div className='flex flex-row items-center justify-center gap-3'>
        <span>PW</span>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='border p-2 w-[320px]'
        />
      </div>

      <button type='submit' className='bg-primary-red-50 text-white p-2 rounded'>
        Login
      </button>
    </form>
  );
};

export default LoginForm;
