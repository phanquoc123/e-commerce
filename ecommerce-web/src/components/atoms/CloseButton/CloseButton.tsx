interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function CloseButton({ 
  onClick, 
  className = '', 
  children = '✕ Đóng' 
}: CloseButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full bg-gray-800 px-6 py-2 text-white hover:bg-gray-700 ${className}`}
    >
      {children}
    </button>
  );
}
