import BlackLine from '../../atoms/BlackLine/BlackLine';
import ActionButton from '../../molecules/ActionButton/ActionButton';

interface PaymentInfo {
  subtotal: number;
  discount: number;
  finalAmount: number;
  savings: number;
  shipping?: number;
  isFreeShipping?: boolean;
}

interface PaymentSectionProps {
  paymentInfo: PaymentInfo;
  onCheckout: () => void;
  disabled?: boolean;
}

export const PaymentSection = ({
  paymentInfo,
  onCheckout,
  disabled = false,
}: PaymentSectionProps) => {
  return (
    <div className="lg:border-border-primary fixed bottom-0 z-10 mx-auto h-fit w-full max-w-screen-sm border bg-[#fff] lg:sticky lg:top-0 lg:z-0 lg:w-[436px] lg:min-w-[436px] lg:space-y-6 lg:overflow-hidden lg:rounded-xl lg:p-6">
      <div className="divide-border-primary border-border-primary grid grid-cols-2 divide-x border-y lg:grid-cols-1 lg:space-y-3 lg:divide-x-0 lg:border-0">
        <div className="lg:border-border-primary flex cursor-pointer items-center gap-1 p-3 lg:gap-2 lg:rounded-md lg:border">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="fill-info-text size-4 lg:size-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-body-sm text-info-text lg:text-[14px] lg:font-normal lg:leading-5 lg:text-[#339af0]">
            Chọn khuyến mãi
          </p>
          <div className="ml-auto flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="text-theme-text-secondary size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </div>
        </div>
        <div className="lg:border-border-primary flex cursor-pointer items-center gap-1 p-3 lg:gap-2 lg:rounded-md lg:border">
          <img
            loading="lazy"
            className="size-4 lg:size-6"
            src="https://buggy.yodycdn.com/images/assets/method_cod.webp"
            alt="COD"
          />
          <p className="text-theme-text text-body-sm line-clamp-1 lg:text-[14px] lg:font-normal lg:leading-5">
            (COD) Thanh toán khi nhận hàng
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            className="text-theme-text-secondary ml-auto size-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>
      <div className="hidden space-y-3 lg:block">
        <p className="text-heading-md text-theme-text">Chi tiết đơn hàng</p>
        <div className="flex justify-between">
          <p className="text-theme-text text-body-md">Tổng tiền</p>
          <p className="text-theme-text text-price-md">
            {paymentInfo.subtotal.toLocaleString('vi-VN')}đ
          </p>
        </div>
        {paymentInfo.discount > 0 && (
          <div className="flex justify-between">
            <p className="text-theme-text text-body-md">Giảm giá</p>
            <p className="text-theme-text text-price-md">
              {paymentInfo.discount.toLocaleString('vi-VN')}đ
            </p>
          </div>
        )}
      </div>
      <div className="w-full space-y-2 p-3 lg:contents lg:space-y-0 lg:p-0">
        <div className="flex justify-between">
          <p className="text-theme-text text-body-md hidden lg:block">Phí vận chuyển</p>
          <div className="flex items-center gap-2">
            {paymentInfo.isFreeShipping ? (
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
                <p className="text-theme-text text-price-md lg:hidden">
                  Đơn hàng được miễn phí vận chuyển
                </p>
                <p className="text-theme-text text-price-md hidden lg:block">Miễn phí</p>
              </>
            ) : (
              <p className="text-theme-text text-price-md">
                {paymentInfo.shipping ? `${paymentInfo.shipping.toLocaleString('vi-VN')}đ` : '0đ'}
              </p>
            )}
          </div>
        </div>
        <BlackLine className="hidden lg:block" />

        <div className="flex justify-between">
          <p className="text-price-lg text-theme-text lg:text-body-md">Thành tiền </p>
          <div className="flex flex-col items-end justify-end gap-[2px]">
            <p className="text-price-xl text-brandsecondary-text">
              {paymentInfo.finalAmount.toLocaleString('vi-VN')}đ
            </p>
            {paymentInfo.savings > 0 && (
              <p className="text-theme-text text-price-sm">
                Tiết kiệm: {paymentInfo.savings.toLocaleString('vi-VN')}đ
              </p>
            )}
          </div>
        </div>

        <ActionButton
          onClick={onCheckout}
          disabled={false}
          fullWidth
          className="rounded-full"
          ariaLabel="Đặt hàng"
        >
          Đặt hàng
        </ActionButton>
      </div>
    </div>
  );
};
