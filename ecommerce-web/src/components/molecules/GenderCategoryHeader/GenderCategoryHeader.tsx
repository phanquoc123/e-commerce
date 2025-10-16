import CollectionIcon from '../../atoms/CollectionIcon/CollectionIcon';
import GenderCategoryLink from '../../atoms/GenderCategoryLink/GenderCategoryLink';
import { ChevronRight } from 'lucide-react';

interface GenderCategoryHeaderProps {
  title: string;
  slug: string;
  image: string;
  onChevronClick: () => void;
  className?: string;
}

export default function GenderCategoryHeader({
  title,
  slug,
  image,
  onChevronClick,
  className = '',
}: GenderCategoryHeaderProps) {
  return (
    <div className={`flex w-full items-center justify-between gap-2 ${className}`}>
      <div className="flex items-center gap-2">
        <CollectionIcon src={image} alt={title} className="lg:hidden" />
        <GenderCategoryLink href={slug}>{title}</GenderCategoryLink>
      </div>
      <ChevronRight
        className="h-5 w-5 cursor-pointer text-gray-700 lg:hidden"
        onClick={onChevronClick}
      />
    </div>
  );
}
