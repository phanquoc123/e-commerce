interface OrderItemCardProps {
  imageUrl: string;
  name: string;
  variant: string;
  quantity: number;
  originalPrice?: number;
  finalPrice: number;
  className?: string;
}

export default function OrderItemCard({
  imageUrl,
  name,
  variant,
  quantity,
  originalPrice,
  finalPrice,
  className = ''
}: OrderItemCardProps) {
  // Use placeholder if imageUrl is empty
  const imageSrc = imageUrl || '/images/product/product-detail.webp';
  
  return (
    <div className={`flex flex-1 gap-3 ${className}`}>
      <div className="relative aspect-[3/4] h-[116px] w-[88px] min-w-[88px] lg:h-[176px] lg:w-[132px] lg:min-w-[132px]">
        <img
          className="size-full rounded-md object-cover"
          src={imageSrc}
          alt={name}
          width={88}
          height={116}
        />
      </div>
      <div className="flex w-full flex-col gap-2">
        <div className="flex justify-between gap-2">
          <p className="text-theme-text text-body-md line-clamp-2 text-start lg:text-[16px] lg:font-normal lg:leading-6">
            {name}
          </p>
        </div>
        <div>
          <p className="text-theme-text text-body-md line-clamp-2 text-start lg:text-[16px] lg:font-normal lg:leading-6">
            {variant}
          </p>
        </div>
        <div className="mt-auto flex items-end justify-between">
          <p className="text-theme-text text-body-md lg:text-label-md">X{quantity}</p>
          <div className="flex flex-col items-end gap-[2px]">
            {originalPrice && originalPrice > finalPrice && (
              <p className="text-price-sm text-theme-text-secondary lg:text-price-md line-through">
                {originalPrice.toLocaleString('vi-VN')}đ
              </p>
            )}
            <p className="text-price-md lg:text-price-lg !font-extrabold text-red-600">
              {finalPrice.toLocaleString('vi-VN')}đ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}











