import { useNavigate } from 'react-router-dom';
import { useSearchProducts } from '../../../hooks/useProduct';
import ProductCard from '../../molecules/ProductCard/ProductCard';

export default function SearchResult({ searchQuery }: { searchQuery: string }) {
  const navigate = useNavigate();
  const { data: searchResult, isLoading } = useSearchProducts(searchQuery, 12);

  const handleProductClick = (slug: string, colorId?: number, sizeId?: number) => {
    const params = new URLSearchParams();
    if (colorId) params.append('colorId', colorId.toString());
    if (sizeId) params.append('sizeId', sizeId.toString());
    const queryString = params.toString();
    navigate(`/product/${slug}${queryString ? `?${queryString}` : ''}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="size-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        <span className="ml-3 text-gray-600">Đang tìm kiếm...</span>
      </div>
    );
  }

  if (!searchResult || searchResult.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-16 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
        <p className="mt-4 text-lg text-gray-600">Không tìm thấy sản phẩm "{searchQuery}"</p>
        <p className="mt-2 text-sm text-gray-500">Vui lòng thử từ khóa khác</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900">
          Kết quả tìm kiếm cho "{searchQuery}" ({searchResult.total})
        </h3>
        <div className="grid max-h-[calc(100vh-300px)] grid-cols-2 gap-3 overflow-y-auto md:grid-cols-4 lg:grid-cols-6">
          {searchResult.items.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => handleProductClick(product.slug)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
