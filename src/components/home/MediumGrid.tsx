import Link from 'next/link';
import React from 'react';

const MediumGrid = ({ icon, href, title }: { icon: React.ReactNode; href: string; title: string }) => {
  return (
    <div
      className='
        flex 
        flex-row 
        items-center
        justify-center 
        bg-white
        w-[427px] 
        h-[230px] 
        rounded-lg'
    >
      <Link href={href} className='flex flex-col items-center'>
        <div className='w-[60px] h-[60px] flex justify-center items-center'>{icon}</div>
        <span className='text-lg font-bold'>{title}</span>
      </Link>
    </div>
  );
};

export default MediumGrid;
