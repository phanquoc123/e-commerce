import type { UseFormRegister } from 'react-hook-form';
import { InputField } from '../../molecules/InputField/InputField';

interface CustomerInfoSectionProps {
  register: UseFormRegister<any>;
  errors?: {
    fullName: string;
    phone: string;
    email: string;
  };
}

export const CustomerInfoSection = ({ 
  register,
  errors = { fullName: '', phone: '', email: '' },
}: CustomerInfoSectionProps) => {
  return (
    <div className="lg:border-border-primary space-y-3 lg:space-y-4 lg:rounded-xl lg:border lg:p-6">
      <div className="flex items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
          data-slot="icon"
          className="size-4 lg:size-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
          ></path>
        </svg>
        <p className="text-theme-text text-label-md lg:text-label-lg">Thông tin người nhận</p>
      </div>

      <div className="relative space-y-1">
        <InputField
          {...register('fullName', {
            required: 'Vui lòng nhập họ và tên',
            minLength: {
              value: 2,
              message: 'Phải có ít nhất 2 ký tự',
            },
            validate: (value) => value.trim().length >= 2 || 'Phải có ít nhất 2 ký tự',
          })}
          placeholder="Nhập tên khách hàng *"
          hasError={!!errors.fullName}
        />
        {errors.fullName && (
          <span className="text-xs font-medium text-red-600">
            {errors.fullName}
          </span>
        )}
      </div>

      <div className="relative space-y-1">
        <InputField
          {...register('phone', {
            required: 'Vui lòng nhập SĐT',
            pattern: {
              value: /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/,
              message: 'SĐT không hợp lệ',
            },
          })}
          placeholder="Nhập số điện thoại *"
          hasError={!!errors.phone}
        />
        {errors.phone && (
          <span className="text-xs font-medium text-red-600">
            {errors.phone}
          </span>
        )}
      </div>

      <div className="relative space-y-1">
        <InputField
          {...register('email', {
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Email không hợp lệ',
            },
          })}
          placeholder="Nhập địa chỉ email (không bắt buộc)"
          hasError={!!errors.email}
        />
        {errors.email && (
          <span className="text-xs font-medium text-red-600">
            {errors.email}
          </span>
        )}
      </div>
    </div>
  );
};
