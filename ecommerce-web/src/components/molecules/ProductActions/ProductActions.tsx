interface ProductActionsProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
}

export default function ProductActions({
  quantity,
  onQuantityChange,
  onAddToCart,
}: ProductActionsProps) {
  const handleDecrease = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    onQuantityChange(quantity + 1);
  };

  return (
    <div className="flex w-full items-center gap-2 bg-white">
      {/* Quantity Selector */}
      <div className="text-field-wrapper w-[120px] min-w-[120px] space-y-1 lg:min-w-[180px] [&_input]:text-center">
        <div
          className="border-border-primary bg-theme-bg has-[:hover]:border-border-secondary has-[:focus]:border-border-brand focus-within:!border-border-brand has-[:disabled]:border-border-secondary has-[:disabled]:bg-theme-surface has-[:disabled]:text-theme-text-secondary data-[error=true]:border-border-negative [&_input]:text-placeholder-md flex h-[44px] items-center gap-2 rounded-full border px-4 py-3"
          data-error="false"
        >
          <span className="size-5 min-w-5 cursor-pointer" onClick={handleDecrease}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="cursor-pointer select-none"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14"></path>
            </svg>
          </span>
          <input
            className="size-full border-none bg-transparent outline-none"
            data-error="false"
            inputMode="numeric"
            type="number"
            value={quantity}
            onChange={e => onQuantityChange(parseInt(e.target.value) || 1)}
            min="1"
          />
          <span className="size-5 min-w-5 cursor-pointer" onClick={handleIncrease}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              data-slot="icon"
              className="cursor-pointer select-none"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path>
            </svg>
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        className="focus-visible:ring-ring bg-brand-surface text-theme-text hover:bg-brand-surface-hover [&_svg]:text-theme-text text-label-md inline-flex h-11 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full px-4 py-3 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0"
        aria-label="Add to cart"
        onClick={onAddToCart}
      >
        Thêm vào giỏ
        <span className="focus-visible:ring-ring rounded-rounded inline-flex size-5 min-w-5 items-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
            width="20"
            height="20"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  );
}
