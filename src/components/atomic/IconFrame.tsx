import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onClick: () => void;
}

const IconFrame = ({ children, onClick }: Props) => {
  return (
    <div
      className='
        w-8 
        h-8 
        rounded-lg 
        flex 
        justify-center 
        items-center 
        bg-primary-red-50 
        text-white 
        hover:bg-primary-red-10 
        hover:text-gray-90
        cursor-pointer'
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default IconFrame;
