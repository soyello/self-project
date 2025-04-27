import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { Notice } from '@/types/typeCollection';
import { NOTICE_PAGE_LIMIT_SIZE } from '@/constants/limitConstants';

const baseURL = process.env.NEXT_PUBLIC_API_URL; // 환경변수 사용

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const {
      mode = 'notice',
      start_page = 1,
      category_cd,
      search_filter,
      search_query,
    } = req.query as {
      mode?: 'main' | 'notice';
      start_page?: string;
      category_cd?: string;
      search_filter?: string;
      search_query?: string;
    };

    try {
      const response = await axios.get<Notice[]>(`${baseURL}/notices`);
      let noticeList = response.data;

      // 1. 필터링
      if (category_cd) {
        noticeList = noticeList.filter((notice) => notice.category_code === category_cd);
      }

      if (search_query && search_query.trim() !== '') {
        const query = search_query.trim().toLowerCase();
        if (search_filter === 'N000') {
          noticeList = noticeList.filter((notice) => notice.title.toLowerCase().includes(query));
        } else if (search_filter === 'N001') {
          noticeList = noticeList.filter((notice) => (notice.writer ?? '').toLowerCase().includes(query));
        } else {
          noticeList = noticeList.filter(
            (notice) =>
              notice.title.toLowerCase().includes(query) || (notice.writer ?? '').toLowerCase().includes(query)
          );
        }
      }

      // 2. pinned 먼저 정렬
      noticeList = noticeList.sort((a, b) => {
        if (a.pinned === b.pinned) {
          return b.id - a.id;
        }
        return a.pinned ? -1 : 1;
      });

      // 3. pagination
      const page = parseInt(start_page as string) || 1;
      const limitSize = mode === 'main' ? 6 : NOTICE_PAGE_LIMIT_SIZE;
      const offset = (page - 1) * limitSize;
      const paginatedNotices = noticeList.slice(offset, offset + limitSize);

      res.status(200).json({
        noticeList: paginatedNotices,
        totalCount: noticeList.length,
      });
    } catch (error) {
      console.error('공지 목록 가져오기 실패:', error);
      res.status(500).json({ message: '공지 목록 가져오기 실패' });
    }
  } else if (req.method === 'POST') {
    try {
      const { pinned, category_code, title, content, created_at, writer } = req.body;
      const { data: allNotices } = await axios.get<Notice[]>(`${baseURL}/notices`);
      const maxId = allNotices.length > 0 ? Math.max(...allNotices.map((n) => n.id)) : 0;
      const nextId = String(maxId + 1);
      await axios.post(`${baseURL}/notices`, {
        id: nextId,
        pinned,
        category_code,
        title,
        content,
        created_at,
        writer,
      });
      res.status(201).json({ success: true });
    } catch (error) {
      console.error('공지 생성 실패:', error);
      res.status(500).json({ message: '서버 오류' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
