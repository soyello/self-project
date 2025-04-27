import React from 'react';

const SmallGrid = ({
  icon,
  title,
  alertMessage, //구현 후 삭제
}: {
  icon: React.ReactNode;
  title: string;
  alertMessage: string;
}) => {
  return (
    <div
      className='
        flex 
        items-center
        justify-center 
        bg-white
        w-[279px] 
        h-[108px] 
        rounded-lg'
    >
      <button className='w-full flex justify-center items-center' onClick={() => alert(alertMessage)}>
        <div className='w-[60px] h-[60px] flex justify-center items-center rounded-full bg-primary-bluegreen-10'>
          {icon}
        </div>
        <span className='px-4'>{title}</span>
      </button>
    </div>
  );
};

export default SmallGrid;
