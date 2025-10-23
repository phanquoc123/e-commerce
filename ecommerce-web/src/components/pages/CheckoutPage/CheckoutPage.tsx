import { useState } from 'react';
import { CheckoutLayout } from '../../templates';
import { AddressSelectionModal } from '../../organisms/AddressSelectionModal/AddressSelectionModal';
import { CustomerInfoSection } from '../../organisms/CustomerInfoSection/CustomerInfoSection';
import { DeliverySection } from '../../organisms/DeliverySection/DeliverySection';
import { PaymentSection } from '../../organisms/PaymentSection/PaymentSection';

export default function CheckoutPage() {
  // State for form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    note: '',
  });

  // State for address modal
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');

  // Handle input changes
  const handleInputChange = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle address save
  const handleAddressSave = (address: string) => {
    setDeliveryAddress(address);
  };

  return (
    <CheckoutLayout>
      <div className="mx-auto max-w-screen-sm lg:max-w-full">
        <form action="">
          <div className="bg-theme-bg lg:mb-0">
            <p className="text-theme-text text-heading-md border-border-primary bg-theme-bg border-b p-4 text-center lg:text-[20px] lg:font-bold">
              Xác nhận đặt hàng
            </p>

            <div className="small-scrollbar mt-px lg:mx-auto lg:mt-0 lg:flex lg:h-[calc(100vh-128px)] lg:max-w-[1248px] lg:gap-8 lg:overflow-y-auto lg:py-12">
              {/* Box left */}
              <div className="h-[calc(100dvh-256px)] space-y-6 overflow-auto px-3 py-4 lg:h-fit lg:w-full lg:p-0">
                <CustomerInfoSection 
                  formData={formData} 
                  onInputChange={handleInputChange} 
                />
                <DeliverySection 
                  deliveryAddress={deliveryAddress}
                  note={formData.note}
                  onAddressChange={() => setIsAddressModalOpen(true)}
                  onNoteChange={handleInputChange('note')}
                />
              </div>
              {/* Box right */}
              <PaymentSection />
            </div>
          </div>
        </form>
      </div>

      {/* Address Selection Modal */}
      <AddressSelectionModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={handleAddressSave}
      />
    </CheckoutLayout>
  );
}
