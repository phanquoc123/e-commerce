import { CheckoutLayout } from '../../templates';

export default function CartPage() {
  return (
    <CheckoutLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {/* Cart content sẽ được thêm sau */}
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Cart items will be displayed here</p>
        </div>
      </div>
    </CheckoutLayout>
  );
}
