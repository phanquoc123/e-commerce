import { useState } from 'react';
import CategoryButton from '../../molecules/CategoryButton/CategoryButton';
import Logo from '../../atoms/Logo/Logo';
import MegaMenu from '../MegaMenu/MegaMenu';
import HeaderActions from '../../molecules/HeaderActions/HeaderActions';

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 mx-auto flex h-[60px] w-full items-center justify-between border-b border-gray-300 bg-white p-4 lg:px-12 lg:py-4">
        <CategoryButton onClick={() => setIsMegaMenuOpen(true)} />
        <Logo />
        <HeaderActions onSearchClick={() => setIsMegaMenuOpen(true)} />
      </header>

      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
    </>
  );
}
