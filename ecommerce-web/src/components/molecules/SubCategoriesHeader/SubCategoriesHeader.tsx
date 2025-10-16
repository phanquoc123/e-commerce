import BackButton from '../../atoms/BackButton/BackButton';
import CommonIcon from '../../atoms/CommonIcon/CommonIcon';
import DefaultIcon from '../../atoms/DefaultIcon/DefaultIcon';
import Spacer from '../../atoms/Spacer/Spacer';

interface SubCategoriesHeaderProps {
  title: string;
  image?: string;
  onBackClick: () => void;
  className?: string;
}

export default function SubCategoriesHeader({
  title,
  image,
  onBackClick,
  className = '',
}: SubCategoriesHeaderProps) {
  return (
    <div
      className={`relative flex items-center justify-center border-b border-gray-200 px-4 py-4 ${className}`}
    >
      <BackButton
        onClick={onBackClick}
        className="absolute left-4 top-2 flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
      />

      <div className="flex items-center gap-2">
        {image ? <CommonIcon src={image} alt={title} size="md" /> : <DefaultIcon size="md" />}
        <h1 className="text-lg font-semibold text-gray-900">{title}</h1>
        <Spacer size="md" /> {/* Spacer để center title */}
      </div>
    </div>
  );
}
