import { useEffect, useState } from 'react';
import type { Category } from '../../../data/mockData';
import SubCategoriesHeader from '../../molecules/SubCategoriesHeader/SubCategoriesHeader';
import CategoryListItem from '../../molecules/CategoryListItem/CategoryListItem';

interface SubCategoriesListProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
  categoryImage?: string;
  categories: Category[];
  className?: string;
}

export default function SubCategoriesList({
  isOpen,
  onClose,
  categoryName = 'Danh mục',
  categoryImage,
  categories = [],
  className = '',
}: SubCategoriesListProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Delay để trigger animation
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen]);

  // Handle click on chevron to toggle accordion
  const handleCategoryToggle = (categoryId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[70] h-[calc(100vh-150px)] bg-white transition-all duration-500 ease-out ${
        isAnimating ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${className}`}
    >
      {/* Header */}
      <SubCategoriesHeader title={categoryName} image={categoryImage} onBackClick={onClose} />

      {/* Sub Categories List */}
      <div className="px-4 py-4">
        <div className="space-y-1">
          {categories.map(category => (
            <CategoryListItem
              key={category.id}
              category={category}
              isExpanded={openCategoryId === category.id}
              onToggle={handleCategoryToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
