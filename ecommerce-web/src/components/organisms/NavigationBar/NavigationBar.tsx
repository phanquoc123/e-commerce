import MenuItem from '../../molecules/MenuItem/MenuItem';
import type { NavigationItem } from '../../../data/mockData';

interface NavigationBarProps {
  items: NavigationItem[];
  className?: string;
}

export default function NavigationBar({ items, className = '' }: NavigationBarProps) {
  return (
    <div
      className={`grid grid-cols-2 items-center justify-center gap-2 text-center lg:flex ${className}`}
    >
      {items.map(item => (
        <MenuItem key={item.id} label={item.label} slug={item.slug} icon={item.icon} />
      ))}
    </div>
  );
}
