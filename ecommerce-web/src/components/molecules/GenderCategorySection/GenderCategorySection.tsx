import { useState } from 'react';
import GenderCategoryHeader from '../GenderCategoryHeader/GenderCategoryHeader';
import CategoryItem from '../CategoryItem/CategoryItem';
import type { Category } from '../../../data/mockData';

interface GenderCategorySectionProps {
  id: string;
  title: string;
  slug: string;
  image: string;
  categories: Category[];
  onChevronClick: () => void;
  className?: string;
}

export default function GenderCategorySection({
  id,
  title,
  slug,
  image,
  categories,
  onChevronClick,
  className = '',
}: GenderCategorySectionProps) {
  const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

  const handleCategoryToggle = (categoryId: string) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };
  return (
    <div
      className={`small-scrollbar flex max-h-[652px] items-center gap-2 overflow-y-auto rounded-md bg-[#F3F4F6] px-3 py-2 outline-none lg:block lg:bg-white ${className}`}
    >
      <GenderCategoryHeader
        title={title}
        slug={slug}
        image={image}
        onChevronClick={onChevronClick}
      />

      <div className="hidden space-y-1 lg:block">
        {categories.map(category => (
          <CategoryItem
            key={category.id}
            category={category}
            isExpanded={openCategoryId === category.id}
            onToggle={handleCategoryToggle}
          />
        ))}
      </div>
    </div>
  );
}
