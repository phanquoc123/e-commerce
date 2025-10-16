import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface MenuIconProps {
  icon: IconDefinition;
  className?: string;
}

export default function MenuIcon({ icon, className = '' }: MenuIconProps) {
  return (
    <FontAwesomeIcon 
      icon={icon} 
      className={`h-5 w-5 text-gray-600 ${className}`.trim()} 
    />
  );
}
