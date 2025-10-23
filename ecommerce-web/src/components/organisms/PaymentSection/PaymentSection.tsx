export const PaymentSection = () => {
  return (
    <div className="border-border-primary sticky top-0 h-fit min-w-[436px] space-y-6 rounded-xl border p-6">
      <div className="space-y-3">
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
