import { MainLayout } from '../../templates';

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
    </MainLayout>
  );
}
