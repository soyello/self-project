interface BreadCrumbTextProps {
  children: React.ReactNode;
}

const BreadCrumbText = ({ children }: BreadCrumbTextProps) => {
  return <span className="text-grayscale-gray-90 font-bold">{children}</span>;
};

export default BreadCrumbText;
