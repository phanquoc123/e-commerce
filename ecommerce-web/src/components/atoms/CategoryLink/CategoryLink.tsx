import CommonIcon from '../CommonIcon/CommonIcon';

interface CategoryLinkProps {
  href: string;
  icon: string;
  name: string;
  className?: string;
}

export default function CategoryLink({ 
  href, 
  icon, 
  name, 
  className = '' 
}: CategoryLinkProps) {
  return (
    <a
      href={href}
      className={`flex flex-1 items-center gap-3 text-gray-700 hover:text-blue-600 ${className}`}
    >
      <CommonIcon
        src={icon}
        alt={name}
        size="lg"
      />
      <span className="text-sm font-medium">{name}</span>
    </a>
  );
}
