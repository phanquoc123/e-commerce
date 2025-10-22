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
      <a href="/cart">
        <FontAwesomeIcon className="h-[25px] w-[34px] lg:h-6 lg:w-6" icon={faCartShopping} />
      </a>
    </div>
  );
}
