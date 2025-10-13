import MenuItem from '../../molecules/MenuItem/MenuItem';
import type { NavigationItem } from '../../../data/mockData';

interface NavigationBarProps {
  items: NavigationItem[];
  className?: string;
}

export default function NavigationBar({ items, className = '' }: NavigationBarProps) {
  return (
    <nav
      className={`flex items-center justify-center border-b border-gray-200 bg-white ${className}`}
    >
      <div className="flex items-center gap-1">
        {items.map((item) => (
          <MenuItem key={item.id} label={item.label} slug={item.slug} icon={item.icon} />
        ))}
      </div>
    </nav>
  );
}

