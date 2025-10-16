interface CategoryIconProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CategoryIcon({ 
  src, 
  alt, 
  className = '' 
}: CategoryIconProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`h-12 w-12 rounded-full object-cover ${className}`}
    />
  );
}
