import ActionButton from '../../molecules/ActionButton/ActionButton';

interface CartSummaryProps {
  itemCount: number;
  subtotal: number;
  shipping?: number;
  discount?: number;
  total: number;
  onCheckout: () => void;
}

export default function CartSummary({
  itemCount,
  subtotal,
  shipping = 0,
  discount = 0,
  total,
  onCheckout,
}: CartSummaryProps) {
  const freeShipThreshold = 498000;
  const remainingForFreeShip = freeShipThreshold - subtotal;
  const isFreeShip = subtotal >= freeShipThreshold;

  return (
    <div className="border-border-primary fixed bottom-0 left-0 z-50 h-fit w-full space-y-3 rounded-lg border bg-white p-6 lg:sticky lg:top-0 lg:z-[0] lg:w-fit lg:min-w-[436px]">
      <p className="text-theme-text text-heading-md">Chi tiết đơn hàng</p>
      
      {/* Số lượng sản phẩm */}
      <div className="flex justify-between text-theme-text-secondary">
        <p className="text-body-sm">Số lượng</p>
        <p className="text-body-sm">{itemCount} sản phẩm</p>
      </div>

      {/* Tạm tính */}
      <div className="flex justify-between">
        <p className="text-body-md">Tạm tính</p>
        <p className="text-theme-text text-price-md font-semibold">{subtotal.toLocaleString('vi-VN')}đ</p>
      </div>
      
      {/* Phí vận chuyển */}
      <div className="flex justify-between">
        <p className="text-body-md">Phí vận chuyển</p>
        {shipping > 0 ? (
          <p className="text-theme-text text-price-md font-semibold">{shipping.toLocaleString('vi-VN')}đ</p>
        ) : (
          <p className="text-body-md font-semibold text-green-600">Miễn phí</p>
        )}
      </div>
      
      {/* Giảm giá */}
      {discount > 0 && (
        <div className="flex justify-between">
          <p className="text-body-md">Giảm giá</p>
          <p className="text-price-md font-semibold text-green-600">-{discount.toLocaleString('vi-VN')}đ</p>
        </div>
      )}
      
      {/* Divider */}
      <div className="h-px w-full bg-gray-200" />
      
      {/* Tổng cộng */}
      <div className="flex w-full justify-between">
        <p className="text-heading-sm font-bold">Tổng cộng</p>
        <div className="flex flex-col gap-1 text-end">
          <p className="text-price-xl font-extrabold text-red-600">{total.toLocaleString('vi-VN')}đ</p>
          {discount > 0 && (
            <p className="text-body-sm text-green-600">Đã tiết kiệm {discount.toLocaleString('vi-VN')}đ</p>
          )}
        </div>
      </div>
      
      {/* Free shipping indicator */}
      <div className="mb-3 flex items-center gap-2">
        {isFreeShip ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="text-success-text size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
            <p className="text-body-md text-green-500">Đơn được miễn phí vận chuyển nhé!</p>
          </>
        ) : subtotal > 0 ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-yellow-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              />
            </svg>
            <p className="text-body-md text-yellow-600">
              Mua thêm {remainingForFreeShip.toLocaleString('vi-VN')}đ để được freeship!
            </p>
          </>
        ) : null}
      </div>
      
      {/* Button đặt hàng */}
      <ActionButton
        onClick={onCheckout}
        disabled={itemCount === 0}
        fullWidth
        className="rounded-full"
        ariaLabel="order"
      >
        Đặt hàng
      </ActionButton>
    </div>
  );
}

