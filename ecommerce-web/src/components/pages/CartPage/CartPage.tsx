import { useState, useEffect, useMemo } from 'react';
import { CheckoutLayout } from '../../templates';
import ProductVariantDialog from '../../molecules/ProductVariantDialog/ProductVariantDialog';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import CartItem from '../../organisms/CartItem/CartItem';
import CartSummary from '../../organisms/CartSummary/CartSummary';

interface CartItemData {
  id: string;
  name: string;
  image: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
  checked: boolean;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItemData[]>([
    {
      id: '1',
      name: 'Áo Khoác Gió Trẻ Em 3c Promax - Beige 058 - 164',
      image: 'https://buggy.yodycdn.com/images/product/c7be694a704c9dc57015fdf04dadeb36.webp',
      color: 'beige-058',
      size: '152',
      price: 399000,
      quantity: 1,
      checked: false,
    },
    {
      id: '2',
      name: 'Áo Thun Nam Basic - Navy 002 - M',
      image: 'https://buggy.yodycdn.com/images/product/c7be694a704c9dc57015fdf04dadeb36.webp',
      color: 'navy-002',
      size: '134',
      price: 299000,
      quantity: 2,
      checked: false,
    },
    {
      id: '3',
      name: 'Áo Thun Nam Basic - Navy 002 - M',
      image: 'https://buggy.yodycdn.com/images/product/c7be694a704c9dc57015fdf04dadeb36.webp',
      color: 'navy-002',
      size: '134',
      price: 299000,
      quantity: 2,
      checked: false,
    },
    {
      id: '4',
      name: 'Áo Thun Nam Basic - Navy 002 - M',
      image: 'https://buggy.yodycdn.com/images/product/c7be694a704c9dc57015fdf04dadeb36.webp',
      color: 'navy-002',
      size: '134',
      price: 299000,
      quantity: 2,
      checked: false,
    },
    {
      id: '5',
      name: 'Áo Thun Nam Basic - Navy 002 - M',
      image: 'https://buggy.yodycdn.com/images/product/c7be694a704c9dc57015fdf04dadeb36.webp',
      color: 'navy-002',
      size: '134',
      price: 299000,
      quantity: 2,
      checked: false,
    },
    {
      id: '6',
      name: 'Áo Thun Nam Basic - Navy 002 - M',
      image: 'https://buggy.yodycdn.com/images/product/c7be694a704c9dc57015fdf04dadeb36.webp',
      color: 'navy-002',
      size: '134',
      price: 299000,
      quantity: 2,
      checked: false,
    },
    {
      id: '7',
      name: 'Áo Thun Nam Basic - Navy 002 - M',
      image: 'https://buggy.yodycdn.com/images/product/c7be694a704c9dc57015fdf04dadeb36.webp',
      color: 'navy-002',
      size: '134',
      price: 299000,
      quantity: 2,
      checked: false,
    },
    {
      id: '8',
      name: 'Áo Thun Nam Basic - Navy 002 - M',
      image: 'https://buggy.yodycdn.com/images/product/c7be694a704c9dc57015fdf04dadeb36.webp',
      color: 'navy-002',
      size: '134',
      price: 299000,
      quantity: 2,
      checked: false,
    },
    {
      id: '9',
      name: 'Áo Thun Nam Basic - Navy 002 - M',
      image: 'https://buggy.yodycdn.com/images/product/c7be694a704c9dc57015fdf04dadeb36.webp',
      color: 'navy-002',
      size: '134',
      price: 299000,
      quantity: 2,
      checked: false,
    },
    {
      id: '10',
      name: 'Áo Thun Nam Basic - Navy 002 - M',
      image: 'https://buggy.yodycdn.com/images/product/c7be694a704c9dc57015fdf04dadeb36.webp',
      color: 'navy-002',
      size: '134',
      price: 299000,
      quantity: 2,
      checked: false,
    },
  ]);

  const [checkAll, setCheckAll] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState('beige-058');
  const [selectedSize, setSelectedSize] = useState('152');

  // Mock data cho colors và sizes
  const colors = [
    { id: 'pink-001', name: 'HỒNG 001', code: '#FFB6C1' },
    { id: 'navy-002', name: 'XANH ĐẬM 002', code: '#1E3A8A' },
    { id: 'blue-012', name: 'XANH 012', code: '#60A5FA' },
    { id: 'beige-058', name: 'BEIGE 058', code: '#D4C5B0' },
  ];

