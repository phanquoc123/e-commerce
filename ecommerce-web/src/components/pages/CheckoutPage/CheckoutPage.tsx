import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { CheckoutLayout } from '../../templates';
import { CustomerInfoSection } from '../../organisms/CustomerInfoSection/CustomerInfoSection';
import { DeliverySection } from '../../organisms/DeliverySection/DeliverySection';
import { PaymentSection } from '../../organisms/PaymentSection/PaymentSection';
import OrderDetail from '../../organisms/OrderDetail/OrderDetail';
import { AddressSelectionModal } from '../../organisms/AddressSelectionModal/AddressSelectionModal';
import type { CartItem } from '../../../services/cartService';
import { toast } from 'react-toastify';

interface CheckoutData {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  isFreeShipping: boolean;
}

interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  deliveryAddress: string;
  note: string;
}

export default function CheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get checkout data from navigation state
  const checkoutData = location.state as CheckoutData | null;

  // Address modal state
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CheckoutFormData>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      fullName: '',
      phone: '',
      email: '',
      deliveryAddress: '',
      note: '',
    },
  });

  // Watch form values
  const formValues = watch();
  
  console.log('🔍 Form values changed:', formValues);

  // Payment info from checkout data
  const paymentInfo = checkoutData
    ? {
        subtotal: checkoutData.subtotal,
        discount: checkoutData.discount,
        finalAmount: checkoutData.total,
        savings: checkoutData.discount,
        shipping: checkoutData.shipping,
        isFreeShipping: checkoutData.isFreeShipping,
      }
    : {
        subtotal: 0,
        discount: 0,
        finalAmount: 0,
        savings: 0,
        shipping: 0,
        isFreeShipping: false,
      };

  // Transform cart items to order items format
  const orderItems = checkoutData
    ? checkoutData.items.map((item) => ({
        id: item.id,
        imageUrl: item.imageUrl,
        name: item.productName,
        variant: `${item.colorName}${item.sizeCode ? `, ${item.sizeCode}` : ''}`,
        quantity: item.quantity,
        finalPrice: item.price * item.quantity,
      }))
    : [];

  // Redirect if no checkout data
  if (!checkoutData || !checkoutData.items || checkoutData.items.length === 0) {
    navigate('/cart');
    return null;
  }

  // Handle form submission
  const onSubmit = (data: CheckoutFormData) => {
    console.log('✅ Form validated! Processing checkout...', {
      formData: data,
      orderInfo: checkoutData,
      paymentInfo,
    });

    // TODO: Call API to create order
    toast.success('Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
    navigate('/');
  };

  // Handle validation errors
  const onError = (formErrors: any) => {
    console.log('❌ Form has errors:', formErrors);
    
    // Auto scroll to first error field
    const firstErrorField = Object.keys(formErrors)[0];
    if (firstErrorField) {
      const element = document.getElementsByName(firstErrorField)[0];
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Handle address modal
  const handleOpenAddressModal = () => {
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  const handleSaveAddress = (address: string) => {
    console.log('📍 Saving address:', address);
    setValue('deliveryAddress', address, {
      shouldValidate: true,
      shouldTouch: true,
      shouldDirty: true,
    });
    console.log('✅ Address saved to form');
    setIsAddressModalOpen(false);
  };

  

  return (
    <CheckoutLayout>
      <div className="mx-auto max-w-screen-sm lg:max-w-full">
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="bg-theme-bg lg:mb-0">
            <p className="text-theme-text text-heading-md border-border-primary bg-theme-bg border-b p-4 text-center lg:text-[20px] lg:font-bold">
              Xác nhận đặt hàng
            </p>

            <div className="mt-px lg:mx-auto lg:mt-0 lg:flex lg:h-[calc(100vh-128px)] lg:max-w-[1248px] lg:gap-8 lg:py-12">
              {/* Box left */}
              <div className="small-scrollbar h-[calc(100dvh-202px-114px)] space-y-6 overflow-auto px-3 py-4 lg:w-full lg:p-0">
                <CustomerInfoSection 
                  register={register}
                  errors={{
                    fullName: errors.fullName?.message || '',
                    phone: errors.phone?.message || '',
                    email: errors.email?.message || '',
                  }}
                />
                <DeliverySection
                  register={register}
                  deliveryAddress={formValues.deliveryAddress}
                  addressError={errors.deliveryAddress?.message || ''}
                  onAddressChange={handleOpenAddressModal}
                />
                <OrderDetail
                  items={orderItems}
                  subtotal={checkoutData.subtotal}
                  discount={checkoutData.discount}
                  shipping={checkoutData.isFreeShipping ? 'Miễn phí' : checkoutData.shipping}
                  finalAmount={checkoutData.total}
                  savings={checkoutData.discount}
                  showMobilePaymentSummary={true}
                />
              </div>
              {/* Box right */}
              <PaymentSection
                paymentInfo={paymentInfo}
                disabled={false}
              />
            </div>
          </div>
        </form>

        {/* Address Selection Modal */}
        {isAddressModalOpen && (
          <AddressSelectionModal
            isOpen={isAddressModalOpen}
            onClose={handleCloseAddressModal}
            onSave={handleSaveAddress}
          />
        )}
      </div>
    </CheckoutLayout>
  );
}
