import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  placeholder: string;
  hasError?: boolean;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(({
  name,
  placeholder,
  hasError = false,
  ...rest
}, ref) => {
  return (
    <div className="space-y-2">
      <div className="text-field-wrapper space-y-1">
        <div
          className={`bg-theme-bg border-border-primary has-[:hover]:border-border-secondary has-[:focus]:border-border-brand focus-within:!border-border-brand has-[:disabled]:border-border-secondary has-[:disabled]:bg-theme-surface has-[:disabled]:text-theme-text-secondary data-[error=true]:border-border-negative [&_input]:text-placeholder-md flex h-[44px] items-center gap-2 rounded-full border px-4 py-3`}
          data-error={hasError}
        >
          <input
            ref={ref}
            className="size-full border-none bg-transparent outline-none"
            data-error={hasError}
            id={name}
            placeholder={placeholder}
            name={name}
            {...rest}
          />
        </div>
      </div>
    </div>
  );
});

InputField.displayName = 'InputField';
