import BannerSection from '../../organisms/home/BannerSection';
import ProductListSection from '../../organisms/home/ProductListSection';
import { MainLayout } from '../../templates';

export default function HomePage() {
  return (
    <MainLayout>
      <main className="mx-auto lg:max-w-full">
        <div className="mb-12 mt-[-60px] space-y-12 px-2 lg:mb-16 lg:mt-[-68px] lg:space-y-16 lg:px-12">
          <BannerSection className="mb-12" />
          <ProductListSection />
        </div>
      </main>
    </MainLayout>
  );
}
