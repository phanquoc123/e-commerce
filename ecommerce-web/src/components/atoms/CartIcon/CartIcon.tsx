import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import Badge from '../Badge/Badge';

interface CartIconProps {
  count?: number;
  onClick?: () => void;
  className?: string;
}

export default function CartIcon({ count = 0, onClick, className = '' }: CartIconProps) {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center p-2 hover:opacity-70 ${className}`}
      aria-label="Giỏ hàng"
    >
      <FontAwesomeIcon icon={faCartShopping} className="h-6 w-6" />
      <Badge count={count} />
    </button>
  );
}

