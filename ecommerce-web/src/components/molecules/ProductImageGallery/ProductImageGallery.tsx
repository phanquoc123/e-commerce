import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

interface ProductImageGalleryProps {
  images: string[];
  selectedImage: string;
  onImageSelect: (image: string) => void;
  className?: string;
}

export default function ProductImageGallery({
  images,
  selectedImage,
  onImageSelect,
  className,
}: ProductImageGalleryProps) {
  return (
    <>
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
                  onClick={() => onImageSelect(image)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
