interface SubCategoryLinkProps {
  href: string;
  name: string;
  className?: string;
}

export default function SubCategoryLink({ 
  href, 
  name, 
  className = '' 
}: SubCategoryLinkProps) {
  return (
    <a
      href={href}
      className={`block py-1 text-sm text-gray-600 hover:text-blue-600 ${className}`}
    >
      {name}
    </a>
  );
}
