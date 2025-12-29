interface QuantityInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  disabled?: boolean;
}

export default function QuantityInput({ 
  value, 
  onChange, 
  min = 1, 
  max = 999,
  disabled = false 
}: QuantityInputProps) {
  const handleDecrease = () => {
    if (value > min && !disabled) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (value < max && !disabled) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || min;
    if (newValue >= min && newValue <= max) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex h-[28px] items-center rounded-full border border-gray-300 bg-white px-3">
      <button
        type="button"
        onClick={handleDecrease}
        disabled={disabled || value <= min}
        className="text-gray-600 hover:text-black focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
        </svg>
      </button>

      <input
        type="number"
        inputMode="numeric"
        value={value}
        onChange={handleInputChange}
        disabled={disabled}
        className="w-10 pointer-events-none border-none bg-transparent text-center text-sm outline-none disabled:opacity-50"
        min={min}
        max={max}
      />

      <button
        type="button"
        onClick={handleIncrease}
        disabled={disabled || value >= max}
        className="text-gray-600 hover:text-black focus:outline-none disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      </button>
    </div>
  );
}

