import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import BlogCard from '../../molecules/BlogCard/BlogCard';
import { mockBlogPosts } from '../../../data/mockData';
import SeeMoreButton from '../../atoms/SeeMoreButton/SeeMoreButton';

export default function BlogSection() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="text-heading-xl text-theme-text lg:text-heading-3xl text-center">BLOG YODY</p>
        <div className="relative overflow-hidden">
          <Swiper
            modules={[FreeMode]}
            spaceBetween={16}
            slidesPerView="auto"
            freeMode={{
              enabled: true,
              sticky: false,
            }}
            className="!overflow-visible"
          >
            {mockBlogPosts.map(blog => (
              <SwiperSlide key={blog.id} className="!w-64 lg:!w-[438px]">
                <BlogCard
                  id={blog.id}
                  title={blog.title}
                  slug={blog.slug}
                  image={blog.image}
                  publishDate={blog.publishDate}
                  excerpt={blog.excerpt}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* <SeeMoreButton /> */}
      </div>
    </>
  );
}
