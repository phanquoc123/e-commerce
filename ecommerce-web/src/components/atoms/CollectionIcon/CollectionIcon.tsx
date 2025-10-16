interface CollectionIconProps {
  src: string;
  alt: string;
  className?: string;
}

export default function CollectionIcon({ 
  src, 
  alt, 
  className = '' 
}: CollectionIconProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`h-8 w-8 rounded-full object-cover ${className}`}
    />
  );
}
