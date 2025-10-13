interface ProductTitleProps {
  title: string;
  className?: string;
}

export default function ProductTitle({ title, className = '' }: ProductTitleProps) {
  return (
    <h4 className={`text-sm font-medium text-gray-900 ${className}`}>
      {title}
    </h4>
  );
}
