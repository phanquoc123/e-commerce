interface GenderCategoryLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function GenderCategoryLink({ 
  href, 
  children, 
  className = '' 
}: GenderCategoryLinkProps) {
  return (
    <a
      href={href}
      className={`flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600 ${className}`}
    >
      {children}
    </a>
  );
}
