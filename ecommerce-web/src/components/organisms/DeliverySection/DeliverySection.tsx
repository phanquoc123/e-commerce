import type { UseFormRegister } from 'react-hook-form';
import { TextAreaField } from '../../molecules/TextAreaField/TextAreaField';

interface DeliverySectionProps {
  register: UseFormRegister<any>;
  deliveryAddress: string;
  addressError?: string;
  onAddressChange: () => void;
}

export const DeliverySection = ({
  register,
  deliveryAddress,
  addressError = '',
  onAddressChange,
}: DeliverySectionProps) => {
  console.log('🚚 DeliverySection rendered with address:', deliveryAddress);
  
  return (
    <div className="lg:border-border-primary space-y-3 lg:space-y-4 lg:rounded-xl lg:border lg:p-6">
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
          className="size-4 lg:size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
          />
        </svg>
        <p className="text-theme-text text-label-md lg:text-label-lg">
          Hình thức nhận hàng
        </p>
      </div>
      <div className="flex justify-center rounded-full border p-2">Giao tận nơi</div>
      <div className="relative">
        {/* Hidden input for validation */}
        <input
          type="hidden"
          {...register('deliveryAddress', {
            required: 'Vui lòng chọn địa chỉ',
            validate: (value) => value.trim().length > 0 || 'Vui lòng chọn địa chỉ',
          })}
        />
        <div className="space-y-1">
          <div className={`border-border-primary space-y-1 rounded-lg border px-4 py-3 ${addressError ? 'border-red-500' : ''}`}>
            <div className="flex items-center justify-between">
              <p className="text-theme-text text-label-sm">Giao tới *</p>
              <button
                type="button"
                onClick={onAddressChange}
                className="text-label-md text-brandsecondary-text hover:underline"
              >
                {deliveryAddress ? 'Thay đổi' : 'Chọn địa chỉ'}
              </button>
            </div>
            <p className={`text-placeholder-md line-clamp-2 ${deliveryAddress ? 'text-theme-text' : 'text-gray-400'}`}>
              {deliveryAddress || 'Chưa chọn địa chỉ giao hàng'}
            </p>
          </div>
          {addressError && (
            <span className="text-xs font-medium text-red-600">
              {addressError}
            </span>
          )}
        </div>
      </div>
      <div className="h-20 space-y-1">
        <TextAreaField
          {...register('note')}
          placeholder="Nhập ghi chú (không bắt buộc)"
          hasError={false}
          rows={4}
        />
      </div>
    </div>
  );
};
