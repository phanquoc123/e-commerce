interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  return (
    <div className={`aspect-square overflow-hidden rounded-lg bg-gray-100 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
        loading="lazy"
      />
    </div>
  );
}
