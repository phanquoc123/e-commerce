interface ColorOption {
  name: string;
  value: string;
  selected?: boolean;
}

interface SizeOption {
  name: string;
  value: string;
  selected?: boolean;
}

interface ProductOptionsProps {
  colors: ColorOption[];
  sizes: SizeOption[];
  selectedColor?: string;
  selectedSize?: string;
  onColorSelect?: (color: string) => void;
  onSizeSelect?: (size: string) => void;
}

export default function ProductOptions({
  colors,
  sizes,
  selectedColor,
  selectedSize,
  onColorSelect,
  onSizeSelect
}: ProductOptionsProps) {
  return (
    <div className="space-y-4">
      {/* Color Selection */}
      <div className="space-y-2">
        <div className="flex items-center gap-1 lg:gap-2">
          <p className="text-theme-text text-label-sm lg:text-label-md">
            Màu sắc: {selectedColor || colors[0]?.name}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => (
            <div
              key={color.value}
              onClick={() => onColorSelect?.(color.value)}
              className={`relative size-9 min-w-9 cursor-pointer overflow-hidden rounded-full border-2 border-white ring-2 lg:size-11 lg:min-w-11 ${
                selectedColor === color.value
                  ? 'ring-border-brand'
                  : 'ring-border-primary'
              }`}
              style={{ backgroundColor: color.value }}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-2">
        <div className="flex items-center gap-1 lg:gap-3">
          <p className="text-theme-text text-label-sm lg:text-label-md">
            Kích thước: {selectedSize || sizes[0]?.name}
          </p>
        </div>
        <div className="flex gap-3">
          {sizes.map((size) => (
            <div
              key={size.value}
              onClick={() => onSizeSelect?.(size.value)}
              className={`focus:ring-ring text-label-sm bg-theme-bg text-theme-text hover:border-border-secondary relative inline-flex size-9 min-w-9 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-full border-2 border-none border-white px-0 py-1 ring-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 lg:size-11 lg:min-w-11 ${
                selectedSize === size.value
                  ? 'ring-border-brand'
                  : 'ring-border-primary hover:ring-border-secondary'
              }`}
            >
              <p className="text-theme-text text-label-sm">{size.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
