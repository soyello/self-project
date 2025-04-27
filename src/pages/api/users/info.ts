import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { UserInfo } from '@/types/typeCollection';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { user_id } = req.query;

    if (!user_id || Array.isArray(user_id)) {
      return res.status(400).json({ message: '유효하지 않은 user_id입니다.' });
    }

    try {
      const response = await axios.get<UserInfo[]>(`${baseURL}/users`, {
        params: { id: user_id }, // id로 조회
      });

      const userInfos = response.data;

      if (userInfos.length !== 1) {
        return res.status(404).json({ message: '유저를 찾을 수 없습니다.' });
      }

      const userInfo = userInfos[0];

      res.status(200).json({
        user_id: String(userInfo.id),
        user_name: userInfo.name,
        user_email: userInfo.email,
      });
    } catch (error) {
      console.error('유저 조회 실패:', error);
      res.status(500).json({ message: '서버 오류' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
