import React from "react";

interface BreadCrumbIconProps {
  className?: string;
  children: React.ReactNode;
}

const BreadCrumbIcon = ({ className, children }: BreadCrumbIconProps) => {
  return (
    <div
      className={`w-5 h-5 flex justify-center items-center ${className}`}
    >
      {children}
    </div>
  );
};

export default BreadCrumbIcon;
