import BlackLine from '../../atoms/BlackLine/BlackLine';
import SectionHeader from '../../molecules/SectionHeader/SectionHeader';
import OrderItemCard from '../../molecules/OrderItemCard/OrderItemCard';
import PaymentDetailRow from '../../molecules/PaymentDetailRow/PaymentDetailRow';

interface OrderItem {
  id: string;
  imageUrl: string;
  name: string;
  variant: string;
  quantity: number;
  originalPrice?: number;
  finalPrice: number;
}

interface OrderDetailProps {
  items?: OrderItem[];
  subtotal?: number;
  discount?: number;
  shipping?: string | number;
  finalAmount?: number;
  savings?: number;
  showMobilePaymentSummary?: boolean;
}

export default function OrderDetail({
  items = [
    {
      id: '1',
      imageUrl: 'https://buggy.yodycdn.com/images/product/c89b93c3de352d52ac5e939d64cfebf9.webp?width=431&height=575',
      name: 'Áo khoác Gió Nữ 2 Lớp Siêu Co Giãn',
      variant: 'Tím than, S',
      quantity: 1,
      originalPrice: 669000,
      finalPrice: 602100
    }
  ],
  subtotal = 1168000,
  discount = 66900,
  shipping = 'Miễn phí',
  finalAmount = 1101100,
  savings = 66900,
  showMobilePaymentSummary = true
}: OrderDetailProps) {
  const shoppingBagIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      data-slot="icon"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );

  const receiptIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      aria-hidden="true"
      data-slot="icon"
      className="size-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m9 14.25 6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0c1.1.128 1.907 1.077 1.907 2.185ZM9.75 9h.008v.008H9.75V9Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm4.125 4.5h.008v.008h-.008V13.5Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );

  return (
    <>
      <div className="lg:border-border-primary space-y-3 lg:space-y-4 lg:rounded-lg lg:border lg:p-6">
        <SectionHeader icon={shoppingBagIcon} title="Chi tiết đơn hàng" />
        
        {items.map((item) => (
          <OrderItemCard
            key={item.id}
            imageUrl={item.imageUrl}
            name={item.name}
            variant={item.variant}
            quantity={item.quantity}
            originalPrice={item.originalPrice}
            finalPrice={item.finalPrice}
          />
        ))}
        {showMobilePaymentSummary && (
          <div className="space-y-3 lg:hidden">
            <SectionHeader icon={receiptIcon} title="Chi tiết thanh toán" />
            <div className="space-y-2">
              <PaymentDetailRow 
                label="Tổng tiền" 
                value={`${subtotal.toLocaleString('vi-VN')}đ`} 
              />
              {discount > 0 && (
                <PaymentDetailRow 
                  label="Giảm giá" 
                  value={`${discount.toLocaleString('vi-VN')}đ`} 
                />
              )}
              <PaymentDetailRow 
                label="Phí vận chuyển" 
                value={typeof shipping === 'number' ? `${shipping.toLocaleString('vi-VN')}đ` : shipping} 
              />
              <BlackLine />

              <PaymentDetailRow 
                label="Thành tiền" 
                value={
                  <div className="text-right">
                    <p className="text-price-lg text-brandsecondary-text">
                      {finalAmount.toLocaleString('vi-VN')}đ
                    </p>
                    {savings > 0 && (
                      <p className="text-theme-text text-label-sm">
                        (Tiết kiệm {savings.toLocaleString('vi-VN')}đ)
                      </p>
                    )}
                  </div>
                }
                isHighlight
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
