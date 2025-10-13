import InputSearch from '../atoms/InputSearch/InputSearch';

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
  debounceMs?: number;
}

export default function SearchBar({ onSearch, className = '', debounceMs }: SearchBarProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <InputSearch onSearch={onSearch} debounceMs={debounceMs} />
    </div>
  );
}
