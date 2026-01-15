import { useState, useEffect, useRef } from 'react';
import { useSearchProducts } from '../../../hooks/useProduct';
import SearchDropdown from '../SearchDropdown/SearchDropdown';

interface SearchBarProps {
  className?: string;
  debounceMs?: number;
  onClick?: () => void;
}

export default function SearchBar({ className = '', debounceMs = 500, onClick }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(inputValue);
      if (inputValue.trim().length > 0) {
        setIsDropdownOpen(true);
      } else {
        setIsDropdownOpen(false);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [inputValue, debounceMs]);

  // Search products
  const { data: searchResult, isLoading } = useSearchProducts(searchQuery, 8);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    // If there's already input, show dropdown (don't open MegaMenu)
    if (inputValue.trim().length > 0) {
      setIsDropdownOpen(true);
      return; // Don't trigger onClick (MegaMenu)
    }
    
    // If no input and onClick is provided (to open MegaMenu), call it
    if (onClick) {
      onClick();
    }
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpen(false);
    setInputValue('');
    setSearchQuery('');
  };

  return (
    <div ref={searchRef} className={`relative flex items-center ${className}`}>
      <input
        type="text"
        placeholder="Tìm kiếm"
        value={inputValue}
        onChange={handleChange}
        onClick={handleInputClick}
        className="w-57.5 h-[34px] rounded-full border border-gray-300 p-2 focus:outline-none cursor-pointer"
      />
      {isDropdownOpen && (
        <SearchDropdown
          products={searchResult?.items || []}
          isLoading={isLoading}
          query={searchQuery}
          onClose={handleCloseDropdown}
        />
      )}
    </div>
  );
}
