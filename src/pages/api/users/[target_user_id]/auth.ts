import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { target_user_id } = req.query as { target_user_id: string };

  const id = String(target_user_id);

  if (!target_user_id) {
    return res.status(400).json({ message: 'target_user_id가 필요합니다.' });
  }

  try {
    if (req.method === 'GET') {
      const response = await axios.get(`${baseURL}/users/${target_user_id}`);
      const user = response.data;

      if (!user) {
        return res.status(404).json({ message: '사용자를 찾을 수 없습니다.' });
      }

      const auth = user.role === 'admin' ? 'ADMIN' : 'USER';

      return res.status(200).json(auth);
    }

    if (req.method === 'POST') {
      const { auth } = req.body as { auth: string };

      if (typeof auth !== 'string') {
        return res.status(400).json({ message: 'auth가 필요합니다.' });
      }

      const newRole = auth === 'ADMIN' ? 'admin' : 'user';

      await axios.patch(`${baseURL}/users/${target_user_id}`, {
        role: newRole,
      });

      return res.status(200).json({ message: '권한 업데이트 성공' });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류' });
  }
}
