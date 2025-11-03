interface ProductInfoProps {
  name: string;
  price: number;
  salePrice?: number | null;
}

export default function ProductInfo({ name, price, salePrice }: ProductInfoProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-right">
        {salePrice && salePrice > 0 ? (
          <>
            <p className="text-price-lg !font-extrabold text-red-600 lg:text-[20px] lg:font-semibold lg:leading-8">
              {salePrice.toLocaleString('vi-VN')}đ
            </p>
            <p className="text-price-md text-theme-text-secondary lg:text-price-lg line-through lg:text-[14px] lg:font-semibold lg:leading-8">
              {price?.toLocaleString('vi-VN')}đ
            </p>
          </>
        ) : (
          <p className="text-price-lg !font-extrabold text-black lg:text-[20px] lg:font-semibold lg:leading-8">
            {price?.toLocaleString('vi-VN')}đ
          </p>
        )}
      </div>
      <h1 className="text-body-md line-clamp-1 whitespace-nowrap lg:line-clamp-2 lg:text-[20px] lg:font-normal lg:leading-8">
        {name}
      </h1>
    </div>
  );
}
