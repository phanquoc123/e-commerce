interface CheckboxProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export default function Checkbox({ id, checked, onChange, label, disabled }: CheckboxProps) {
  return (
    <div className="inline-flex items-center space-x-2">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        data-state={checked ? 'checked' : 'unchecked'}
        id={id}
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`
          border-border-primary group h-4 w-4 shrink-0 rounded-md border outline-none 
          ${checked ? 'border-transparent bg-yellow-500' : 'bg-transparent'} 
          ${!disabled && 'hover:border-border-secondary'}
          ${disabled && 'cursor-not-allowed opacity-50'}
        `}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
      {label && (
        <label
          htmlFor={id}
          className={`text-label-md ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
          onClick={() => !disabled && onChange(!checked)}
        >
          {label}
        </label>
      )}
    </div>
  );
}

