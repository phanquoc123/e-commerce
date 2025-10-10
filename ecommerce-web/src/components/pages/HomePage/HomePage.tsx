import { MainLayout } from '../../templates';

export default function HomePage() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to E-commerce</h1>
        <p className="text-lg text-gray-600">Discover amazing products at great prices!</p>
      </div>
    </MainLayout>
  );
}
