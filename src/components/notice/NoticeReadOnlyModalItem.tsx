interface NoticeReadOnlyModalItemProps {
  title: string;
  textSize?: 'short' | 'medium';
  longHeight?: string;
  children: React.ReactNode;
  filterOptions?: { label: string; filterValue: string }[];
}
const NoticeReadOnlyModalItem = ({
  title,
  textSize,
  longHeight,
  children,
  filterOptions,
}: NoticeReadOnlyModalItemProps) => {
  const itemClass = 'flex items-center mt-[10px] pr-1';
  const titleClass = 'w-1/5 text-xs font-semibold pl-1';
  const contentClass = 'border-[1px] border-gray-90 rounded-[4px] flex px-3 text-xs font-normal';
  const content = (
    <div className={itemClass}>
      <span className={titleClass}>{title}</span>
      {textSize == 'short' ? (
        <div className={`${contentClass} w-1/3 items-center h-8`}>
          {title == 'Category' && filterOptions
            ? filterOptions.find((option) => option.filterValue === children)?.label
            : children}
        </div>
      ) : textSize == 'medium' ? (
        <div className={`${contentClass} w-4/5 items-center h-8`}>{children}</div>
      ) : (
        <div
          className={`${contentClass} ${
            longHeight ? longHeight : ''
          } w-4/5 items-start leading-[18px] overflow-auto whitespace-pre-wrap`}
        >
          {children}
        </div>
      )}
    </div>
  );

  return content;
};

export default NoticeReadOnlyModalItem;
