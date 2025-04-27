import { usePageLocationStore } from '@/stores/pageLocationStore';
import { PageLocation } from '@/types/typeCollection';
import Link from 'next/link';
import React, { useState } from 'react';
import Tooltip from '../atomic/Tooltip';

interface SidebarItemProps {
  pageLocation?: PageLocation;
  href: string;
  children: React.ReactNode;
  tooltipText: string | string[];
}

const SidebarItem = ({ pageLocation, href, children, tooltipText }: SidebarItemProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { pageLocationState } = usePageLocationStore();

  const isSelected = pageLocation === pageLocationState;

  const baseClass = `
      w-[60px]
      h-[60px]
      rounded-[3px]
      flex
      justify-center
      items-center
      cursor-pointer
      transition-colors
      relative
      `;

  const selectedStyle = 'rounded-none bg-transparent border-r-4 border-primary-red-50 pl-1 text-primary-red-50';
  const hoverStyle = 'hover:bg-primary-red-10 hover:text-primary-red-80';

  const finalClass = `
      ${baseClass}
      ${isSelected ? selectedStyle : hoverStyle}`;

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  return (
    <Link href={href} className={finalClass} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {showTooltip && <Tooltip text={tooltipText} position='right' />}
    </Link>
  );
};

export default SidebarItem;
