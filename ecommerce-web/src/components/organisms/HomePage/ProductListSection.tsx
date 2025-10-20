import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { mockProducts } from '../../../data/mockData';
import ProductCard from '../../molecules/ProductCard/ProductCard';
import SeeMoreButton from '../../atoms/SeeMoreButton/SeeMoreButton';
import BannerProduct from '../../atoms/BannerProduct/BannerProduct';

export default function ProductListSection() {
  const products = mockProducts;

  return (
    <div className="flex flex-col gap-2 lg:gap-8">
      <div className="h-auto w-full bg-cover bg-no-repeat object-cover">
        <BannerProduct href="#" src="/images/banner/banner-pr.webp" />
      </div>
      <div className="relative overflow-hidden">
        {/* Mobile: Swiper */}
        <div className="lg:hidden">
          <Swiper
            modules={[FreeMode]}
            spaceBetween={12}
            slidesPerView="auto"
            freeMode={{
              enabled: true,
              sticky: false,
            }}
            className="!overflow-visible"
          >
            {products.map(product => (
              <SwiperSlide key={product.id} className="!w-auto">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-3">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <SeeMoreButton />
    </div>
  );
}
