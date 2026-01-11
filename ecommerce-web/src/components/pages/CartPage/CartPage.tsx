import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckoutLayout } from '../../templates';
import ProductVariantDialog from '../../molecules/ProductVariantDialog/ProductVariantDialog';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import CartItem from '../../organisms/CartItem/CartItem';
import CartSummary from '../../organisms/CartSummary/CartSummary';
import { useCart, useUpdateCartItem, useRemoveCartItem, useAddToCart } from '../../../hooks/useCart';
import { useProductDetail } from '../../../hooks/useProduct';
import { toast } from 'react-toastify';

export default function CartPage() {
  const navigate = useNavigate();
  
  // Fetch cart data from API
  const { data: cart, isLoading: isLoadingCart } = useCart();
  const updateCartItem = useUpdateCartItem();
  const removeCartItem = useRemoveCartItem();
  const addToCart = useAddToCart();

  const [checkAll, setCheckAll] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItemForVariant, setSelectedItemForVariant] = useState<any | null>(null);
  const [newColorId, setNewColorId] = useState<number | null>(null);
  const [newSizeId, setNewSizeId] = useState<number | null>(null);

  // Fetch product detail for variant dialog (when user wants to change color/size)
  const { data: productForVariant } = useProductDetail(
    selectedItemForVariant?.productSlug || '',
    newColorId,
    newSizeId
  );

  // Auto update checkAll when all items are checked
  useEffect(() => {
    if (!cart || cart.items.length === 0) {
      setCheckAll(false);
      return;
    }
    const allChecked = cart.items.every((item) => checkedItems.has(item.id));
    setCheckAll(allChecked);
  }, [cart, checkedItems]);

  const handleCheckAll = (checked: boolean) => {
    setCheckAll(checked);
    if (checked && cart) {
      setCheckedItems(new Set(cart.items.map((item) => item.id)));
    } else {
      setCheckedItems(new Set());
    }
  };

  const handleItemCheck = (id: string, checked: boolean) => {
    const newChecked = new Set(checkedItems);
    if (checked) {
      newChecked.add(id);
    } else {
      newChecked.delete(id);
    }
    setCheckedItems(newChecked);
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity <= 0) return;
    updateCartItem.mutate({ itemId, quantity });
  };

  const handleVariantClick = (item: any) => {
    setSelectedItemForVariant(item);
    setNewColorId(item.colorId);
    setNewSizeId(item.sizeId);
    setIsDialogOpen(true);
  };

  const handleUpdateVariant = () => {
    if (!selectedItemForVariant || !productForVariant || !newColorId) {
      toast.warning('Vui lòng chọn màu và size');
      return;
    }

    // Find new variant info
    const newColor = productForVariant.colors?.find((c: any) => Number(c.id) === newColorId);
    const newSize = newColor?.sizes?.find((s: any) => Number(s.id) === newSizeId);
    const mainImage = newColor?.images?.find((img: any) => img.isMain);

    const newVariant = productForVariant.variants?.find(
      (v: any) => Number(v.colorId) === newColorId && (newSizeId ? Number(v.sizeId) === newSizeId : true)
    );

    if (!newVariant || !newColor) {
      toast.error('Không tìm thấy variant phù hợp');
      return;
    }

    // Remove old item
    removeCartItem.mutate(selectedItemForVariant.id, {
      onSuccess: () => {
        // Add new item with new variant
        addToCart.mutate(
          {
            productId: productForVariant.id,
            productName: productForVariant.name,
            productSlug: productForVariant.slug,
            variantId: newVariant.id,
            sku: newVariant.sku,
            colorId: newColorId,
            colorName: newColor.name,
            colorHexCode: newColor.hexCode || null,
            sizeId: newSizeId,
            sizeName: newSize?.name || null,
            sizeCode: newSize?.code || null,
            price: newVariant.price,
            quantity: selectedItemForVariant.quantity,
            imageUrl: mainImage?.imageUrl || newColor.thumbnailUrl || '',
            stock: newVariant.stock,
          },
          {
            onSuccess: () => {
              setIsDialogOpen(false);
              setSelectedItemForVariant(null);
            },
            onError: (error: any) => {
              toast.error(`❌ ${error.message}`);
            },
          }
        );
      },
    });
  };

  const handleDelete = (itemId: string) => {
    if (confirm('Bạn có chắc muốn xóa sản phẩm này?')) {
      removeCartItem.mutate(itemId);
    }
  };

  const handleCheckout = () => {
    console.log('🛒 Checkout clicked!', { cart, checkedItems: Array.from(checkedItems) });
    
    if (!cart) {
      // console.log('❌ No cart data');
      toast.warning('Giỏ hàng trống');
      return;
    }
    
    const selectedItems = cart.items.filter((item) => checkedItems.has(item.id));
    // console.log('✅ Selected items:', selectedItems);
    
    if (selectedItems.length === 0) {
      toast.warning('Vui lòng chọn ít nhất một sản phẩm');
      return;
    }

    // Calculate totals for selected items
    const checkoutSubtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const checkoutShipping = checkoutSubtotal > 0 && checkoutSubtotal < 498000 ? 30000 : 0;
    const checkoutTotal = checkoutSubtotal + checkoutShipping;

    // Prepare checkout data
    const checkoutData = {
      items: selectedItems,
      subtotal: checkoutSubtotal,
      shipping: checkoutShipping,
      discount: 0, // TODO: Add discount logic if needed
      total: checkoutTotal,
      isFreeShipping: checkoutShipping === 0,
    };

    // console.log('📦 Navigating to checkout with data:', checkoutData);
    
    // Navigate to checkout page with state
    navigate('/checkout', { state: checkoutData });
  };

  // Calculate totals
  const { selectedCount, subtotal } = useMemo(() => {
    if (!cart) return { selectedCount: 0, subtotal: 0 };
    const selected = cart.items.filter((item) => checkedItems.has(item.id));
    return {
      selectedCount: selected.reduce((sum, item) => sum + item.quantity, 0),
      subtotal: selected.reduce((sum, item) => sum + item.price * item.quantity, 0),
    };
  }, [cart, checkedItems]);

  const shipping = subtotal > 0 && subtotal < 498000 ? 30000 : 0;
  const total = subtotal + shipping;

  // Prepare colors and sizes for variant dialog
  const variantDialogColors = useMemo(() => {
    if (!productForVariant?.colors) return [];
    return productForVariant.colors.map((c: any) => ({
      id: String(c.id),
      name: c.name,
      code: c.hexCode || '#ccc',
    }));
  }, [productForVariant]);

  const variantDialogSizes = useMemo(() => {
    if (!productForVariant?.colors || !newColorId) return [];
    const selectedColor = productForVariant.colors.find((c: any) => Number(c.id) === newColorId);
    if (!selectedColor?.sizes) return [];
    return selectedColor.sizes.map((s: any) => ({
      id: String(s.id),
      name: s.name,
    }));
  }, [productForVariant, newColorId]);

  // Get image for selected color in dialog
  const variantDialogImage = useMemo(() => {
    if (!productForVariant?.colors || !newColorId) {
      return selectedItemForVariant?.imageUrl || '';
    }
    const selectedColor = productForVariant.colors.find((c: any) => Number(c.id) === newColorId);
    if (!selectedColor) return selectedItemForVariant?.imageUrl || '';
    
    const mainImage = selectedColor.images?.find((img: any) => img.isMain);
    return mainImage?.imageUrl || selectedColor.thumbnailUrl || selectedItemForVariant?.imageUrl || '';
  }, [productForVariant, newColorId, selectedItemForVariant]);

  // Get price for selected variant in dialog
  const variantDialogPrice = useMemo(() => {
    if (!productForVariant?.variants || !newColorId) {
      return selectedItemForVariant?.price || 0;
    }
    const variant = productForVariant.variants.find(
      (v: any) => Number(v.colorId) === newColorId && (newSizeId ? Number(v.sizeId) === newSizeId : true)
    );
    return variant?.price || selectedItemForVariant?.price || 0;
  }, [productForVariant, newColorId, newSizeId, selectedItemForVariant]);

  if (isLoadingCart) {
    return (
      <CheckoutLayout>
        <div className="flex h-screen items-center justify-center">
          <p className="text-lg text-gray-500">Đang tải giỏ hàng...</p>
        </div>
      </CheckoutLayout>
    );
  }

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
              {!cart || cart.items.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="text-lg text-gray-500">Giỏ hàng trống</p>
                  <p className="mt-2 text-sm text-gray-400">Hãy thêm sản phẩm vào giỏ hàng!</p>
                </div>
              ) : (
                <>
                  {/* Check all button */}
                  <Checkbox
                    id="checkAll"
                    checked={checkAll}
                    onChange={handleCheckAll}
                    label="Chọn tất cả"
                  />

                  {/* Cart Items */}
                  {cart.items.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      name={item.productName}
                      image={item.imageUrl}
                      variant={`${item.colorName}${item.sizeCode ? `, ${item.sizeCode}` : ''}`}
                      price={item.price}
                      quantity={item.quantity}
                      checked={checkedItems.has(item.id)}
                      onCheck={(checked) => handleItemCheck(item.id, checked)}
                      onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                      onVariantClick={() => handleVariantClick(item)}
                      onDelete={() => handleDelete(item.id)}
                    />
                  ))}
                </>
              )}
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
      {selectedItemForVariant && productForVariant && (
        <ProductVariantDialog
          isOpen={isDialogOpen}
          onClose={() => {
            setIsDialogOpen(false);
            setSelectedItemForVariant(null);
          }}
          productName={selectedItemForVariant.productName}
          productImage={variantDialogImage}
          price={variantDialogPrice}
          quantity={selectedItemForVariant.quantity}
          selectedColor={String(newColorId)}
          selectedSize={newSizeId ? String(newSizeId) : ''}
          colors={variantDialogColors}
          sizes={variantDialogSizes}
          onColorSelect={(colorId) => setNewColorId(Number(colorId))}
          onSizeSelect={(sizeId) => setNewSizeId(Number(sizeId))}
          onUpdate={handleUpdateVariant}
        />
      )}
    </CheckoutLayout>
  );
}