  const sizes = [
    { id: '110', name: '110' },
    { id: '122', name: '122' },
    { id: '134', name: '134' },
    { id: '140', name: '140' },
    { id: '152', name: '152' },
    { id: '164', name: '164' },
  ];

  // Auto update checkAll when all items are checked
  useEffect(() => {
    const allChecked = cartItems.length > 0 && cartItems.every(item => item.checked);
    setCheckAll(allChecked);
  }, [cartItems]);

  const handleCheckAll = (checked: boolean) => {
    setCheckAll(checked);
    setCartItems(items => items.map(item => ({ ...item, checked })));
  };

  const handleItemCheck = (id: string, checked: boolean) => {
    setCartItems(items => items.map(item => (item.id === id ? { ...item, checked } : item)));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(items => items.map(item => (item.id === id ? { ...item, quantity } : item)));
  };

  const handleVariantClick = (id: string) => {
    const item = cartItems.find(i => i.id === id);
    if (item) {
      setSelectedItemId(id);
      setSelectedColor(item.color);
      setSelectedSize(item.size);
      setIsDialogOpen(true);
    }
  };

  const handleUpdateVariant = () => {
    if (selectedItemId) {
      setCartItems(items =>
        items.map(item =>
          item.id === selectedItemId ? { ...item, color: selectedColor, size: selectedSize } : item
        )
      );
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    const selectedItems = cartItems.filter(item => item.checked);
    console.log('Checkout items:', selectedItems);
    // TODO: Navigate to checkout page
  };

  // Calculate totals
  const { selectedCount, subtotal } = useMemo(() => {
    const selected = cartItems.filter(item => item.checked);
    return {
      selectedCount: selected.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: selected.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
  }, [cartItems]);

  const shipping = subtotal > 0 && subtotal < 498000 ? 30000 : 0;
  const total = subtotal + shipping;

  const selectedItem = selectedItemId ? cartItems.find(i => i.id === selectedItemId) : null;

  return (
    <CheckoutLayout>
      <div className="mx-auto max-w-screen-sm lg:max-w-full">
        <p className="text-theme-text text-heading-md border-border-primary bg-theme-bg border-b p-4 text-center lg:text-[20px] lg:font-bold">
          Giỏ hàng
        </p>
        <div className="small-scrollbar mt-px h-[calc(100dvh-114px)] overflow-y-auto lg:mx-auto lg:mt-0 lg:flex lg:h-[calc(100vh-132px)] lg:max-w-[1248px] lg:gap-6 lg:overflow-y-auto lg:py-12">
          {/* List items in cart */}
          <div className="lg:border-border-primary space-y-4 bg-white pb-[130px] pt-5 lg:h-fit lg:w-full lg:space-y-6 lg:rounded-lg lg:border lg:p-6">
            <div className="flex flex-col gap-4 bg-white px-3 lg:h-fit lg:gap-6 lg:p-0">
              {/* Check all button */}
              <Checkbox
                id="checkAll"
                checked={checkAll}
                onChange={handleCheckAll}
                label="Chọn tất cả"
              />

              {/* Cart Items */}
              {cartItems.map(item => (
                <CartItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  variant={`${colors.find(c => c.id === item.color)?.name}, ${sizes.find(s => s.id === item.size)?.name}`}
                  price={item.price}
                  quantity={item.quantity}
                  checked={item.checked}
                  onCheck={checked => handleItemCheck(item.id, checked)}
                  onQuantityChange={quantity => handleQuantityChange(item.id, quantity)}
                  onVariantClick={() => handleVariantClick(item.id)}
                  onDelete={() => handleDelete(item.id)}
                />
              ))}
            </div>
          </div>

          {/* Cart Summary - Checkout Info */}
          <CartSummary
            itemCount={selectedCount}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            onCheckout={handleCheckout}
          />
        </div>
      </div>

      {/* Product Variant Dialog */}
      {selectedItem && (
        <ProductVariantDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          productName={selectedItem.name}
          productImage={selectedItem.image}
          selectedColor={selectedColor}
          selectedSize={selectedSize}
          colors={colors}
          sizes={sizes}
          onColorSelect={setSelectedColor}
          onSizeSelect={setSelectedSize}
          onUpdate={handleUpdateVariant}
        />
      )}
    </CheckoutLayout>
  );
}
