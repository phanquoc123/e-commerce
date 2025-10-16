import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../SearchBar/SearchBar';

interface HeaderActionsProps {
  onSearchClick: () => void;
}

export default function HeaderActions({ onSearchClick }: HeaderActionsProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="cursor-pointer">
        <SearchBar onClick={onSearchClick} />
      </div>
      <FontAwesomeIcon icon={faCartShopping} width={24} height={24} />
    </div>
  );
}
