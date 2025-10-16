import InputSearch from '../../atoms/InputSearch/InputSearch';

interface SearchBarProps {
  className?: string;
  debounceMs?: number;
  onClick?: () => void;
}

export default function SearchBar({ className = '', debounceMs, onClick }: SearchBarProps) {
  return (
    <div className={`flex items-center ${className}`}>
      <InputSearch debounceMs={debounceMs} onClick={onClick} />
    </div>
  );
}
