interface ChevronButtonProps {
  isExpanded: boolean;
  onClick: (event: React.MouseEvent) => void;
  className?: string;
}

export default function ChevronButton({ 
  isExpanded, 
  onClick, 
  className = '' 
}: ChevronButtonProps) {
  return (
    <div
      className={`flex h-5 w-5 items-center justify-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      <svg
        className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${
          isExpanded ? 'rotate-90' : ''
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </div>
  );
}
