import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faStore,
  faNewspaper,
  faGift,
  faTag,
  faShirt,
} from '@fortawesome/free-solid-svg-icons';

interface MenuItemProps {
  label: string;
  slug: string;
  icon?: string;
  className?: string;
}

const iconMap: Record<string, any> = {
  home: faHome,
  store: faStore,
  news: faNewspaper,
  gift: faGift,
  tag: faTag,
  uniform: faShirt,
};

export default function MenuItem({ label, slug, icon, className = '' }: MenuItemProps) {
  const iconComponent = icon && iconMap[icon];

  return (
    <a
      href={slug}
      className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 ${className}`}
    >
      {iconComponent && <FontAwesomeIcon icon={iconComponent} className="h-4 w-4" />}
      <span>{label}</span>
    </a>
  );
}

