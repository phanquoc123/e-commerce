import CollectionIcon from '../../atoms/CollectionIcon/CollectionIcon';
import SectionTitle from '../../atoms/SectionTitle/SectionTitle';
import CollectionCard from '../../molecules/CollectionCard/CollectionCard';
import type { Collection } from '../../../data/mockData';

interface CollectionsSectionProps {
  title: string;
  image: string;
  items: Collection[];
  className?: string;
}

export default function CollectionsSection({
  title,
  image,
  items,
  className = '',
}: CollectionsSectionProps) {
  return (
    <div
      className={`small-scrollbar flex max-h-[652px] gap-2 overflow-y-auto rounded-md bg-[#F3F4F6] px-3 py-2 lg:block lg:bg-white ${className}`}
    >
      <CollectionIcon src={image} alt={title} className="lg:hidden" />
      <SectionTitle className="text-lg font-bold text-gray-900">{title}</SectionTitle>
      <div className="hidden space-y-4 lg:block">
        {items.map(collection => (
          <CollectionCard key={collection.id} collection={collection} />
        ))}
      </div>
    </div>
  );
}
