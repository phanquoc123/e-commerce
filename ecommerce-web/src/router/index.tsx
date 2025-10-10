import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from '../components/templates';
import HomePage from '../components/pages/HomePage/HomePage';
import CartPage from '../components/pages/CartPage/CartPage';
import CheckoutPage from '../components/pages/CheckoutPage/CheckoutPage';

// Trang About sử dụng MainLayout
const About: React.FC = () => (
  <MainLayout>
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="text-gray-600">Learn more about our company.</p>
    </div>
  </MainLayout>
);

const AppRouter: React.FC = () => (
  <Router>
    <Routes>
      {/* Các trang có Header + Footer */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About />} />
      
      {/* Các trang KHÔNG có Header + Footer */}
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  </Router>
);

export default AppRouter;
