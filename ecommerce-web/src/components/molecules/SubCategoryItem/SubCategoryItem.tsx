interface SubCategoryItemProps {
  name: string;
  className?: string;
}

export default function SubCategoryItem({ name, className = '' }: SubCategoryItemProps) {
  return (
    <div
      className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-gray-50 ${className}`}
    >
      <span className="flex-1 text-sm text-gray-700 hover:text-gray-900">{name}</span>
    </div>
  );
}
