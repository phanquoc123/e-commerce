import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import ProductCard from '../../molecules/ProductCard/ProductCard';
import SeeMoreButton from '../../atoms/SeeMoreButton/SeeMoreButton';
import BannerProduct from '../../atoms/BannerProduct/BannerProduct';
import { useCollectionWithProducts } from '../../../hooks/useCollection';

export default function ProductListSection() {
  const { data: collections = [] } = useCollectionWithProducts();
  console.log('Collections with products:', collections);
  return (
    <div className="flex flex-col gap-2 lg:gap-10">
      {collections.map((collection: any) => (
        <div key={collection.id} className="flex flex-col gap-4 lg:gap-6">
          <div className="h-auto w-full bg-cover bg-no-repeat object-cover">
            <BannerProduct
              href={`/collections/${collection.slug}`}
              src={collection.thumbnailUrl || '/images/banner/banner-pr.webp'}
            />
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
                {(collection.products || []).map((product: any) => (
                  <SwiperSlide key={product.id} className="!w-auto">
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* <div className="mb-3 flex justify-center">
                <SeeMoreButton />
              </div> */}
            </div>

            {/* Desktop: Grid */}
            <div className="hidden lg:grid lg:grid-cols-5 lg:gap-3">
              {(collection.products || []).map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
