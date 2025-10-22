import { useState } from 'react';
import Checkbox from '../../atoms/Checkbox/Checkbox';
import QuantityInput from '../../atoms/QuantityInput/QuantityInput';
import ConfirmDialog from '../../molecules/ConfirmDialog/ConfirmDialog';

interface CartItemProps {
  id: string;
  name: string;
  image: string;
  variant: string;
  price: number;
  quantity: number;
  checked: boolean;
  onCheck: (checked: boolean) => void;
  onQuantityChange: (quantity: number) => void;
  onVariantClick: () => void;
  onDelete: () => void;
}

export default function CartItem({
  id,
  name,
  image,
  variant,
  price,
  quantity,
  checked,
  onCheck,
  onQuantityChange,
  onVariantClick,
  onDelete,
}: CartItemProps) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <>
      <div className="flex max-h-[116px] items-center gap-2 lg:max-h-[176px]">
        {/* Checkbox */}
        <div>
          <Checkbox id={`cart-item-${id}`} checked={checked} onChange={onCheck} />
        </div>

        {/* Product Info */}
        <div className="flex flex-1 gap-3">
          {/* Image */}
          <div className="relative h-[116px] w-[88px] min-w-[88px] lg:aspect-[3/4] lg:h-[176px] lg:w-[132px] lg:min-w-[132px]">
            <img
              src={image}
              alt={name}
              className="size-full rounded-sm object-cover"
              width={88}
              height={116}
              loading="lazy"
            />
          </div>

          {/* Details */}
          <div className="flex w-full flex-col gap-2">
            {/* Name and Delete */}
            <div className="flex justify-between gap-2">
              <a href="#" className="flex-1">
                <p className="text-theme-text text-body-sm lg:text-body-lg line-clamp-2">{name}</p>
              </a>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-theme-text-secondary hover:text-red-600 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="size-4 min-w-4 cursor-pointer lg:mt-0.5 lg:size-5 lg:min-w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
            </div>

            {/* Variant Button */}
            <button
              onClick={onVariantClick}
              className="focus-visible:ring-ring rounded-full [&_svg]:pointer-events-none [&_svg]:shrink-0 border-border-primary bg-theme-bg text-theme-text hover:bg-theme-surface-hover [&_svg]:text-theme-text text-label-sm [&_svg]:size-3 inline-flex h-6 w-fit items-center justify-between gap-1 whitespace-nowrap border px-3 py-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50"
              aria-label="select variant"
            >
              {variant}
              <span className="focus-visible:ring-ring rounded-full [&_svg]:pointer-events-none [&_svg]:shrink-0 inline-flex size-3 min-w-3 items-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                  data-slot="icon"
                  className="text-theme-text"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </button>

            {/* Quantity and Price */}
            <div className="mt-auto flex items-center gap-3">
              <QuantityInput value={quantity} onChange={onQuantityChange} />
              <div className="ml-auto flex flex-col items-end">
                <p className="text-[16px] font-extrabold text-gray-800 lg:text-[18px]">
                  {price.toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={onDelete}
        title="Xóa sản phẩm"
        message="Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?"
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </>
  );
}

