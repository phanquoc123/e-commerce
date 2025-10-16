interface DefaultIconProps {
  icon?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function DefaultIcon({ 
  icon = '👤',
  className = '',
  size = 'md'
}: DefaultIconProps) {
  const sizeClasses = {
    sm: 'h-6 w-6 text-xs',
    md: 'h-8 w-8 text-sm',
    lg: 'h-12 w-12 text-base'
  };

  const sizeClass = sizeClasses[size];
  
  return (
    <div className={`flex items-center justify-center rounded-full bg-gray-200 ${sizeClass} ${className}`}>
      <span className="font-medium text-gray-600">{icon}</span>
    </div>
  );
}
