import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import CartPage from './components/pages/CartPage/CartPage';
import CheckoutPage from './components/pages/CheckoutPage/CheckoutPage';
import ProductDetailPage from './components/pages/ProductDetailPage/ProductDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/order" element={<CheckoutPage />} />
        {/* Thêm các route khác ở đây */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
