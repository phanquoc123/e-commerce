import React from 'react';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string;
  hasError?: boolean;
  rows?: number;
}

export const TextAreaField = React.forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(({
  name,
  placeholder,
  hasError = false,
  rows = 4,
  ...rest
}, ref) => {
  return (
    <div className="space-y-1">
      <div
        className={`bg-theme-bg border-border-primary has-[:hover]:border-border-secondary has-[:focus]:border-border-brand has-[:disabled]:border-border-secondary has-[:disabled]:bg-theme-surface has-[:disabled]:text-theme-text-secondary data-[error=true]:border-border-negative text-placeholder-md flex items-center gap-1 rounded-lg border px-4 py-3`}
        style={{ height: `${rows * 1.25}rem` }}
        data-error={hasError}
      >
        <textarea
          ref={ref}
          className="size-full resize-none border-none bg-transparent outline-none"
          data-error={hasError}
          id={name}
          placeholder={placeholder}
          name={name}
          rows={rows}
          {...rest}
        />
      </div>
    </div>
  );
});

TextAreaField.displayName = 'TextAreaField';
