import { useState } from 'react';
import ProductImage from '../../atoms/ProductImage/ProductImage';
import ProductInfo from '../ProductInfo/ProductInfo';

interface Color {
  id: number;
  name: string;
  code: string;
  hexCode: string | null;
  thumbnailUrl: string | null;
  productColorId: number;
  images: Array<{
    id: number;
    imageUrl: string;
    isMain: boolean;
    sortOrder: number;
  }>;
  sizes: Array<{
    id: number;
    name: string;
    code: string;
    stock: number;
  }>;
}

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    slug: string;
    price: number;
    salePrice?: number | null;
    colors?: Color[];
  };
  className?: string;
  onClick?: () => void;
}

export default function ProductCard({ product, className = '', onClick }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<Color | null>(product.colors?.[0] || null);

  const handleColorSelect = (color: Color, e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn trigger onClick của card
    setSelectedColor(color);
  };

  // Get image based on selected color
  const getCurrentImage = () => {
    if (selectedColor && selectedColor.images.length > 0) {
      // Lấy ảnh main hoặc ảnh đầu tiên
      const mainImage = selectedColor.images.find(img => img.isMain);
      return mainImage?.imageUrl || selectedColor.images[0]?.imageUrl;
    }
    // Fallback: lấy ảnh đầu tiên của màu đầu tiên
    if (product.colors && product.colors.length > 0) {
      const firstColor = product.colors[0];
      const mainImage = firstColor.images.find(img => img.isMain);
      return mainImage?.imageUrl || firstColor.images[0]?.imageUrl;
    }
    return '';
  };

  // Tính % discount nếu có sale
  const getDiscountPercent = () => {
    if (product.salePrice && product.salePrice < product.price) {
      return Math.round(((product.price - product.salePrice) / product.price) * 100);
    }
    return null;
  };

  const discountPercent = getDiscountPercent();

  return (
    <div className={`w-40 min-w-40 lg:w-full lg:min-w-full ${className}`} onClick={onClick}>
      <ProductImage
        slug={product.slug}
        discount={discountPercent || undefined}
        src={getCurrentImage()}
        alt={product.name}
        colorId={selectedColor?.id}
        sizeId={selectedColor?.sizes[0]?.id}
      />

      <ProductInfo name={product.name} price={product.price} salePrice={product.salePrice} />

      {/* Color Options - Các chấm màu */}
      {product.colors && product.colors.length > 0 && (
        <div className="mt-2 flex items-center gap-1.5">
          {product.colors.map(color => (
            <button
              key={color.id}
              onClick={e => handleColorSelect(color, e)}
              className={`h-5 w-5 rounded-full border-2 transition-all hover:scale-110 ${
                selectedColor?.id === color.id
                  ? 'border-blue-500 ring-2 ring-blue-200'
                  : 'border-gray-300'
              }`}
              style={{
                backgroundColor: color.hexCode || color.thumbnailUrl || '#ccc',
                backgroundImage: color.thumbnailUrl ? `url(${color.thumbnailUrl})` : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              title={color.name}
              aria-label={`Chọn màu ${color.name}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
