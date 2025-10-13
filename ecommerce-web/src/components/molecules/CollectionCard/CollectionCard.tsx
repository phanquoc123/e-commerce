import type { Collection } from '../../../data/mockData';

interface CollectionCardProps {
  collection: Collection;
  className?: string;
}

export default function CollectionCard({ collection, className = '' }: CollectionCardProps) {
  return (
    <a
      href={collection.slug}
      className={`group relative block overflow-hidden rounded-lg ${className}`}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={collection.image}
          alt={collection.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-bold">{collection.title}</h3>
        {collection.subtitle && (
          <p className="mt-1 whitespace-pre-line text-xs">{collection.subtitle}</p>
        )}
      </div>
    </a>
  );
}

