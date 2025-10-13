import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

interface CategoryButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function CategoryButton({ 
  onClick, 
  className = '', 
  disabled = false 
}: CategoryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex h-[32px] w-32 min-w-32 cursor-pointer items-center gap-2 rounded-full border border-gray-300 p-2 text-center outline-none transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <FontAwesomeIcon icon={faBars} />
      <span>Danh mục</span>
    </button>
  );
}
