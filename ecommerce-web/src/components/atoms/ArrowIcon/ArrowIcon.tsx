import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

interface ArrowIconProps {
  className?: string;
  rotated?: boolean;
}

export default function ArrowIcon({ 
  className = '', 
  rotated = true 
}: ArrowIconProps) {
  return (
    <FontAwesomeIcon 
      icon={faTag} 
      className={`h-4 w-4 text-gray-400 ${rotated ? 'rotate-180' : ''} ${className}`} 
    />
  );
}
