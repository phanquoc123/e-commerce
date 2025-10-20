import { useState } from 'react';
import ProductImage from '../../atoms/ProductImage/ProductImage';
import ProductInfo from '../ProductInfo/ProductInfo';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: string;
    image: string;
    colors?: string[];
    colorImages?: Record<string, string>; // Map color to image URL
  };
  className?: string;
  onClick?: () => void;
  onColorSelect?: (color: string) => void;
}

export default function ProductCard({
  product,
  className = '',
  onClick,
  onColorSelect,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    onColorSelect?.(color);
  };

  // Get image based on selected color
  const getCurrentImage = () => {
    if (selectedColor && product.colorImages?.[selectedColor]) {
      return product.colorImages[selectedColor];
    }
    return product.image;
  };

  return (
    <div className={`w-40 min-w-40 lg:w-full lg:min-w-full ${className}`} onClick={onClick}>
      <ProductImage src={getCurrentImage()} alt={product.name} />
      <ProductInfo
        name={product.name}
        price={product.price}
        colors={product.colors}
        selectedColor={selectedColor || undefined}
        onColorSelect={handleColorSelect}
      />
    </div>
  );
}
