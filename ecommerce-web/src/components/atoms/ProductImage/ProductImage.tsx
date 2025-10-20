interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = '' }: ProductImageProps) {
  return (
    <div
      className={`aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-md bg-slate-400${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform lg:min-h-full"
        loading="lazy"
      />
    </div>
  );
}
