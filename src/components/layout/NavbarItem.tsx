import Link from "next/link";
import React, { useState } from "react";
import Tooltip from "../atomic/Tooltip";

interface NavbarItemProps {
  href?: string;
  children: React.ReactNode;
  tooltipText: string | string[];
  icon?: boolean;
  modalOpen?: boolean;
}

const NavbarItem = ({
  href,
  children,
  tooltipText,
  icon = true,
  modalOpen,
}: NavbarItemProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    if (!modalOpen) {
      setShowTooltip(true);
    }
  };
  const handleMouseLeave = () => setShowTooltip(false);

  const itemClass = `w-[40px] 
     h-[40px] 
     rounded-full 
     flex 
     justify-center 
     items-center 
     cursor-pointer 
     transition-colors 
     hover:bg-secondary-E5 
     hover:text-primary-bluegreen-90  
     relative
     `;

  const content = href ? (
    <Link
      href={href}
      className={itemClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {showTooltip && <Tooltip text={tooltipText} position="bottom" />}
    </Link>
  ) : (
    <div
      className={icon === true ? itemClass : "relative cursor-pointer"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        setShowTooltip(false);
      }}
    >
      {children}
      {showTooltip && <Tooltip text={tooltipText} position="bottom" />}
    </div>
  );

  return content;
};

export default NavbarItem;
