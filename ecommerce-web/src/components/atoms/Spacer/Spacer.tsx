interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export default function Spacer({ 
  size = 'md', 
  className = '' 
}: SpacerProps) {
  const sizeClasses = {
    xs: 'h-2 w-2',
    sm: 'h-3 w-3',
    md: 'h-5 w-5',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const sizeClass = sizeClasses[size];
  
  return (
    <div className={`${sizeClass} ${className}`} />
  );
}
