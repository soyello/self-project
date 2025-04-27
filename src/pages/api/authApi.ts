import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const loginRequest = async (email: string, password: string) => {
  const res = await axios.get(`${baseURL}/users`, {
    params: { email, password },
  });

  const users = res.data;

  if (users.length === 0) {
    throw new Error('Invalid email or password');
  }

  const { id, email: userEmail, role } = users[0];

  return { id, email: userEmail, role }; // password는 제외하고 반환
};
