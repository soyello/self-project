import { Notice } from '@/types/typeCollection';
import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { notice_id } = req.query;

  if (!notice_id || Array.isArray(notice_id)) {
    return res.status(400).json({ message: '유효하지 않은 notice_id' });
  }

  try {
    if (req.method === 'GET') {
      const response = await axios.get<Notice>(`${baseURL}/notices/${notice_id}`);
      res.status(200).json(response.data);
    } else if (req.method === 'PUT') {
      const { pinned, category_code, title, content, created_at, writer } = req.body;
      const { data: allNotices } = await axios.get<Notice[]>(`${baseURL}/notices`);
      const maxId = allNotices.length > 0 ? Math.max(...allNotices.map((n) => n.id)) : 0;
      const nextId = String(maxId + 1);
      await axios.put(`${baseURL}/notices/${notice_id}`, {
        id: nextId,
        pinned,
        category_code,
        title,
        content,
        created_at,
        writer,
      });
      res.status(200).json({ success: true });
    } else if (req.method === 'DELETE') {
      await axios.delete(`${baseURL}/notices/${notice_id}`);
      res.status(200).json({ success: true });
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    console.error('공지 처리 실패:', error);
    res.status(500).json({ message: '서버 오류' });
  }
}
