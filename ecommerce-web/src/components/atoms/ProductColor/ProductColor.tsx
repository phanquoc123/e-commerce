interface ProductColorProps {
  colors: string[];
  className?: string;
  selectedColor?: string;
  onColorSelect?: (color: string) => void;
}

export default function ProductColor({
  colors,
  className = '',
  selectedColor,
  onColorSelect,
}: ProductColorProps) {
  return (
    <div className={`flex gap-1 ${className}`}>
      {colors.map(color => (
        <div
          key={color}
          onClick={() => onColorSelect?.(color)}
          className={`size-6 min-w-6 cursor-pointer rounded-full border-2 border-gray-200 ${
            selectedColor === color ? 'ring-2 ring-gray-400' : ''
          }`}
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  );
}
