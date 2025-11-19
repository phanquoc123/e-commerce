import { memo, useMemo, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

interface ProductColor {
  id: number;
  name: string;
  hexCode: string | null;
  sizes?: any[];
  images?: Array<{
    imageUrl: string;
    isMain?: boolean;
  }>;
}

interface ProductImageGalleryProps {
  colors?: ProductColor[];
  selectedColorId: number | null;
  className?: string;
}

function ProductImageGallery({
  colors = [],
  selectedColorId,
  className,
}: ProductImageGalleryProps) {
  console.log('ProductImageGallery render');

  // Tìm màu được chọn
  const selectedColor = useMemo(() => {
    if (!selectedColorId) return colors[0] || null;
    return colors.find(c => Number(c.id) === selectedColorId) || colors[0] || null;
  }, [colors, selectedColorId]);

  // Lấy danh sách ảnh từ màu được chọn
  const images = useMemo(() => {
    if (!selectedColor?.images) return [];
    return selectedColor.images.map(img => img.imageUrl);
  }, [selectedColor]);

  // State để quản lý ảnh được chọn
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Khi màu thay đổi, tự động chọn ảnh main hoặc ảnh đầu tiên
  useEffect(() => {
    if (!selectedColor?.images || selectedColor.images.length === 0) return;

    const mainImage = selectedColor.images.find(img => img.isMain);
    const imageUrl = mainImage?.imageUrl || selectedColor.images[0]?.imageUrl;
    if (imageUrl) {
      setSelectedImage(imageUrl);
    }
  }, [selectedColor]);

  return (
    <div className="flex gap-3">
      {/* Thumbnail Gallery - Vertical Swiper */}
      <div className={`overflow-hidden ${className}`}>
        <div className="flex max-h-[704px] min-w-[108px] flex-col gap-3 rounded-md">
          <Swiper
            spaceBetween={12}
            slidesPerView="auto"
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode]}
            direction="vertical"
            className="h-[704px] w-[108px]"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <img
                  className={`aspect-[3/4] w-[108px] cursor-pointer touch-manipulation appearance-none border-2 object-cover transition-all duration-200 ${
                    selectedImage === image
                      ? 'border-border-brand'
                      : 'border-transparent hover:border-gray-300'
                  }`}
                  src={image}
                  alt={`Product image ${index + 1}`}
                  onClick={() => setSelectedImage(image)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Main Image Display */}
      <div className="relative flex-1">
        <div className="lg:rounded-sm">
          <img
            className="aspect-[3/4] size-full min-w-full snap-center snap-always object-cover sm:object-contain lg:rounded-md"
            src={selectedImage}
            alt="Main product image"
            loading="lazy"
          />
        </div>
        <div className="inset-x absolute bottom-0 z-[1] rotate-0">
          <img
            className="aspect-[8/1] h-auto w-full object-cover"
            loading="lazy"
            src="../images/product/image-bottom.webp"
            alt="Sale Image"
          />
        </div>
      </div>
    </div>
  );
}

export default memo(ProductImageGallery);
