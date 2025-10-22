import { useEffect, useState } from 'react';

interface Color {
  id: string;
  name: string;
  code: string;
}

interface Size {
  id: string;
  name: string;
}

interface ProductVariantDialogProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productImage: string;
  selectedColor: string;
  selectedSize: string;
  colors: Color[];
  sizes: Size[];
  onColorSelect: (colorId: string) => void;
  onSizeSelect: (sizeId: string) => void;
  onUpdate: () => void;
}

export default function ProductVariantDialog({
  isOpen,
  onClose,
  productName,
  productImage,
  selectedColor,
  selectedSize,
  colors,
  sizes,
  onColorSelect,
  onSizeSelect,
  onUpdate,
}: ProductVariantDialogProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Control render and animation state
  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
      // Delay để browser render DOM trước khi trigger animation
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      });
    } else {
      setIsAnimating(false);
      // Đợi animation kết thúc trước khi unmount
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 500); // Match với duration-500
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!shouldRender) return null;

  const selectedColorData = colors.find(c => c.id === selectedColor);
  const selectedSizeData = sizes.find(s => s.id === selectedSize);

  return (
    <>
      {/* Overlay - làm mờ toàn bộ trang bao gồm header */}
      <div
        className={`
          fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm
          transition-opacity duration-300 ease-out
          ${isAnimating ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog Container - điều chỉnh WIDTH TỔNG THỂ tại đây */}
      <div className="fixed inset-x-0 bottom-0 z-[9999] lg:inset-0 lg:flex lg:items-center lg:justify-center">
        {/* Dialog Content Wrapper - WIDTH TỔNG THỂ của dialog */}
        <div
          className={`
            bg-white rounded-t-2xl lg:rounded-2xl
            w-full lg:w-[400px] lg:max-w-[90vw]
            max-h-[90vh] lg:max-h-[85vh]
            flex flex-col
            transform transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 lg:translate-y-0'}
            ${isAnimating ? 'lg:scale-100 lg:opacity-100' : 'lg:scale-95 lg:opacity-0'}
          `}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <h2 className="text-heading-md text-theme-text font-semibold">
              Cập nhật sản phẩm
            </h2>
            <button
              onClick={onClose}
              className="text-theme-text-secondary hover:text-theme-text rounded-full p-1 transition-colors"
              aria-label="Đóng"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Product Info */}
            <div className="mb-6 flex gap-3">
              <img
                src={productImage}
                alt={productName}
                className="h-[100px] w-[75px] rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="text-body-md text-theme-text mb-1 line-clamp-2">{productName}</p>
                <p className="text-body-sm text-theme-text-secondary">
                  {selectedColorData?.name}, {selectedSizeData?.name}
                </p>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <p className="text-label-md text-theme-text">
                  Màu sắc: <span className="font-semibold">{selectedColorData?.name}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {colors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => onColorSelect(color.id)}
                    className={`
                      relative size-11 min-w-11 cursor-pointer overflow-hidden 
                      rounded-full border-2 border-white ring-2 transition-all
                      ${selectedColor === color.id ? 'ring-border-brand' : 'ring-border-primary hover:ring-border-secondary'}
                    `}
                    style={{ backgroundColor: color.code }}
                    aria-label={`Chọn màu ${color.name}`}
                  >
                    {selectedColor === color.id && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="size-5 drop-shadow-md"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-2">
                <p className="text-label-md text-theme-text">
                  Kích thước: <span className="font-semibold">{selectedSizeData?.name}</span>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size.id}
                    onClick={() => onSizeSelect(size.id)}
                    className={`
                      text-label-sm bg-theme-bg text-theme-text 
                      hover:border-border-secondary ring-border-primary hover:ring-border-secondary
                      relative inline-flex size-11 min-w-11 cursor-pointer items-center 
                      justify-center gap-1 overflow-hidden rounded-full border-2 
                      border-white px-0 py-1 ring-2 transition-colors 
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${selectedSize === size.id ? '!ring-border-brand' : ''}
                    `}
                    aria-label={`Chọn size ${size.name}`}
                  >
                    <p className="text-theme-text text-label-sm font-medium">{size.name}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer - Sticky Button */}
          <div className="border-t border-gray-200 p-4">
            <button
              onClick={onUpdate}
              className="bg-brand-surface hover:bg-brand-surface-hover text-label-md focus-visible:ring-ring inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
            >
              Cập nhật
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

