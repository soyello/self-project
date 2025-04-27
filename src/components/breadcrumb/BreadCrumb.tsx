import { BreadCrumbNodeInfo } from '@/types/typeCollection';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import Link from 'next/link';
import { Fragment } from 'react';

interface props {
  breadCrumbNodeInfos: BreadCrumbNodeInfo[];
}

/**
 * 브레드크럼의 조각(레벨)을 만든다.
 * @param breadCrumbNodeInfo 브레드크럼 조각에 필요한 기본 정보
 * @param isLast 마지막 원소 여부
 * @returns 브레드크럼 조각
 */
const BreadCrumbNode = (breadCrumbNodeInfo: BreadCrumbNodeInfo, isLast: boolean) => {
  const url = breadCrumbNodeInfo.url;
  const text = breadCrumbNodeInfo.text;

  return (
    <Fragment key={url}>
      <div className='text-gray-700'>
        {breadCrumbNodeInfo.icon ?? <FolderOutlinedIcon sx={{ color: 'inherit', fontSize: 30 }} />}
      </div>
      {isLast || text.length <= 10 ? (
        <Link href={url} className='text-gray-700 font-bold truncate max-w-[800px] shrink-0'>
          {text}
        </Link>
      ) : (
        <Link href={url} className='text-gray-700 font-bold truncate max-w-[800px]'>
          {text}
        </Link>
      )}
      {isLast || (
        <div>
          <ChevronRightIcon sx={{ color: 'inherit', fontSize: 30 }} />
        </div>
      )}
    </Fragment>
  );
};

const BreadCrumb = ({ breadCrumbNodeInfos }: props) => {
  const lastIndex = breadCrumbNodeInfos.length - 1;

  return (
    <div className='layout-box shadow-lg flex items-center gap-3 w-auto h-16'>
      {breadCrumbNodeInfos.map((info, index) => BreadCrumbNode(info, index == lastIndex))}
    </div>
  );
};

export default BreadCrumb;
