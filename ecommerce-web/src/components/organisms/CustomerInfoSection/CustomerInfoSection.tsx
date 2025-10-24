import { InputField } from '../../molecules/InputField/InputField';

interface CustomerInfoSectionProps {
  formData: {
    fullName: string;
    phone: string;
    email: string;
  };
  onInputChange: (field: 'fullName' | 'phone' | 'email' | 'note') => (value: string) => void;
}

export const CustomerInfoSection = ({ formData, onInputChange }: CustomerInfoSectionProps) => {
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

      <InputField
        name="fullName"
        placeholder="Nhập tên khách hàng"
        value={formData.fullName}
        onChange={onInputChange('fullName')}
        hasError={false}
      />
      <InputField
        name="phone"
        placeholder="Nhập số điện thoại"
        value={formData.phone}
        onChange={onInputChange('phone')}
        hasError={false}
      />
      <InputField
        name="email"
        placeholder="Nhập địa chỉ email (không bắt buộc)"
        value={formData.email}
        onChange={onInputChange('email')}
        hasError={false}
      />
    </div>
  );
};
