import ProductTitle from '../../atoms/ProductTitle/ProductTitle';
import ProductPrice from '../../atoms/ProductPrice/ProductPrice';
import ProductColor from '../../atoms/ProductColor/ProductColor';

interface ProductInfoProps {
  name: string;
  price: string;
  colors?: string[];
  selectedColor?: string;
  onColorSelect?: (color: string) => void;
  className?: string;
}

export default function ProductInfo({ 
  name, 
  price, 
  colors = ['#E60023', '#6CFF02', '#36017F'],
  selectedColor,
  onColorSelect,
  className = '' 
}: ProductInfoProps) {
  return (
    <div className={`mt-2 ${className}`}>
      <ProductTitle title={name} />
      <ProductPrice price={price} />
      <div className="mt-1">
        <ProductColor 
          colors={colors}
          selectedColor={selectedColor}
          onColorSelect={onColorSelect}
        />
      </div>
    </div>
  );
}
