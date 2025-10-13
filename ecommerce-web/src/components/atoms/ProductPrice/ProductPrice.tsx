interface ProductPriceProps {
  price: string;
  className?: string;
}

export default function ProductPrice({ price, className = '' }: ProductPriceProps) {
  return (
    <p className={`text-sm text-blue-600 ${className}`}>
      {price}
    </p>
  );
}
