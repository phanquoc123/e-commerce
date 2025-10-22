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
      
      {/* Tổng tiền */}
      <div className="flex justify-between">
        <p>Tổng tiền</p>
        <p className="text-theme-text text-price-md">{subtotal.toLocaleString('vi-VN')}đ</p>
      </div>
      
      {/* Giảm giá */}
      {discount > 0 && (
        <div className="flex justify-between">
          <p>Giảm giá</p>
          <p className="text-theme-text text-price-md">{discount.toLocaleString('vi-VN')}đ</p>
        </div>
      )}
      
      {/* Divider */}
      <div className="h-px w-full bg-gray-200" />
      
      {/* Thành tiền */}
      <div className="flex w-full justify-between">
        <p>Thành tiền</p>
        <div className="flex flex-col gap-1 text-end">
          <p className="text-theme-text text-price-xl">{total.toLocaleString('vi-VN')}đ</p>
          {discount > 0 && (
            <p className="text-theme-text text-price-md">Tiết kiệm {discount.toLocaleString('vi-VN')}đ</p>
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
      <button
        onClick={onCheckout}
        disabled={itemCount === 0}
        className="focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-brand-surface text-theme-text hover:bg-brand-surface-hover [&_svg]:text-theme-text text-label-md [&_svg]:size-5 inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
        aria-label="order"
      >
        Đặt hàng
        <span className="focus-visible:ring-ring rounded-rounded [&_svg]:pointer-events-none [&_svg]:shrink-0 inline-flex size-5 min-w-5 items-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="size-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </button>
    </div>
  );
}

