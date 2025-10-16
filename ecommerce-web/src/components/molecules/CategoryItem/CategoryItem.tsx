import CategoryLink from '../../atoms/CategoryLink/CategoryLink';
import ChevronToggle from '../../atoms/ChevronToggle/ChevronToggle';
import SubCategoryLink from '../../atoms/SubCategoryLink/SubCategoryLink';
import type { Category } from '../../../data/mockData';

interface CategoryItemProps {
  category: Category;
  className?: string;
  isExpanded?: boolean;
  onToggle?: (categoryId: string) => void;
}

export default function CategoryItem({ 
  category, 
  className = '', 
  isExpanded = false,
  onToggle
}: CategoryItemProps) {
  const hasSubCategories = category.subCategories && category.subCategories.length > 0;

  return (
    <div className={`${className}`}>
      <div className="group flex items-center justify-between py-3">
        <CategoryLink
          href={category.slug}
          icon={category.icon}
          name={category.name}
        />
        {hasSubCategories && (
          <ChevronToggle
            isExpanded={isExpanded}
            onClick={() => onToggle?.(category.id)}
          />
        )}
      </div>

      {hasSubCategories && isExpanded && (
        <div className="ml-10 space-y-2 border-l-2 border-gray-200 pl-4">
          {category.subCategories!.map(subCat => (
            <SubCategoryLink
              key={subCat.id}
              href={subCat.slug}
              name={subCat.name}
            />
          ))}
        </div>
      )}
    </div>
  );
}
