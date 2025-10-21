interface ProductInfoProps {
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  sku: string;
}

export default function ProductInfo({
  name,
  price,
  originalPrice,
  discount,
  sku,
}: ProductInfoProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-right">
        <p className="text-price-lg !font-extrabold text-red-600 lg:text-[20px] lg:font-semibold lg:leading-8">
          {price.toLocaleString('vi-VN')}đ
        </p>
        {originalPrice && (
          <p className="text-price-md text-theme-text-secondary lg:text-price-lg line-through lg:text-[16px] lg:font-semibold lg:leading-8">
            {originalPrice.toLocaleString('vi-VN')}đ
          </p>
        )}
        {discount && (
          <div className="text-label-sm inline-flex items-center gap-[2px] rounded-md bg-red-600 px-1 py-[2px] text-white lg:rounded-lg lg:px-2">
            -{discount}%
          </div>
        )}
      </div>
      <h1 className="text-body-md line-clamp-1 lg:line-clamp-2 lg:text-[30px] lg:font-light lg:leading-8">
        {name}
      </h1>
      <p className="text-body-sm text-theme-text-secondary my-3 flex items-center gap-1">{sku}</p>
    </div>
  );
}
