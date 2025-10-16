import { useState } from 'react';

interface InputSearchProps {
  className?: string;
  debounceMs?: number;
  onClick?: () => void;
}

export default function InputSearch({ className = '', onClick }: InputSearchProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Tìm kiếm"
      value={inputValue}
      onChange={handleChange}
      onClick={onClick}
      className={`w-57.5 h-[34px] rounded-full border border-gray-300 p-2 focus:outline-none cursor-pointer ${className}`}
    />
  );
}
