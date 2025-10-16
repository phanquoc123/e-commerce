import { useEffect, useState } from 'react';

interface InputSearchProps {
  onSearch?: (query: string) => void;
  className?: string;
  debounceMs?: number;
}

export default function InputSearchLarge({
  onSearch,
  className = '',
  debounceMs = 300,
}: InputSearchProps) {
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(inputValue);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [inputValue, onSearch, debounceMs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Tìm kiếm"
      value={inputValue}
      onChange={handleChange}
      className={`h-11 w-full rounded-full border border-gray-300 px-4 py-2 focus:outline-none lg:py-3 ${className}`}
    />
  );
}
