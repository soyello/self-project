export interface Notice {
  id: number;
  pinned: boolean;
  category_code: NoticeCategoryCd;
  title: string;
  content: string;
  writer: string;
  created_at: string;
}

export interface RecycleBin {
  recyclebin_no: number;
  name: string;
  type: string;
  origin_location: string;
  dltd_date: number;
  dltd_by: string;
}

export interface BreadCrumbNodeInfo {
  icon?: JSX.Element; // 대표 아이콘
  url: string; // URL (key를 위해 필수)
  text: string; // 제목 (필수)
}

/**
 * Sidebar 등의 아이템 중에서 선택된것을 표시할때 사용.
 */
export type PageLocation = 'NO LOCATION' | 'HOME' | 'RECYCLE BIN' | 'ADMIN';

/**
 * 유저 정보
 */
export interface UserInfo {
  id: string;
  name: string;
  email: string;
  password?: string; // 이 필드는 서버사이드에서만 사용할 것
  joined_date: string;
  role: string;
}

export type UserAuthCd = 'ADMIN' | 'USER';

export interface UserAuth {
  auth_cd: UserAuthCd;
}

/**
 * Notice 타입
 */
export type NoticeCategoryCd = 'NOTICE' | 'MANUAL';

interface NoticeCategoryInfo {
  label: string;
}

export const NOTICE_TYPE_INFO: Record<NoticeCategoryCd, NoticeCategoryInfo> = {
  NOTICE: {
    label: 'Notice',
  },
  MANUAL: {
    label: 'Manual',
  },
};
/**
 * Notice 검색 필터 타입
 */
export type NoticeSearchFilterCd = 'N000' | 'N001';

interface NoticeSearchFilterInfo {
  label: string;
}

export const NOTICE_SEARCH_FILTER_INFO: Record<NoticeSearchFilterCd, NoticeSearchFilterInfo> = {
  N000: {
    label: 'Title',
  },
  N001: {
    label: 'Writer',
  },
};

/**
 * RecycleBin 검색 필터 타입
 */
export type RecycleBinSearchFilterCd = 'E000' | 'E001' | 'E002' | 'E003' | 'E004';

interface RecycleBinSearchFilterInfo {
  label: string;
}

export const RECYCLE_BIN_SEARCH_FILTER_INFO: Record<RecycleBinSearchFilterCd, RecycleBinSearchFilterInfo> = {
  E000: { label: 'Name' },
  E001: { label: 'Type' },
  E002: { label: 'Origin Location' },
  E003: { label: 'Deleted on' },
  E004: { label: 'Deleted by' },
};

//Admin-Users 검색 타입 코드
type AdminUserSearchCd = 'A000' | 'A001' | 'A002' | 'A003' | 'A004' | 'A005';

interface AdminUserSearchTypeInfo {
  label: string;
}

export const ADMIN_USER_SEARCH_INFO: Record<AdminUserSearchCd, AdminUserSearchTypeInfo> = {
  A000: {
    label: 'ID',
  },
  A001: {
    label: 'Name',
  },
  A002: {
    label: 'Email',
  },
  A003: {
    label: 'Department',
  },
  A004: {
    label: 'Location',
  },
  A005: {
    label: 'Joined Date',
  },
};
