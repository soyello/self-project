interface Props {
  label: React.ReactNode;
}

const IconLabel = ({ label }: Props) => {
  return (
    <div
      className='
        h-8 
        flex 
        items-center 
        justify-center 
        p-[6px_20px_7px] 
        font-semibold 
        text-xs 
        text-white 
        bg-primary-red-50 
        rounded-lg
        transition-colors
        hover:text-gray-90
        hover:bg-primary-red-10
        '
    >
      {typeof label === 'string' ? <span>{label}</span> : label}
    </div>
  );
};

export default IconLabel;
