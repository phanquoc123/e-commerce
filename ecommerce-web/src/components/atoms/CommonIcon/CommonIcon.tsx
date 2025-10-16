interface CommonIconProps {
  src: string;
  alt: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function CommonIcon({ 
  src, 
  alt, 
  className = '',
  size = 'md'
}: CommonIconProps) {
  const sizeClasses = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12 lg:h-11 lg:w-11'
  };

  const baseClasses = 'rounded-full object-cover';
  const sizeClass = sizeClasses[size];
  
  return (
    <img
      src={src}
      alt={alt}
      className={`${baseClasses} ${sizeClass} ${className}`}
      loading="lazy"
    />
  );
}
