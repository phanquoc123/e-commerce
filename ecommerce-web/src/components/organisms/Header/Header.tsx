import { useEffect, useState } from 'react';
import CategoryButton from '../../molecules/CategoryButton/CategoryButton';
import Logo from '../../atoms/Logo/Logo';
import MegaMenu from '../MegaMenu/MegaMenu';
import HeaderActions from '../../molecules/HeaderActions/HeaderActions';

export default function Header() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 mx-auto flex h-[60px] max-w-screen-sm items-center justify-between border-b border-transparent p-4 transition-colors duration-300 lg:max-w-full lg:px-12 lg:py-4 ${
          isScrolled ? 'border-gray-300 bg-white' : 'bg-transparent'
        }`}
      >
        <CategoryButton
          className="fixed bottom-4 left-1/2 -translate-x-1/2 transform lg:static lg:bottom-auto lg:left-auto lg:translate-x-0"
          onClick={() => setIsMegaMenuOpen(true)}
        />
        <Logo />
        <HeaderActions onSearchClick={() => setIsMegaMenuOpen(true)} />
      </header>

      <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
    </>
  );
}
