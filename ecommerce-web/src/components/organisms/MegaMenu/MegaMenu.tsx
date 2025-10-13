import { useEffect, useState } from 'react';
import CategoryItem from '../../molecules/CategoryItem/CategoryItem';
import CollectionCard from '../../molecules/CollectionCard/CollectionCard';
import ProductCard from '../ProductCard/ProductCard';
import { megaMenuData, genderCategoriesData } from '../../../data/mockData';
import NavigationBar from '../NavigationBar/NavigationBar';
import InputSearchLarge from '../../atoms/InputSearchLarge/InputSearchLarge';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function MegaMenu({ isOpen, onClose, className = '' }: MegaMenuProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKey, setSearchKey] = useState(0); // Key để force re-render SearchBar

  useEffect(() => {
    if (isOpen) {
      // Delay để trigger animation
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setSearchQuery(''); // Reset search khi đóng menu
      setSearchKey(prev => prev + 1); // Force re-render SearchBar để reset input
    }
  }, [isOpen]);

  // Mock products data
  const mockProducts = Array.from({ length: 10 }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Sản phẩm ${i + 1}`,
    price: `${(i + 1) * 100000}đ`,
    image: `https://images.unsplash.com/photo-${1500000000000 + i}?w=200&h=200&fit=crop`,
    colors: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00'],
    colorImages: {
      '#FF0000': `https://images.unsplash.com/photo-${1500000000000 + i}?w=200&h=200&fit=crop&sat=100`,
      '#00FF00': `https://images.unsplash.com/photo-${1500000000000 + i + 1}?w=200&h=200&fit=crop&sat=100`,
      '#0000FF': `https://images.unsplash.com/photo-${1500000000000 + i + 2}?w=200&h=200&fit=crop&sat=100`,
      '#FFFF00': `https://images.unsplash.com/photo-${1500000000000 + i + 3}?w=200&h=200&fit=crop&sat=100`,
    },
  }));

  // Gender categories data (từ API)
  const genderCategories = genderCategoriesData;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/20 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Mega Menu Content */}
      <div
        className={`fixed left-0 right-0 top-0 z-[60] bg-white shadow-2xl transition-all duration-500 ease-out ${
          isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${className}`}
        style={{ height: '100vh', overflowY: 'auto' }}
      >
        <div className="mx-auto px-4 py-8 lg:px-12 lg:py-4">
          {/* Search Bar */}
          <div className="mb-6">
            <InputSearchLarge key={searchKey} onSearch={setSearchQuery} debounceMs={300} />
          </div>

          <NavigationBar items={megaMenuData.navigation} className="mb-8" />

          {/* Conditional Content */}
          {searchQuery ? (
            // Show search results (2 rows, 10 items)
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-900">
                Kết quả tìm kiếm cho "{searchQuery}"
              </h3>
              <div className="grid max-h-[652px] grid-cols-2 gap-3 overflow-y-auto md:grid-cols-4 lg:grid-cols-6">
                {mockProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => console.log('Product clicked:', product.id)}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Show categories grid
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {/* Gender Categories (NAM, NỮ, TRẺ EM) */}
              {genderCategories.map(genderCategory => (
                <div key={genderCategory.id} className="max-h-[652px] overflow-y-auto">
                  <a
                    href={genderCategory.slug}
                    className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600"
                  >
                    {genderCategory.title}
                    <span className="text-sm">↗</span>
                  </a>
                  <div className="space-y-1">
                    {genderCategory.categories.map(category => (
                      <CategoryItem key={category.id} category={category} />
                    ))}
                  </div>
                </div>
              ))}

              {/* BỘ SƯU TẬP Column */}
              <div className="max-h-[652px] overflow-y-auto">
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  {megaMenuData.collections.title}
                </h3>
                <div className="space-y-4">
                  {megaMenuData.collections.items.map(collection => (
                    <CollectionCard key={collection.id} collection={collection} />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Close button at bottom */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="rounded-full bg-gray-800 px-6 py-2 text-white hover:bg-gray-700"
          >
            ✕ Đóng
          </button>
        </div>
      </div>
    </>
  );
}
