import { ADMIN_PAGE_LIMIT_SIZE } from '@/constants/limitConstants';
import { UserInfo } from '@/types/typeCollection';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface getQuery {
  start_page?: string;
  search_filter?: string;
  search_query?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const { start_page = '1', search_filter, search_query } = req.query as getQuery;

    // 모든 유저 가져오기
    const response = await axios.get<UserInfo[]>(`${baseURL}/users`);
    let userList = response.data;

    // 검색 필터
    if (search_query && search_query.trim() !== '') {
      const query = search_query.trim().toLowerCase();

      const filterMap: Record<string, (user: UserInfo) => boolean> = {
        U000: (user) => user.id.toString().includes(query),
        U001: (user) => (user.name ?? '').toLowerCase().includes(query),
        U002: (user) => (user.email ?? '').toLowerCase().includes(query),
      };

      if (search_filter && filterMap[search_filter]) {
        userList = userList.filter(filterMap[search_filter]);
      } else {
        userList = userList.filter((user) => Object.values(filterMap).some((fn) => fn(user)));
      }
    }

    // pagination
    const page = parseInt(start_page, 10) || 1;
    const limitSize = ADMIN_PAGE_LIMIT_SIZE;
    const offset = (page - 1) * limitSize;
    const paginatedUsers = userList.slice(offset, offset + limitSize);

    res.status(200).json({
      userList: paginatedUsers,
      totalCount: userList.length,
    });
  } catch (error) {
    console.error('User 목록 조회 실패:', error);
    res.status(500).json({ message: '서버 오류' });
  }
}
