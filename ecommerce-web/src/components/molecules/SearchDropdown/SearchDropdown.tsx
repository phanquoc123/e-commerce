import { useNavigate } from 'react-router-dom';
import type { SearchProductItem } from '../../../hooks/useProduct';
import ProductCard from '../ProductCard/ProductCard';

interface SearchDropdownProps {
  products: SearchProductItem[];
  isLoading: boolean;
  query: string;
  onClose: () => void;
}

export default function SearchDropdown({
  products,
  isLoading,
  query,
  onClose,
}: SearchDropdownProps) {
  const navigate = useNavigate();

  const handleProductClick = (slug: string) => {
    navigate(`/product/${slug}`);
    onClose();
  };

  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[500px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
        <div className="flex items-center justify-center py-8">
          <div className="size-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600" />
          <span className="ml-2 text-sm text-gray-600">Đang tìm kiếm...</span>
        </div>
      </div>
    );
  }

  if (!query || query.trim().length === 0) {
    return null;
  }

  if (products.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[500px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
        <div className="flex flex-col items-center justify-center py-8 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-12 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <p className="mt-2 text-sm text-gray-600">Không tìm thấy sản phẩm "{query}"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-[500px] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
      <div className="p-4">
        <p className="mb-3 px-2 text-xs font-semibold text-gray-500 uppercase">
          Kết quả tìm kiếm ({products.length})
        </p>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.slug)}
              className="cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
