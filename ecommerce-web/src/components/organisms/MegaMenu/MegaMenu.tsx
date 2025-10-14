import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStore,
  faNewspaper,
  faGift,
  faTag,
  faShirt,
  faUser,
  faUserTie,
  faChild,
  faImages,
} from '@fortawesome/free-solid-svg-icons';
import CategoryItem from '../../molecules/CategoryItem/CategoryItem';
import CollectionCard from '../../molecules/CollectionCard/CollectionCard';
import ProductCard from '../ProductCard/ProductCard';
import { megaMenuData, mockProducts } from '../../../data/mockData';
import NavigationBar from '../NavigationBar/NavigationBar';
import InputSearchLarge from '../../atoms/InputSearchLarge/InputSearchLarge';
import { useCategories } from '../../../hooks/useCategory';

interface TransformedCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
}

interface TransformedGenderCategory {
  id: string;
  title: string;
  slug: string;
  categories: TransformedCategory[];
}

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function MegaMenu({ isOpen, onClose, className = '' }: MegaMenuProps) {
  const { data: categories, isLoading, error } = useCategories();
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKey, setSearchKey] = useState(0); // Key để force re-render SearchBar
  const [selectedGenderCategory, setSelectedGenderCategory] = useState<string | null>(null);

  console.log('📊 Categories.data.result:', categories?.data?.result);

  // Transform API categories to gender categories structure
  const transformCategories = (categoriesData: any[]): TransformedGenderCategory[] => {
    console.log('🔄 Transform input:', categoriesData);

    if (!Array.isArray(categoriesData)) {
      console.error('❌ Categories data is not an array:', categoriesData);
      return [];
    }

    const transformed = categoriesData.map((rootCategory: any) => ({
      id: rootCategory.slug,
      title: rootCategory.name,
      slug: rootCategory.slug,
      categories:
        rootCategory.children?.map(
          (childCategory: any): TransformedCategory => ({
            id: childCategory.id.toString(),
            name: childCategory.name,
            slug: childCategory.slug,
            icon: childCategory.thumbnail || '/images/categories/imagepr.webp',
          })
        ) || [],
    }));

    console.log('🔄 Transform output:', transformed);
    return transformed;
  };

  // Try different data access patterns
  let genderCategories: TransformedGenderCategory[] = [];

  if (categories?.data?.result && Array.isArray(categories.data.result)) {
    genderCategories = transformCategories(categories.data.result);
  } else if (categories && Array.isArray(categories)) {
    console.log('📊 Trying direct categories array');
    genderCategories = transformCategories(categories);
  } else if (categories?.data && Array.isArray(categories.data)) {
    console.log('📊 Trying categories.data array');
    genderCategories = transformCategories(categories.data);
  } else {
    console.error('❌ No valid categories data found');
  }

  useEffect(() => {
    if (isOpen) {
      // Delay để trigger animation
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setSearchQuery(''); // Reset search khi đóng menu
      setSearchKey(prev => prev + 1); // Force re-render SearchBar để reset input
      setSelectedGenderCategory(null); // Reset selected category
    }
  }, [isOpen]);

  const handleGenderCategoryClick = (categoryId: string) => {
    setSelectedGenderCategory(categoryId);
  };

  const handleBackToMain = () => {
    setSelectedGenderCategory(null);
  };

  // Icon mapping for menu items
  const getMenuIcon = (slug: string) => {
    const iconMap: Record<string, any> = {
      '/cua-hang': faStore,
      '/tin-tuc': faNewspaper,
      '/moi-ve': faGift,
      '/uu-dai': faTag,
      '/dong-phuc': faShirt,
    };
    return iconMap[slug];
  };

  const getGenderIcon = (id: string) => {
    const iconMap: Record<string, any> = {
      men: faUser,
      women: faUserTie,
      kids: faChild,
    };
    return iconMap[id] || faUser;
  };

  if (!isOpen) return null;

  // Loading and error states
  if (isLoading) {
    return (
      <div
        className={`fixed left-0 right-0 top-0 z-[60] bg-white shadow-2xl ${className}`}
        style={{ height: '100vh' }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="text-lg">Loading categories...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`fixed left-0 right-0 top-0 z-[60] bg-white shadow-2xl ${className}`}
        style={{ height: '100vh' }}
      >
        <div className="flex h-full items-center justify-center">
          <div className="text-lg text-red-600">Error loading categories: {error.message}</div>
        </div>
      </div>
    );
  }

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
        style={{ height: '100vh' }}
      >
        <div className="mx-auto flex h-[calc(100vh-100px)] flex-col px-4 py-8 lg:px-12 lg:py-4">
          {/* Mobile Header - Show when in subcategory view */}
          {selectedGenderCategory && (
            <div className="mb-4 flex items-center gap-4 lg:hidden">
              <button onClick={handleBackToMain} className="text-2xl">
                ←
              </button>
              <h2 className="flex items-center gap-2 text-xl font-bold">
                {genderCategories.find(g => g.id === selectedGenderCategory)?.title || 'Category'}
                <span className="text-sm">↗</span>
              </h2>
            </div>
          )}

          {/* Search Bar - Hidden on mobile when in subcategory */}
          <div className={`mb-6 ${selectedGenderCategory ? 'hidden lg:block' : ''}`}>
            <InputSearchLarge key={searchKey} onSearch={setSearchQuery} debounceMs={300} />
          </div>

          {/* Navigation Bar - Hidden on mobile */}
          <div className="hidden lg:block">
            <NavigationBar items={megaMenuData.navigation} className="mb-8" />
          </div>

          {/* Conditional Content */}
          <div className="flex-1">
            {/* Mobile View - Main Menu */}
            {!searchQuery && !selectedGenderCategory && (
              <div className="space-y-2 lg:hidden">
                {/* Main navigation items */}
                {megaMenuData.navigation.map(item => {
                  const icon = getMenuIcon(item.slug);
                  return (
                    <a
                      key={item.id}
                      href={item.slug}
                      className="flex items-center justify-between border-b border-gray-200 p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        {icon && <FontAwesomeIcon icon={icon} className="h-5 w-5 text-gray-600" />}
                        <span className="font-medium uppercase">{item.label}</span>
                      </div>
                      <FontAwesomeIcon icon={faTag} className="h-4 w-4 rotate-180 text-gray-400" />
                    </a>
                  );
                })}

                {/* Gender categories */}
                {genderCategories.length === 0 && (
                  <div className="p-4 text-center text-gray-500">No categories available</div>
                )}
                {genderCategories.map(category => {
                  console.log('🎨 Rendering category:', category);
                  const icon = getGenderIcon(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleGenderCategoryClick(category.id)}
                      className="flex w-full items-center justify-between border-b border-gray-200 p-4 text-left hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <FontAwesomeIcon icon={icon} className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">{category.title}</span>
                      </div>
                      <FontAwesomeIcon icon={faTag} className="h-4 w-4 rotate-180 text-gray-400" />
                    </button>
                  );
                })}

                {/* Collections */}
                <a
                  href="/collections"
                  className="flex items-center justify-between border-b border-gray-200 p-4 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faImages} className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">{megaMenuData.collections.title}</span>
                  </div>
                  <FontAwesomeIcon icon={faTag} className="h-4 w-4 rotate-180 text-gray-400" />
                </a>
              </div>
            )}

            {/* Mobile View - Subcategory */}
            {!searchQuery && selectedGenderCategory && (
              <div className="space-y-1 lg:hidden">
                {genderCategories
                  .find(g => g.id === selectedGenderCategory)
                  ?.categories?.map(category => (
                    <CategoryItem key={category.id} category={category} />
                  )) || []}
              </div>
            )}

            {/* Desktop & Search Results View */}
            {searchQuery ? (
              // Show search results (2 rows, 10 items)
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-900">
                  Kết quả tìm kiếm cho "{searchQuery}"
                </h3>
                <div className="small-scrollbar grid h-[calc(100vh-284px)] max-h-[100vh-284px] grid-cols-2 gap-3 overflow-y-auto md:grid-cols-4 lg:grid-cols-6">
                  {mockProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => console.log('Product clicked:', product.id)}
                    />
                  ))}
                </div>
              </div>
            ) : !selectedGenderCategory ? (
              // Show categories grid (Desktop only)
              <div className="hidden h-[calc(100vh-284px)] max-h-[100vh-284px] grid-cols-1 gap-8 md:grid-cols-2 lg:grid lg:grid-cols-4">
                {/* Gender Categories from API */}
                {genderCategories.length === 0 && (
                  <div className="col-span-full flex h-full items-center justify-center text-gray-500">
                    No categories available
                  </div>
                )}
                {genderCategories.map(genderCategory => {
                  console.log('🖥️ Rendering genderCategory:', genderCategory);
                  return (
                    <div
                      key={genderCategory.id}
                      className="small-scrollbar h-full max-h-full overflow-y-auto"
                    >
                      <a
                        href={genderCategory.slug}
                        className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900 hover:text-blue-600"
                      >
                        {genderCategory.title}
                        <span className="text-sm">↗</span>
                      </a>
                      <div className="space-y-1">
                        {genderCategory.categories?.map(category => (
                          <CategoryItem key={category.id} category={category} />
                        )) || []}
                      </div>
                    </div>
                  );
                })}

                {/* BỘ SƯU TẬP Column */}
                <div className="small-scrollbar h-[calc(100vh-284px)] max-h-[100vh-284px] overflow-y-auto">
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
            ) : null}
          </div>
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
