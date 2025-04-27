import LockIcon from '@mui/icons-material/Lock';

const ConfidentialGrid = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-3 bg-white w-[881px] h-[362px] rounded-lg p-6 cursor-pointer'>
      <LockIcon sx={{ color: 'disabled', fontSize: 100 }} />
      <span className='text-4xl font-bold'>Confidential</span>
      <span className='text-xl font-semibold'>비공개 영역입니다.</span>
    </div>
  );
};

export default ConfidentialGrid;
