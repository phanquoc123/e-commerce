interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  withArrow?: boolean;
}

export default function SectionTitle({ 
  children, 
  className = '', 
  withArrow = false 
}: SectionTitleProps) {
  return (
    <h2 className={`flex items-center gap-2 text-xl font-bold ${className}`}>
      {children}
      {withArrow && <span className="text-sm">↗</span>}
    </h2>
  );
}
