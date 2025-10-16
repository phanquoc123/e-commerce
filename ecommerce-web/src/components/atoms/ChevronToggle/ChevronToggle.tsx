import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface ChevronToggleProps {
  isExpanded: boolean;
  onClick: () => void;
  className?: string;
}

export default function ChevronToggle({ 
  isExpanded, 
  onClick, 
  className = '' 
}: ChevronToggleProps) {
  return (
    <button
      onClick={onClick}
      className={`h-2 w-5 ${className}`}
      aria-label="Toggle subcategories"
    >
      <FontAwesomeIcon 
        icon={isExpanded ? faChevronUp : faChevronDown} 
        className="h-4 w-4" 
      />
    </button>
  );
}
