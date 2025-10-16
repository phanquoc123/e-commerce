interface BackButtonProps {
  onClick: () => void;
  className?: string;
}

export default function BackButton({ onClick, className = '' }: BackButtonProps) {
  return (
    <button 
      onClick={onClick} 
      className={`text-2xl ${className}`}
      aria-label="Go back"
    >
      ←
    </button>
  );
}
