import React from 'react';
import FillIcon from './atomic/IconLabel';
import Link from 'next/link';

interface MainGridHeaderProps {
  title: string;
  href: string;
}

const MainGridHeader = ({ title, href }: MainGridHeaderProps) => {
  return (
    <div
      className='
        h-[52px] 
        w-full 
        flex 
        items-center 
        justify-between 
        border-b-[1px] 
        border-b-grayscale-gray-90
        p-[10px_12px]
        '
    >
      <span className='text-base font-medium'>{title}</span>
      <Link href={href}>
        <FillIcon label='More' />
      </Link>
    </div>
  );
};

export default MainGridHeader;
