import Select from 'react-select';
import SearchIcon from '@mui/icons-material/Search';

export interface FilterOptions {
  label: string;
  value: string;
}

interface FilterSearchBarProps {
  filterOptions: FilterOptions[];
  fieldName: string;
  showSearch?: boolean;
  selectedFilter: string;
  setSelectedFilter: React.Dispatch<React.SetStateAction<string>>;
  searchQuery?: string;
  setSearchQuery?: React.Dispatch<React.SetStateAction<string>>;
  handleSearch?: () => void;
}

const FilterSearchBar = ({
  filterOptions,
  fieldName,
  showSearch = false,
  selectedFilter,
  setSelectedFilter,
  searchQuery,
  setSearchQuery,
  handleSearch,
}: FilterSearchBarProps) => {
  const selectedOption = filterOptions.find((option) => option.value === selectedFilter) || null;

  return (
    <div className='relative flex items-center'>
      <span className='text-xs text-center pr-3'>{fieldName}</span>
      <div className='relative flex items-center h-8'>
        {/* 좌측 필터 */}
        <div className={`flex ${showSearch ? 'w-32' : 'w-[300px]'} ${showSearch ? 'rounded-l-md' : 'rounded-md'}`}>
          <Select
            options={filterOptions}
            value={selectedOption}
            onChange={(option) => setSelectedFilter(option?.value ?? '')}
            className='w-full text-xs'
            classNamePrefix='custom-select'
            menuPlacement='bottom'
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: '32px',
                height: '32px',
                borderColor: '#d1d5db', // gray-300
                borderRadius: showSearch ? '4px 0 0 4px' : '4px',
                backgroundColor: 'white',
                fontSize: '12px',
              }),
              indicatorsContainer: (base) => ({
                ...base,
                height: '32px',
              }),
              valueContainer: (base) => ({
                ...base,
                height: '32px',
                padding: '0 8px',
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
          />
        </div>

        {/* 우측 검색창 */}
        {showSearch && setSearchQuery && (
          <div className='flex items-center h-8 w-[170px] border border-gray-300 border-l-0 rounded-r-md bg-white overflow-hidden'>
            <input
              type='text'
              className='flex-grow px-2 text-gray-700 text-xs h-full outline-none bg-white'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch?.()}
              placeholder='검색어 입력'
            />
            <button
              type='button'
              onClick={handleSearch}
              className='flex items-center justify-center h-full w-8 border-l border-gray-300 bg-white'
            >
              <SearchIcon sx={{ color: '#6b7280', fontSize: 20 }} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSearchBar;
