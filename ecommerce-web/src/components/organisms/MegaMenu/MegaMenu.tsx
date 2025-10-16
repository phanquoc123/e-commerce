import { useEffect, useState } from 'react';
import { megaMenuData, genderCategoriesData } from '../../../data/mockData';
import type { Category } from '../../../data/mockData';
import NavigationBar from '../NavigationBar/NavigationBar';
import InputSearchLarge from '../../atoms/InputSearchLarge/InputSearchLarge';
import BlackLine from '../../atoms/BlackLine/BlackLine';
import CloseButton from '../../atoms/CloseButton/CloseButton';
import SubCategoriesList from '../SubCategoriesList/SubCategoriesList';
import CollectionsSection from '../../molecules/CollectionsSection/CollectionsSection';
import GenderCategorySection from '../../molecules/GenderCategorySection/GenderCategorySection';
import SearchResult from '../SearchResult/SearchResult';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function MegaMenu({ isOpen, onClose, className = '' }: MegaMenuProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchKey, setSearchKey] = useState(0); // Key để force re-render SearchBar
  const [isOpenSubCategory, setIsOpenSubCategory] = useState(false);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [selectedCategoryImage, setSelectedCategoryImage] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (isOpen) {
      // Delay để trigger animation
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      setSearchQuery(''); // Reset search khi đóng menu
      setSearchKey(prev => prev + 1); // Force re-render SearchBar để reset input
      setIsOpenSubCategory(false); // Reset subcategory state khi đóng menu
      setSelectedCategoryName(''); // Reset selected category name
      setSelectedCategoryImage(''); // Reset selected category image
      setSelectedCategories([]); // Reset selected categories
    }
  }, [isOpen]);

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
        className={`fixed left-0 right-0 top-0 z-[60] bg-white py-4 shadow-2xl transition-all duration-500 ease-out ${
          isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        } ${className}`}
      >
        <div className="mx-auto h-[calc(100vh-100px)] px-4 py-8 lg:px-12 lg:py-4">
          {/* Search Bar */}

          <InputSearchLarge
            key={searchKey}
            onSearch={setSearchQuery}
            debounceMs={300}
            className="mb-6"
          />

          {searchQuery ? null : <NavigationBar items={megaMenuData.navigation} className="mb-8" />}
          <BlackLine className="mb-4 lg:hidden" />

          {/* Conditional Content */}
          {searchQuery ? (
            // Show search results (2 rows, 10 items)
            <SearchResult searchQuery={searchQuery} />
          ) : (
            // Show categories grid
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-4">
              {/* Gender Categories (NAM, NỮ, TRẺ EM) */}
              {genderCategories.map(genderCategory => (
                <GenderCategorySection
                  key={genderCategory.id}
                  id={genderCategory.id}
                  title={genderCategory.title}
                  slug={genderCategory.slug}
                  image={genderCategory.image || ''}
                  categories={genderCategory.categories}
                  onChevronClick={() => {
                    setSelectedCategoryName(genderCategory.title);
                    setSelectedCategoryImage(genderCategory.image || '');
                    setSelectedCategories(genderCategory.categories);
                    setIsOpenSubCategory(!isOpenSubCategory);
                  }}
                />
              ))}

              {/* BỘ SƯU TẬP Column */}
              <CollectionsSection
                title={megaMenuData.collections.title}
                image={megaMenuData.collections.image}
                items={megaMenuData.collections.items}
              />
            </div>
          )}

          {/* SubCategoriesList - hiển thị khi isOpenSubCategory = true */}
          {isOpenSubCategory && (
            <SubCategoriesList
              isOpen={isOpenSubCategory}
              onClose={() => setIsOpenSubCategory(false)}
              categoryName={selectedCategoryName}
              categoryImage={selectedCategoryImage}
              categories={selectedCategories}
              className="lg:hidden"
            />
          )}
        </div>

        {/* Close button at bottom */}
        <div className="flex justify-center">
          <CloseButton onClick={onClose} className="mb-4" />
        </div>
      </div>
    </>
  );
}
