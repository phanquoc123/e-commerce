import { memo, useMemo } from 'react';

interface ProductColor {
  id: number;
  name: string;
  hexCode: string | null;
  sizes?: ProductSize[];
  images?: any[];
}

interface ProductSize {
  id: number;
  name: string;
  code: string;
}

interface ProductOptionsProps {
  colors?: ProductColor[];
  selectedColorId: number | null;
  selectedSizeId: number | null;
  onColorSelect: (colorId: number) => void;
  onSizeSelect: (sizeId: number) => void;
}

function ProductOptions({
  colors = [],
  selectedColorId,
  selectedSizeId,
  onColorSelect,
  onSizeSelect,
}: ProductOptionsProps) {
  console.log('ProductOptions render');
  // Tìm màu được chọn
  const selectedColor = useMemo(() => {
    if (selectedColorId) {
      return colors.find(c => Number(c.id) === selectedColorId) || colors[0] || null;
    }
    return colors[0] || null;
  }, [colors, selectedColorId]);

  // Build color options
  const colorOptions = useMemo(() => {
    return colors.map(c => ({
      id: Number(c.id),
      name: c.name,
      hexCode: c.hexCode ?? '#ccc',
      selected: selectedColorId !== null && Number(c.id) === selectedColorId,
    }));
  }, [colors, selectedColorId]);

  // Build size options cho màu được chọn
  const sizeOptions = useMemo(() => {
    if (!selectedColor?.sizes) return [];
    return selectedColor.sizes.map(s => ({
      id: Number(s.id),
      name: s.name,
      code: s.code,
      selected: selectedSizeId !== null && Number(s.id) === selectedSizeId,
    }));
  }, [selectedColor, selectedSizeId]);

  // Display values
  const displayColorName = selectedColor?.name || '';
  const displaySizeCode = useMemo(() => {
    if (!selectedSizeId || !selectedColor?.sizes) return '';
    const size = selectedColor.sizes.find(s => Number(s.id) === selectedSizeId);
    return size?.code || '';
  }, [selectedSizeId, selectedColor]);

  return (
    <div className="space-y-4">
      {/* Color Selection */}
      <div className="space-y-2">
        <div className="flex items-center gap-1 lg:gap-2">
          <p className="text-theme-text text-label-sm lg:text-[14px] lg:font-normal">
            Màu sắc: {displayColorName || 'Chưa chọn'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {colorOptions.map(color => (
            <div
              key={color.id}
              onClick={() => onColorSelect(color.id)}
              className={`relative size-9 min-w-9 cursor-pointer overflow-hidden rounded-full border-2 border-white ring-2 lg:size-11 lg:min-w-11 ${
                color.selected ? 'ring-[#FCAF17]' : 'ring-gray-300'
              }`}
              style={{ backgroundColor: color.hexCode }}
            />
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div className="space-y-2">
        <div className="flex items-center gap-1 lg:gap-3">
          <p className="text-theme-text text-label-sm lg:text-[14px] lg:font-normal">Kích thước:</p>
          <p className="text-theme-text text-label-sm uppercase lg:text-[14px] lg:font-normal">
            {displaySizeCode || 'Chưa chọn'}
          </p>
        </div>
        <div className="flex gap-3">
          {sizeOptions.map(size => (
            <div
              key={size.id}
              onClick={() => onSizeSelect(size.id)}
              className={`focus:ring-ring text-label-sm bg-theme-bg text-theme-text hover:border-border-secondary relative inline-flex size-9 min-w-9 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-full border-2 border-none border-white px-0 py-1 ring-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 lg:size-11 lg:min-w-11 ${
                size.selected ? 'ring-[#FCAF17]' : 'ring-gray-300'
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

export default memo(ProductOptions);
