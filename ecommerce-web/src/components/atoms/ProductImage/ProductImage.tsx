interface ProductImageProps {
  src: string;
  alt: string;
  discount?: number;
  className?: string;
  slug?: string;
  colorId?: number;
  sizeId?: number;
}

export default function ProductImage({
  src,
  alt,
  discount,
  className = '',
  slug,
  colorId,
  sizeId,
}: ProductImageProps) {
  // Tạo URL với query params
  const getProductUrl = () => {
    if (!slug) return '#';
    const params = new URLSearchParams();
    if (colorId) params.append('color', colorId.toString());
    if (sizeId) params.append('size', sizeId.toString());
    return `/product/${slug}${params.toString() ? `?${params.toString()}` : ''}`;
  };

  // Use placeholder if src is empty
  const imageSrc = src || '/images/product/product-detail.webp';

  return (
    <div
      className={`relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-md bg-slate-400${className}`}
    >
      <a href={getProductUrl()}>
        <img
          src={imageSrc}
          alt={alt}
          className="h-full w-full object-cover transition-transform lg:min-h-full"
          loading="lazy"
        />
      </a>
      {discount && (
        <div className="text-label-sm absolute right-2 top-2 inline-flex items-center gap-[2px] rounded-md bg-red-600 px-1 py-[2px] text-white lg:rounded-lg lg:px-2 lg:text-[14px] lg:font-semibold lg:leading-7">
          -{discount}%
        </div>
      )}
    </div>
  );
}
