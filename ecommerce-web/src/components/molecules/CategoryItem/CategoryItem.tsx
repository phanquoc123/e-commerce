import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import type { Category } from '../../../data/mockData';

interface CategoryItemProps {
  category: Category;
  className?: string;
}

export default function CategoryItem({ category, className = '' }: CategoryItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubCategories = category.subCategories && category.subCategories.length > 0;

  return (
    <div className={`${className}`}>
      <div className="group flex items-center justify-between py-3">
        <a
          href={category.slug}
          className="flex flex-1 items-center gap-3 text-gray-700 hover:text-blue-600"
        >
          <img
            src={category.icon}
            alt={category.name}
            className="h-6 w-6 rounded-full object-contain lg:h-11 lg:w-11"
            loading="lazy"
          />
          <span className="text-sm font-medium">{category.name}</span>
        </a>
        {hasSubCategories && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100"
            aria-label="Toggle subcategories"
          >
            <FontAwesomeIcon
              icon={isExpanded ? faChevronUp : faChevronDown}
              className="h-3 w-3 text-gray-500"
            />
          </button>
        )}
      </div>

      {hasSubCategories && isExpanded && (
        <div className="ml-10 space-y-2 border-l-2 border-gray-200 pl-4">
          {category.subCategories!.map(subCat => (
            <a
              key={subCat.id}
              href={subCat.slug}
              className="block py-1 text-sm text-gray-600 hover:text-blue-600"
            >
              {subCat.name}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
