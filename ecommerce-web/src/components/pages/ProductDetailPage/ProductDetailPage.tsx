import BlackLine from '../../atoms/BlackLine/BlackLine';
import Breadcrums from '../../molecules/Breadcrums/Breadcrums';
import { MainLayout } from '../../templates';

export default function ProductDetailPage() {
  return (
    <>
      <MainLayout>
        <main className="mx-auto max-w-screen-sm lg:max-w-full">
          <Breadcrums />
          <div className="mx-auto flex w-full flex-col lg:max-w-screen-2xl lg:gap-12 lg:px-24 lg:py-8">
            {/* Image section */}
            <div className="relative">
              <img
                className="aspect-[3/4] size-full min-w-full snap-center snap-always object-cover sm:object-contain"
                src="./images/product/product-detail.webp"
                alt=""
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 z-[1]">
                <img
                  className="aspect-[8/1] h-auto w-full object-cover"
                  loading="lazy"
                  src="./images/product/image-bottom.webp"
                  alt=""
                />
              </div>
            </div>
            <div className="border-border-primary flex flex-col gap-4 border-b-2 bg-[#fff] px-3 pb-6 pt-4 lg:gap-8 lg:border-none lg:px-0 lg:pb-4 lg:pt-0">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-right">
                  <p className="text-price-lg lg:text-price-xl !font-extrabold text-red-600">
                    539.100đ
                  </p>
                  <p className="text-price-md text-theme-text-secondary lg:text-price-lg line-through">
                    599.000đ
                  </p>
                  <div className="text-label-sm inline-flex items-center gap-[2px] rounded-md bg-red-600 px-1 py-[2px] text-white lg:rounded-sm">
                    -10%
                  </div>
                </div>
                <h1 className="text-body-md lg:text-body-xl line-clamp-1 lg:line-clamp-2">
                  Áo Gió Nam Chống Nắng 4c Plus Dáng Suông
                </h1>
              </div>
              <BlackLine />
              <div className="space-y-2">
                <div className="flex items-center gap-1 lg:gap-2">
                  <p className="text-theme-text text-label-sm lg:text-label-md">Màu sắc: ĐEN 002</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="ring-border-brand relative size-9 min-w-9 cursor-pointer overflow-hidden rounded-full border-[1px] border-white bg-black ring-2 lg:size-11 lg:min-w-11"></div>
                  <div className="ring-border-primary relative size-9 min-w-9 cursor-pointer overflow-hidden rounded-full border-2 border-white bg-red-500 ring-2 lg:size-11 lg:min-w-11"></div>
                  <div className="ring-border-primary relative size-9 min-w-9 cursor-pointer overflow-hidden rounded-full border-2 border-white bg-green-500 ring-2 lg:size-11 lg:min-w-11"></div>
                </div>
              </div>
              <BlackLine />
            </div>
          </div>
        </main>
      </MainLayout>
    </>
  );
}
