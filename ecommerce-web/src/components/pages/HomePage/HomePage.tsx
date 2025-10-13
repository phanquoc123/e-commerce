import { MainLayout } from '../../templates';
import CollectionCard from '../../molecules/CollectionCard/CollectionCard';
import { collections } from '../../../data/mockData';

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Banner */}
      <section className="relative h-[500px] overflow-hidden bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="container mx-auto flex h-full items-center px-4 lg:px-12">
          <div className="max-w-2xl text-white">
            <h1 className="mb-4 text-5xl font-bold">BST THU ĐÔNG 2025</h1>
            <p className="mb-6 text-xl">Khám phá bộ sưu tập mới nhất với phong cách hiện đại</p>
            <button className="rounded-full bg-white px-8 py-3 font-semibold text-blue-600 transition hover:bg-gray-100">
              Khám phá ngay
            </button>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      {/* <section className="py-16">
        <div className="container mx-auto px-4 lg:px-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Bộ Sưu Tập Nổi Bật</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {collections.map(collection => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        </div>
      </section> */}

      {/* Categories Section */}
      {/* <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4 lg:px-12">
          <h2 className="mb-8 text-3xl font-bold text-gray-900">Danh Mục Sản Phẩm</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { name: 'Áo Nam', icon: '👕', color: 'bg-blue-100' },
              { name: 'Áo Nữ', icon: '👚', color: 'bg-pink-100' },
              { name: 'Quần', icon: '👖', color: 'bg-green-100' },
              { name: 'Đồ Thể Thao', icon: '⚽', color: 'bg-yellow-100' },
              { name: 'Phụ Kiện', icon: '👜', color: 'bg-purple-100' },
              { name: 'Trẻ Em', icon: '👶', color: 'bg-orange-100' },
            ].map((category, index) => (
              <a
                key={index}
                href={`/category/${category.name.toLowerCase()}`}
                className={`group flex flex-col items-center justify-center rounded-lg ${category.color} p-6 transition hover:shadow-lg`}
              >
                <span className="mb-2 text-4xl">{category.icon}</span>
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900">
                  {category.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section> */}

      {/* Promo Banner */}
      {/* <section className="bg-gradient-to-r from-yellow-400 to-orange-500 py-12">
        <div className="container mx-auto px-4 text-center lg:px-12">
          <h2 className="mb-4 text-4xl font-bold text-white">🎉 ƯU ĐÃI ĐẶC BIỆT</h2>
          <p className="mb-6 text-xl text-white">Giảm giá lên đến 50% cho các sản phẩm chọn lọc</p>
          <button className="rounded-full bg-white px-8 py-3 font-semibold text-orange-600 transition hover:bg-gray-100">
            Mua ngay
          </button>
        </div>
      </section> */}
    </MainLayout>
  );
}
