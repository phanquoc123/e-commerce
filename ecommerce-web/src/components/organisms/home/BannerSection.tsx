import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function BannerSection({ className }: { className?: string }) {
  //   const bannersMobile = [
  //     '/images/banner/banner-web1.webp',
  //     '/images/banner/banner-web2.webp',
  //     '/images/banner/banner-web3.webp',
  //   ];
  const bannersDesktop = [
    '/images/banner/banner-web-destop.webp',
    '/images/banner/banner-web-destop2.webp',
    '/images/banner/banner-web-destop3.webp',
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<any>(null);

  const goTo = (idx: number) => {
    if (!swiperRef) return;
    // When loop is enabled, use realIndex mapping
    swiperRef.slideToLoop ? swiperRef.slideToLoop(idx) : swiperRef.slideTo(idx);
  };

  return (
    <div className={`relative -mx-2 lg:-mx-12 ${className}`}>
      {/* Custom dots */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-24 bg-gradient-to-b from-black/30 to-transparent" />

      <Swiper
        slidesPerView={1}
        loop
        onSwiper={setSwiperRef}
        onSlideChange={s => setActiveIndex(s.realIndex ?? s.activeIndex)}
        className="w-full overflow-hidden"
      >
        {bannersDesktop.map(src => (
          <SwiperSlide key={src}>
            <img
              src={src}
              alt="banner"
              className="h-full w-full select-none bg-cover bg-no-repeat object-cover object-center [image-rendering:auto]"
              loading="eager"
              fetchPriority="high"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots pagination */}
      <div className="absolute bottom-4 left-1/2 z-[2] -translate-x-1/2 transform">
        <div className="flex items-center gap-2">
          {bannersDesktop.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 w-2 rounded-full transition-colors ${
                activeIndex === i ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
