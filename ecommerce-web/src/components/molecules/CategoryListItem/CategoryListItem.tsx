import CategoryIcon from '../../atoms/CategoryIcon/CategoryIcon';
import ChevronButton from '../../atoms/ChevronButton/ChevronButton';
import SubCategoryItem from '../SubCategoryItem/SubCategoryItem';
import type { Category } from '../../../data/mockData';

interface CategoryListItemProps {
  category: Category;
  isExpanded: boolean;
  onToggle: (categoryId: string, event: React.MouseEvent) => void;
  className?: string;
}

export default function CategoryListItem({
  category,
  isExpanded,
  onToggle,
  className = '',
}: CategoryListItemProps) {
  const handleChevronClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onToggle(category.id, event);
  };

  return (
    <div className={className}>
      {/* Main Category Item */}
      <div className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-gray-50">
        <CategoryIcon src={category.icon} alt={category.name} />
        <span className="flex-1 font-medium text-gray-900">{category.name}</span>
        <ChevronButton isExpanded={isExpanded} onClick={handleChevronClick} />
      </div>
      {/* Sub Categories Accordion */}
      {isExpanded && category.subCategories && (
        <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-100 pl-4">
          {category.subCategories.map(subCategory => (
            <SubCategoryItem key={subCategory.id} name={subCategory.name} />
          ))}
        </div>
      )}
    </div>
  );
}
