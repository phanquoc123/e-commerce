import { mockProducts } from '../../../data/mockData';
import ProductCard from '../ProductCard/ProductCard';

export default function SearchResult({ searchQuery }: { searchQuery: string }) {
  return (
    <>
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-gray-900">Kết quả tìm kiếm cho "{searchQuery}"</h3>
        <div className="grid max-h-[calc(100vh-300px)] grid-cols-2 gap-3 overflow-y-auto md:grid-cols-4 lg:grid-cols-6">
          {mockProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => console.log('Product clicked:', product.id)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
