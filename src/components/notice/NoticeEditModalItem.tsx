import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { NOTICE_TYPE_INFO } from '@/types/typeCollection';

interface Props {
  title: string;
  inputRef?: React.RefObject<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;
  initialValue?: string;
}

const NoticeEditModalItem = ({ title, inputRef, initialValue }: Props) => {
  const renderItem = (title: string) => {
    switch (title) {
      case 'Date':
        return (
          <div className='border-[1px] border-grayscale-gray-90 rounded-[4px] flex px-3 font-normal text-grayscale-gray-90 text-xs items-center w-1/3 h-8'>
            {initialValue}
          </div>
        );
      case 'Category':
        return (
          <div className='relative flex items-center w-1/3'>
            <select
              id={title}
              ref={inputRef as React.RefObject<HTMLSelectElement>}
              defaultValue={initialValue}
              className={
                'flex border-[1px] border-grayscale-gray-90 rounded-[4px] px-3 font-normal text-grayscale-gray-90 text-xs items-center appearance-none h-8 w-full'
              }
            >
              <option value='' disabled hidden>
                카테고리를 선택하세요
              </option>
              {Object.entries(NOTICE_TYPE_INFO).map(([value, { label }]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <div className='absolute right-3 flex items-center pointer-events-none'>
              <ArrowDropDownIcon sx={{ color: 'inherit', fontSize: 20 }} />
            </div>
          </div>
        );
      case 'Title':
        return (
          <input
            type='text'
            ref={inputRef as React.RefObject<HTMLInputElement>}
            defaultValue={initialValue ?? ''}
            className='border-[1px] border-grayscale-gray-90 rounded-[4px] flex px-3 h-8 font-normal text-grayscale-gray-90 text-xs w-4/5'
          />
        );
      case 'Content':
        return (
          <textarea
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
            defaultValue={initialValue ?? ''}
            className='border-[1px] border-grayscale-gray-90 rounded-[4px] flex px-3 font-normal items-start w-4/5 leading-[18px] text-xs overflow-auto h-[208px] resize-none'
          />
        );
      case 'File':
        return (
          <div className='border-[1px] border-grayscale-gray-90 rounded-[4px] flex px-3 font-normal items-start w-4/5 leading-[18px] text-xs overflow-auto h-[118px]'>
            {initialValue ?? ''}
          </div>
        );
    }
  };
  return (
    <div className='relative flex items-center mt-[10px] pr-1'>
      <span className='w-1/5 text-xs font-semibold pl-1'>{title}</span>
      {renderItem(title)}
    </div>
  );
};

export default NoticeEditModalItem;
