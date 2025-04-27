interface TooltipProps {
  text: string | string[];
  position: 'top' | 'bottom' | 'left' | 'right';
}

const tooltipPosition = {
  top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-3 z-10',
  bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-3 z-10',
  left: 'right-full top-1/2 transform -translate-y-1/2 mr-3 z-10',
  right: 'left-full top-1/2 transform -translate-y-1/2 ml-3 z-10',
};

const tooltipTail = {
  top: 'absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6.5px] border-r-[6.5px] border-b-[10px] border-transparent border-t-gray-90 z-10',
  bottom:
    'absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full w-0 h-0 border-l-[6.5px] border-r-[6.5px] border-b-[10px] border-transparent border-b-gray-90 z-10',
  left: 'absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-[6.5px] border-b-[6.5px] border-l-[10px] border-transparent border-lgray-90 z-10',
  right:
    'absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full w-0 h-0 border-t-[6.5px] border-b-[6.5px] border-r-[10px] border-transparent border-r-gray-90 z-10',
};

const Tooltip = ({ text, position }: TooltipProps) => {
  return (
    <div
      className={`
            absolute 
            pointer-events-none
            ${tooltipPosition[position]} 
            bg-gray-90
            text-white
            text-[12px] 
            px-2 
            py-[10px] 
            rounded 
            shadow-lg 
            whitespace-nowrap`}
    >
      {Array.isArray(text) ? text.map((line, index) => <p key={index}>{line}</p>) : text}
      <div className={`${tooltipTail[position]}`} />
    </div>
  );
};

export default Tooltip;
