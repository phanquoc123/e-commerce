import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import SearchBar from '../../molecules/SearchBar';
import CategoryButton from '../../molecules/CategoryButton/CategoryButton';
import Logo from '../../atoms/Logo/Logo';
import MegaMenu from '../MegaMenu/MegaMenu';

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 mx-auto flex h-[60px] w-full items-center justify-between border-b border-gray-300 bg-white lg:px-12 lg:py-4">
        <CategoryButton onClick={() => setIsMegaMenuOpen(true)} />
        <Logo />
        <div className="flex items-center justify-center gap-3">
          <div onClick={() => setIsMegaMenuOpen(true)} className="cursor-pointer">
            <SearchBar />
          </div>
          <FontAwesomeIcon icon={faCartShopping} width={24} height={24} />
        </div>
      </header>

      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
    </>
  );
}
